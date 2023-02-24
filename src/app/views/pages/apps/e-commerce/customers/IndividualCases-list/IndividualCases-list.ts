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
import { IndividualCasesService } from '../../../../../../Services/IndividualCasesService';
import { IndividualCases } from '../../../../../../IndividualCases.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';


@Component({

	selector: 'kt-IndividualCases-list',
	templateUrl: './IndividualCase-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class IndividualCasesListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: IndividualCases[];

	displayedColumns = ['select', 'id','civil_id','student_name','s_code','date_of_file_opening','actions'];
	
	dataSource: any;


	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<any>(true, []);
	customersResult: any[] = [];
	// Subscriptions
	private subscriptions: Subscription[] = [];
    
	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private store: Store<AppState>,
		private IndividualCasesService: IndividualCasesService
    ) {
        this.dataSource = new MatTableDataSource([]);
		this.GetIndividualCases();
	}

	GetIndividualCases() {
		this.IndividualCasesService.GetIndividualCases().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(),
            () =>{
				this.dataSource.data = this.ELEMENT_DATA
			} 
		);
    }

	DeleteIndividualCase_all(){}

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	StudentSlide_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	EditIndividualCase(student: IndividualCases) {
        this.IndividualCasesService.id = student.id;

		this.IndividualCasesService.GetIndividualCaseById(student.id)
            .subscribe((data:any) => this.StudentSlide_info = data.data,
			error => console.log(),
			() => {
				for (let item of this.StudentSlide_info) {

					this.IndividualCasesService.level_id = item.level_id;

                    this.IndividualCasesService.level_name = item.level_name;

					this.IndividualCasesService.class_id = item.class_id;
                    
                    this.IndividualCasesService.class_name = item.class_name;

                    this.IndividualCasesService.student_id = item.student_id;

                    this.IndividualCasesService.student_name = item.student_name;

                    this.IndividualCasesService.def_id = item.def_id;

                    this.IndividualCasesService.s_code = item.s_code;

                    this.IndividualCasesService.case_type = item.case_type;

                    this.IndividualCasesService.date_of_file_opening = item.date_of_file_opening;

                    this.IndividualCasesService.transfer_procedures = item.transfer_procedures;

                    this.IndividualCasesService.results = item.results;				
				};

				this.IndividualCasesService.AClicked('Component A is clicked!!');
			}
		);
	}

	DeleteIndividualCase(student: IndividualCases ) {
		this.IndividualCasesService.DeleteIndividualCase(Number(student.id)).subscribe(res => {
			this.GetIndividualCases();
			alert("Deleted Sucesfully :) ");
		})
	}

	masterToggle() {
		this.customersResult = this.ELEMENT_DATA
		if (this.selection.selected.length === this.ELEMENT_DATA.length) {
			this.selection.clear();
		} else {
			this.customersResult.forEach(row => this.selection.select(row));
		}
	}

	deleteCustomers() {
		for (let i = 0; i < this.selection.selected.length; i++) {
			this.IndividualCasesService.DeleteIndividualCase(Number(this.selection.selected[i].id))
			.subscribe((data: string) => {
                this.GetIndividualCases();
            });
		}
		alert("تم حذف الكل")
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 
        
        this.GetIndividualCases();

		this.IndividualCasesService.bClickedEvent
		.subscribe((data: string) => {
			this.GetIndividualCases();
		});
		
		this.GetIndividualCases();
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

       // Filtration, bind to searchInput
		const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
			// tslint:disable-next-line:max-line-length
			debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
			distinctUntilChanged(), // This operator will eliminate duplicate values
			tap(() => {
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


    /**
	 * Load Customers List from service through data-source
	 */
	loadCustomersList() {
		this.selection.clear();
        const queryParams = new QueryParamsModel(
            this.filterConfiguration(),
            this.sort.direction,
            this.sort.active,
            this.paginator.pageIndex,
            this.paginator.pageSize
           
		);

		this.dataSource.sort = this.sort;
		const searchText: string = this.searchInput.nativeElement.value;
		this.dataSource.filter = searchText;

		// Call request from server
		this.store.dispatch(new CustomersPageRequested({ page: queryParams }));
		this.selection.clear();
	}

	/**
	 * Returns object for filter
	 */
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

		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}


	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}


}


