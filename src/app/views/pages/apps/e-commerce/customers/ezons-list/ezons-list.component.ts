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
import { EzonDataService } from '../../../../../../Services/EzonDataService';
import {EzonMaster,ezon  } from '../../../../../../EzonMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';
import { environment } from '../../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../../EmployeeMaster.Model';

@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-ezons-list',
	templateUrl: './ezons-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class EzonListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'ezn_id', 'emp_name','civil_id','emp_dep',  'time_from', 'time_to','ezn_state', 'actions'];

	ELEMENT_DATA: Element[];
       
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	EzonMaster: EzonMaster[];
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	
	// Selection
	selection = new SelectionModel<ezon>(true, []);
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
		private EmployeeDataService: EmployeeDataService,
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private EzonDataService: EzonDataService
	) {
        this.dataSource = new MatTableDataSource([]);
	}
	decoded:any;
	Employee: Employee[];
	get_ezons() {
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
		this.EzonDataService.GetAllEzon_with_emp_id(this.decoded.id)
		.subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => {
				this.dataSource.data =this.ELEMENT_DATA
				console.log("ELEMENT_DATA",this.ELEMENT_DATA)
			}
		); 
	}
	

	/**
	 * On init
	 */
	ezon_info: any[];
	editCustomer(ezon: ezon) {

		this.EzonDataService.ezn_id = Number(ezon.ezn_id);
		this.EzonDataService.GetAllEzon_with_id(ezon.ezn_id).subscribe(data => this.ezon_info = data,
			error => console.log(),
			() => {
				for (let item of this.ezon_info) {
					this.EzonDataService.ezn_id = item.ezn_id;
					this.EzonDataService.absent_ezn_id = item.absent_ezn_id;
					this.EzonDataService.premit_id = item.premit_id;
					this.EzonDataService.emp_id = item.emp_id;
					this.EzonDataService.ezn_date = item.ezn_date;
					this.EzonDataService.ezn_reason = item.ezn_reason;
					this.EzonDataService.time_from = item.time_from;
					this.EzonDataService.time_to = item.time_to;
					this.EzonDataService.ezn_state = item.ezn_state;
				};
				this.EzonDataService.AClicked('Component A is clicked!!');
			}
		);


	}
	deleteCustomer(ezon: ezon, EzonDataService: EzonDataService) {

		this.EzonDataService.deleteEzon(Number(ezon.ezn_id)).subscribe(res => {
			this.get_ezons();;
			alert("Deleted Successfully");

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
			this.EzonDataService.deleteEzon(Number(this.selection.selected[i].ezn_id))
			.subscribe(res => {
				this.get_ezons()
			
			});
		}
		alert("تم حذف الكل")
	}
	priv_info:any=[];
	
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 
		
			this.get_ezons();

        this.EzonDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_ezons();
            });

        this.get_ezons();

		this.EzonDataService.bindClickedEvent.subscribe((data: string) => {
				this.EzonDataService.GetAllEzon_with_emp_id(this.EzonDataService.emp_id).subscribe(data => this.ELEMENT_DATA = data,
					error => console.log(),
					() => {this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) }
				);
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
	 * Show add customer dialog
	 */
	addCustomer() {
		const newCustomer = new CustomerModel();
		newCustomer.clear(); // Set all defaults fields
		/*this.editCustomer(newCustomer);*/
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
