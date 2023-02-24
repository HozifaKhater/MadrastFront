// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
// Material
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
// RXJS
import { debounceTime, distinctUntilChanged, tap, skip, delay, take } from 'rxjs/operators';
import { fromEvent, merge, Subscription, of } from 'rxjs';
// Translate Module
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store, ActionsSubject } from '@ngrx/store';
import { AppState } from '../../../../../../core/reducers';
// CRUD
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../../core/_base/crud';
// Components
import { CustomersPageRequested } from '../../../../../../core/e-commerce';
import { SpecialStudentService } from '../../../../../../Services/SpecialStudentService';
import { SpecialStudent } from '../../../../../../SpecialStudents.Model';


@Component({

	selector: 'kt-SpecialStudents-list',
	templateUrl: './SpecialStudents-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class SpecialStudentsListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: SpecialStudent[];

	displayedColumns = ['select', 'id','student_name','level_name','dep_name',
    'excellence_manifestations','actions'];
	
	dataSource: any;


	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	private subscriptions: Subscription[] = [];
    
	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private SpecialStudentService: SpecialStudentService
    ) {
        this.dataSource = new MatTableDataSource([]);
		this.GetSpecialStudents();
	}

	GetSpecialStudents() {
		this.SpecialStudentService.GetSpecialStudents().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () =>{
				this.dataSource.data = this.ELEMENT_DATA
				console.log('all Special students ', this.ELEMENT_DATA)
			} 
		);
    }
	DeleteRegimeCouncilStudent_all(){}

    customersResult: SpecialStudent[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	Student_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	EditSpecialStudent(student: SpecialStudent) {
        this.SpecialStudentService.id = student.id;

		this.SpecialStudentService.GetSpecialStudentById(student.id)
            .subscribe((data:any) => this.Student_info = data.data,
			error => console.log("error in edit special student"),
			() => {
				for (let item of this.Student_info) {

					console.log('selected speecial student', item);

					this.SpecialStudentService.level_id = item.level_id;
                    this.SpecialStudentService.level_name = item.level_name;

					this.SpecialStudentService.class_id = item.class_id;
                    this.SpecialStudentService.class_name = item.class_name;

                    this.SpecialStudentService.student_id = item.student_id;
                    this.SpecialStudentService.student_name = item.student_name;

                    this.SpecialStudentService.dep_id = item.dep_id;
					this.SpecialStudentService.dep_name = item.dep_name;

					this.SpecialStudentService.sub_dep_id = item.sub_dep_id;
					this.SpecialStudentService.sub_dep_name = item.sub_dep_name;

                    this.SpecialStudentService.excellence_manifestations = item.excellence_manifestations;
                    this.SpecialStudentService.suggested_development = item.suggested_development;	
					this.SpecialStudentService.result = item.result;
					
				};

				console.log('Component A is clicked!!', this.SpecialStudentService.student_name);

				this.SpecialStudentService.AClicked('Component A is clicked!!');
			}
		);
	}

	DeleteSpecialStudent(student: SpecialStudent) {
		console.log('special student', student.id);
		this.SpecialStudentService.DeleteSpecialStudent(Number(student.id)).subscribe(res => {
			this.GetSpecialStudents();
			alert("Deleted Sucesfully :) ");
		})
	}

	ngOnInit() {
        
        this.GetSpecialStudents();

		this.SpecialStudentService.bClickedEvent
		.subscribe((data: string) => {
			this.GetSpecialStudents();
		});

		// If the user changes the sort order, reset back to the first page.
		const sortSubscription = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		this.subscriptions.push(sortSubscription);

		/* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
		const paginatorSubscriptions = merge(this.sort.sortChange, this.paginator.page).pipe(
            tap(() => this.loadCustomersList())
		)
			.subscribe();
        this.subscriptions.push(paginatorSubscriptions);

        const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            distinctUntilChanged(), // This operator will eliminate duplicate values
            tap(() => {
                console.log("searchhhh", searchSubscription)
                this.paginator.pageIndex = 0;
                this.loadCustomersList();
            })
        )
            .subscribe();
        this.subscriptions.push(searchSubscription);

			
		// Init DataSource

		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
            this.loadCustomersList();
		}); // Remove this line, just loading imitation
	}

	selection = new SelectionModel<SpecialStudent>(true, []);

    loadCustomersList() {
		this.selection.clear();
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			this.paginator.pageSize

		);
		// Call request from server
        this.store.dispatch(new CustomersPageRequested({ page: queryParams }));
        this.selection.clear();
        const searchText: string = this.searchInput.nativeElement.value;
        this.dataSource.filter = searchText;
        this.dataSource.sort=this.sort
		console.log("yyyy", this.ELEMENT_DATA);
	}

	filterStatus: string = '';

	filterType: string = '';

	filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;

		if (this.filterStatus && this.filterStatus.length > 0) {
			filter.status = +this.filterStatus;
		}

		if (this.filterType && this.filterType.length > 0) {
			filter.type = +this.filterType;
		}

		filter.lastName = searchText;
		if (!searchText) {
			return filter;
		}
        this.dataSource.filter = searchText;
		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}


	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}


}


