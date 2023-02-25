// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
import { EmployeeDataService } from '../../../../../../Services/EmployeeDataService';
import { EmployeeMaster, Employee } from '../../../../../../EmployeeMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-emps-list',
	templateUrl: './employees-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
})
export class EmployeesListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'emp_id', 'emp_name', 'emp_nationality', 'emp_civilian_id', 'actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;

	emps: EmployeeMaster[];
	
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
        private EmployeeDataService: EmployeeDataService,
        private changeDetectorRefs: ChangeDetectorRef
	) {
        this.dataSource = new MatTableDataSource([]);

	}
	get_emps() {
		
		this.EmployeeDataService.GetAllEmployee().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => this.dataSource.data = this.ELEMENT_DATA
        );
    }
	
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngAfterContentInit() {
        this.EmployeeDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_emps();

            });
        this.get_emps()
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
			this.EmployeeDataService.deleteEmployee(Number(this.selection.selected[i].emp_id))
			.subscribe((data: string) => {
                this.get_emps();
            });
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

		this.EmployeeDataService.bClickedEvent
			.subscribe((data: string) => {
				this.get_emps();
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
		//this.subscriptions.forEach(el => el.unsubscribe());
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

	/** ACTIONS */
	/**
	 * Delete customer
	 *
	 * @param _item: CustomerModel
	 */


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
	departments_info: any [];
	editCustomer(emps: Employee, EmployeeDataService: EmployeeDataService ) {

		this.EmployeeDataService.emp_id = Number(emps.emp_id);
		this.EmployeeDataService.GetAllEmployee_with_id(emps.emp_id).subscribe(data => this.departments_info = data,
			error => console.log(),
			() => {
				for (let item of this.departments_info) {
					
					this.EmployeeDataService.emp_civilian_id = item.emp_civilian_id;
					this.EmployeeDataService.emp_sex = item.emp_sex;
					this.EmployeeDataService.emp_sex_id = item.emp_sex_id;
					this.EmployeeDataService.emp_name = item.emp_name;
					this.EmployeeDataService.emp_nationality = item.emp_nationality;
					this.EmployeeDataService.emp_nationality_id = item.emp_nationality_id;
					this.EmployeeDataService.emp_marital_status = item.emp_marital_status;
					this.EmployeeDataService.emp_marital_status_id = item.emp_marital_status_id;
					this.EmployeeDataService.emp_file_ser = item.emp_file_ser;
					this.EmployeeDataService.emp_dob = item.emp_dob;
					this.EmployeeDataService.emp_age_year = item.emp_age_year;
					this.EmployeeDataService.emp_age_month = item.emp_age_month;
					this.EmployeeDataService.emp_age_day = item.emp_age_day;
					this.EmployeeDataService.emp_pos_type = item.emp_pos_type;
					this.EmployeeDataService.emp_pos_type_id = item.emp_pos_type_id;
					this.EmployeeDataService.emp_pos = item.emp_pos;
					this.EmployeeDataService.emp_pos_id = item.emp_pos_id;
					this.EmployeeDataService.emp_dep = item.emp_dep;
					this.EmployeeDataService.emp_dep_id = item.emp_dep_id;
					this.EmployeeDataService.emp_subject = item.emp_subject;
					this.EmployeeDataService.emp_subject_id = item.emp_subject_id;
					this.EmployeeDataService.emp_div = item.emp_div;
					this.EmployeeDataService.emp_div_id = item.emp_div_id;
					this.EmployeeDataService.emp_contract = item.emp_contract;
					this.EmployeeDataService.emp_contract_id = item.emp_contract_id;
					this.EmployeeDataService.emp_employment_date = item.emp_employment_date;
					this.EmployeeDataService.emp_educationa_qualification = item.emp_educationa_qualification;
					this.EmployeeDataService.emp_educationa_qualification_id = item.emp_educationa_qualification_id;
					this.EmployeeDataService.emp_educationa_qualification_date = item.emp_educationa_qualification_date;
					this.EmployeeDataService.emp_educationa_qualification_country = item.emp_educationa_qualification_country;
					this.EmployeeDataService.emp_educationa_qualification_country_id = item.emp_educationa_qualification_country_id;
					this.EmployeeDataService.emp_exp_out_country = item.emp_exp_out_country;
					this.EmployeeDataService.emp_exp_in_country_same_grade = item.emp_exp_in_country_same_grade;
					this.EmployeeDataService.emp_exp_in_country_another_grade = item.emp_exp_in_country_another_grade;
					this.EmployeeDataService.emp_exp_in_country_same_school = item.emp_exp_in_country_same_school;
					this.EmployeeDataService.emp_address = item.emp_address;
					this.EmployeeDataService.emp_email = item.emp_email;
					this.EmployeeDataService.emp_mob = item.emp_mob;
					this.EmployeeDataService.emp_mob1 = item.emp_mob1;
					this.EmployeeDataService.emp_tel = item.emp_tel;
					this.EmployeeDataService.emp_username = item.emp_username;
					this.EmployeeDataService.emp_password = item.emp_password;
					this.EmployeeDataService.in_class_priv = item.in_class_priv;
					this.EmployeeDataService.dep_work = item.dep_work;
					this.EmployeeDataService.relgion_id = item.relgion_id;
					this.EmployeeDataService.religion_name = item.religion_name;

		
				};
				this.EmployeeDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: CustomerModel, EmployeeDataService: EmployeeDataService) {
	
		this.EmployeeDataService.deleteEmployee(Number(customer.dep_id)).subscribe(res => {
			this.get_emps();;
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
