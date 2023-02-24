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
import { Visit_typesDataService } from '../../../../../../Services/visit_typesDataService';
import { Visity_typesMaster, Visit_types } from '../../../../../../Visit_typesMaster.Model';
import { DepartmentDataService } from '../../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../../DepartmentMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-visit_types-list',
    templateUrl: './visit_types-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class visit_typesComponent implements OnInit, OnDestroy {
	
    displayedColumns = ['select', 'visit_type_id', 'visit_type_name', 'actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;

	visit_types: Visit_types[];
	departments: DepartmentMaster[];

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
        private Visit_typesDataService: Visit_typesDataService
	) {
        this.dataSource = new MatTableDataSource([]);

	}
    get_subjects() {
        this.Visit_typesDataService.GetAllVisit_types().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
            () => this.dataSource.data = this.ELEMENT_DATA);
		 }
	
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
			this.Visit_typesDataService.deletevisit_types(Number(this.selection.selected[i].visit_type_id))
			.subscribe((data: string) => {
                this.get_subjects();
            });
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

        this.Visit_typesDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_subjects();
            });
      
        this.get_subjects();

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
				//status: elem.status,
				//statusTitle: this.getItemStatusString(elem.status),
				//statusCssClass: this.getItemCssClassByStatus(elem.status)
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
	visit_types_info: any[];
	subjects_info: any[];

    edit_visit_type(Visit_types: Visit_types) {

        this.Visit_typesDataService.visit_type_id = Visit_types.visit_type_id;
        this.Visit_typesDataService.GetAllvisit_types_with_id(Visit_types.visit_type_id).subscribe(data => this.visit_types_info = data,
			error => console.log(),
            () => {
                for (let item of this.visit_types_info) {
                              
                    this.Visit_typesDataService.visit_type_name = item.visit_type_name;
                    this.Visit_typesDataService.is_visit_date = item.is_visit_date;
                    this.Visit_typesDataService.visit_date = item.visit_date;
                    this.Visit_typesDataService.is_phone = item.is_phone;
                    this.Visit_typesDataService.phone_label = item.phone_label;
                    this.Visit_typesDataService.is_start_time = item.is_start_time;
                    this.Visit_typesDataService.start_time_label = item.start_time_label;
                    this.Visit_typesDataService.is_end_time = item.is_end_time;
                    this.Visit_typesDataService.end_time_label = item.end_time_label;
                    this.Visit_typesDataService.is_name = item.is_name;
                    this.Visit_typesDataService.name_label = item.name_label;
                    this.Visit_typesDataService.is_topic = item.is_topic;
                    this.Visit_typesDataService.topic_label = item.topic_label;
                    this.Visit_typesDataService.is_instructions = item.is_instructions;
                    this.Visit_typesDataService.instructions_label = item.instructions_label;
                    this.Visit_typesDataService.is_job = item.is_job;
                    this.Visit_typesDataService.job_label = item.job_label;
                    this.Visit_typesDataService.is_notes = item.is_notes;
                    this.Visit_typesDataService.notes_label = item.notes_label;
                    this.Visit_typesDataService.is_dep = item.is_dep;
                    this.Visit_typesDataService.dep_label = item.dep_label;
                    this.Visit_typesDataService.is_vnote = item.is_vnote;
                    this.Visit_typesDataService.vnote_label = item.vnote_label;
                    this.Visit_typesDataService.is_vpic = item.is_vpic;
                    this.Visit_typesDataService.vpic_label = item.vpic_label;
					this.Visit_typesDataService.is_emp_from = item.is_emp_from;
					this.Visit_typesDataService.emp_from_label = item.emp_from_label;
					this.Visit_typesDataService.is_emp_to = item.is_emp_to;
					this.Visit_typesDataService.emp_to_label = item.emp_to_label;
					this.Visit_typesDataService.is_takeem = item.is_takeem;
					this.Visit_typesDataService.takeem_label = item.takeem_label;
				   
				};
                this.Visit_typesDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
    delete_visit_type(Visit_types: Visit_types ) {

        this.Visit_typesDataService.deletevisit_types(Number(Visit_types.visit_type_id)).subscribe(res => {
            this.get_subjects();;
			alert("Deleted Successfully");
		})
        this.get_subjects();
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
