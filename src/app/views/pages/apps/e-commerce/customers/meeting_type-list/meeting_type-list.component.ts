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
// Services and Models
import { CustomerModel, CustomersDataSource, CustomersPageRequested, OneCustomerDeleted, ManyCustomersDeleted, CustomersStatusUpdated } from '../../../../../../core/e-commerce';
// Components
import { CustomerEditDialogComponent } from '../customer-edit/customer-edit.dialog.component';
import { meeting_typeDataService } from '../../../../../../Services/meeting_typeDataService';
import { meeting_type,meeting_typeMaster } from '../../../../../../meeting_typeMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-meeting_type-list',
	templateUrl: './meeting_type-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class meeting_typeListComponent implements OnInit, OnDestroy {
	// Table fields


    Element1: [{ id: "1" },
        { id: "2" }];
	displayedColumns = ['select', 'meeting_type_id', 'meeting_type_name','actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	meeting_type: meeting_type[];
		
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	
	// Selection
	selection = new SelectionModel<any>(true, []);
	customersResult: any[] = [];
	
	// Subscriptions
	private subscriptions: Subscription[] = [];
	
	/**
	 * Component constructor
	 *
	 * @param dialog: MatDialog
	 * @param snackBar: MatSnackBar
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param translate: TranslateService
	 * @param store: Store<AppState>
	 */
	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private meeting_typeDataService: meeting_typeDataService
	
	) {
        this.dataSource = new MatTableDataSource([]);

	}
	get_data() {
		
		this.meeting_typeDataService.get_meeting_type().subscribe((data:any) => this.ELEMENT_DATA = data.data,
		    error => console.log(),
            () => this.dataSource.data = this.ELEMENT_DATA);
    }

	/**
	 * On init
	 */
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
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
			this.meeting_typeDataService.delete_from_meeting_type
			(Number(this.selection.selected[i].meeting_type_id))
			.subscribe((data: string) => {
                this.get_data();
            });
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

        this.get_data();

        this.meeting_typeDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_data()
            });

		this.get_data();
		

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
	
		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
			this.loadCustomersList();
		}); // Remove this line, just loading imitation
	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
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

	/**
	 * Fetch selected customers
	 */
    fetchCustomers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.lastName}, ${elem.firstName}`,
				id: elem.dep_id.toString(),
				/*status: elem.status*/
			});
		});
		this.layoutUtilsService.fetchElements(messages);
		
	}

	/**
	 * Show UpdateStatuDialog for selected customers
	 */
	updateStatusForCustomers() {
		const _title = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.TITLE');
		const _updateMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.MESSAGE');
		const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.lastName}, ${elem.firstName}`,
				id: elem.dep_id.toString(),
				
			});
		});

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			this.store.dispatch(new CustomersStatusUpdated({
				status: +res,
				customers: this.selection.selected
			}));

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
			this.selection.clear();
		});
	}

	/**
	 * Show add customer dialog
	 */
	addCustomer() {
		const newCustomer = new CustomerModel();
		newCustomer.clear(); // Set all defaults fields
		/*this.editCustomer(newCustomer);*/
	}

	/**
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
	public activeFilters: string[];
	departments_info: any[];
	data_info: any[];
	edit_meeting(meeting_type: meeting_type ) {

		this.meeting_typeDataService.get_meeting_type_with_id(meeting_type.meeting_type_id)
		.subscribe((data: any) => this.data_info = data.data,
			error => console.log(),
			() => {

				for (let item of this.data_info) {
					this.meeting_typeDataService.meeting_type_id = item.meeting_type_id;
					this.	meeting_typeDataService	.	meeting_type_name	=	item.	meeting_type_name	;
					this.	meeting_typeDataService	.	is_meeting_date	=	item.	is_meeting_date	;
					this.	meeting_typeDataService	.	meeting_date	=	item.	meeting_date	;
					this.	meeting_typeDataService	.	is_group_name	=	item.	is_group_name	;
					this.	meeting_typeDataService	.	group_name	=	item.	group_name	;
					this.	meeting_typeDataService	.	is_start_time	=	item.	is_start_time	;
					this.	meeting_typeDataService	.	start_time_label	=	item.	start_time_label	;
					this.	meeting_typeDataService	.	is_end_time	=	item.	is_end_time	;
					this.	meeting_typeDataService	.	end_time_label	=	item.	end_time_label	;
					this.	meeting_typeDataService	.	is_group_number	=	item.	is_group_number	;
					this.	meeting_typeDataService	.	group_number_label	=	item.	group_number_label	;
					this.	meeting_typeDataService	.	is_meeting_mem_no	=	item.	is_meeting_mem_no	;
					this.	meeting_typeDataService	.	meeting_mem_no_label	=	item.	meeting_mem_no_label	;
					this.	meeting_typeDataService	.	is_meeting_loc	=	item.	is_meeting_loc	;
					this.	meeting_typeDataService	.	meeting_loc_label	=	item.	meeting_loc_label	;
					this.	meeting_typeDataService	.	is_work_plan	=	item.	is_work_plan	;
					this.	meeting_typeDataService	.	work_plan_label	=	item.	work_plan_label	;
					this.	meeting_typeDataService	.	is_recommendation	=	item.	is_recommendation	;
					this.	meeting_typeDataService	.	recommendation_label	=	item.	recommendation_label	;
					this.	meeting_typeDataService	.	is_dep	=	item.	is_dep	;
					this.	meeting_typeDataService	.	dep_label	=	item.	dep_label	;
					this.	meeting_typeDataService	.	is_subject	=	item.	is_subject	;
					this.	meeting_typeDataService	.	subject_label	=	item.	subject_label	;
					this.	meeting_typeDataService	.	is_abscence	=	item.	is_abscence	;
					this.	meeting_typeDataService	.	abscence_label	=	item.	abscence_label	;
					this.	meeting_typeDataService	.	is_course	=	item.	is_course	;
					this.	meeting_typeDataService	.	course_label	=	item.	course_label	;
					this.	meeting_typeDataService	.	is_content	=	item.	is_content	;
					this.	meeting_typeDataService	.	content_label	=	item.	content_label	;
				   
				   
				};
				this.meeting_typeDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	delete_meeting(meeting_type: meeting_type) {
	
		this.meeting_typeDataService.delete_from_meeting_type
		(Number(meeting_type.meeting_type_id))
		.subscribe(res => {
			this.get_data();
			alert("Deleted Successfully");
		})
	
	}
	
	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
	}


 

}

