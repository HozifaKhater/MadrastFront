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
import { OtherStudentSlidesService } from '../../../../../../Services/OtherStudentSlidesService';
import { OtherStudentSlides } from '../../../../../../OtherStudentSlides.Model';


@Component({

	selector: 'kt-OtherStudentSlides-list',
	templateUrl: './OtherStudentSlides-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class OtherStudentSlidesListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: OtherStudentSlides[];

	displayedColumns = ['select', 'id','student_name','civil_id','s_code','date_of_file_opening','actions'];
	
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
		private OtherStudentSlidesService: OtherStudentSlidesService
    ) {
        this.dataSource = new MatTableDataSource([]);
		this.GetOtherStudentSlides();
	}

	GetOtherStudentSlides() {
		this.OtherStudentSlidesService.GetOtherStudentSlides().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () =>{
				this.dataSource.data = this.ELEMENT_DATA
				console.log('all other student slide', this.ELEMENT_DATA)
			} 
		);
    }


    customersResult: OtherStudentSlides[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	StudentSlide_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	EditOtherStudentSlide(student: OtherStudentSlides) {
        this.OtherStudentSlidesService.id = student.id;

		this.OtherStudentSlidesService.GetOtherStudentSlidesById(student.id)
            .subscribe((data:any) => this.StudentSlide_info = data.data,
			error => console.log("error in edit other student slide"),
			() => {
				for (let item of this.StudentSlide_info) {

					console.log('selected other student slide', item);

					this.OtherStudentSlidesService.level_id = item.level_id;

                    this.OtherStudentSlidesService.level_name = item.level_name;

					this.OtherStudentSlidesService.class_id = item.class_id;
                    
                    this.OtherStudentSlidesService.class_name = item.class_name;

                    this.OtherStudentSlidesService.student_id = item.student_id;

                    this.OtherStudentSlidesService.student_name = item.student_name;

                    this.OtherStudentSlidesService.def_id = item.def_id;

                    this.OtherStudentSlidesService.s_code = item.s_code;

                    this.OtherStudentSlidesService.slide_type = item.slide_type;

                    this.OtherStudentSlidesService.date_of_file_opening = item.date_of_file_opening;

                    this.OtherStudentSlidesService.details = item.details;

                    this.OtherStudentSlidesService.results = item.results;				
				};

				console.log('Component A is clicked!!', this.OtherStudentSlidesService.student_name);

				this.OtherStudentSlidesService.AClicked('Component A is clicked!!');
			}
		);
	}
	DeleteOtherStudentSlide_all(){}
	DeleteOtherStudentSlide(student: OtherStudentSlides, OtherStudentSlidesService: OtherStudentSlidesService) {
		console.log('other student slide id', student.id);
		this.OtherStudentSlidesService.DeleteOtherStudentSlides(Number(student.id)).subscribe(res => {
			this.GetOtherStudentSlides();
			alert("Deleted Sucesfully :) ");
		})
	}

	ngOnInit() {
        
        this.GetOtherStudentSlides();

		this.OtherStudentSlidesService.bClickedEvent
		.subscribe((data: string) => {
			this.GetOtherStudentSlides();
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

	selection = new SelectionModel<OtherStudentSlides>(true, []);

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


