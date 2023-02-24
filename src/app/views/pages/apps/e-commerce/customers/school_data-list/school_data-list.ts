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
import { School_dataDataService } from '../../../../../../Services/School_dataDataService';
import { School_dataMaster, School_data } from '../../../../../../School_dataMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-school_data-list',
	templateUrl: './school_data-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class School_dataListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'school_id', 'school_man', 'school_assis1', 'school_bdala', 'school_faks', 'school_addr', 'school_dir', 'actions'];

	ELEMENT_DATA: Element[];
       
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	School_dataMaster: School_dataMaster[];
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	
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
		private School_dataDataService: School_dataDataService
	) {
		this.dataSource = new MatTableDataSource([]);
	}
	get_school_data() {
		this.School_dataDataService.GetAllSchool_data()
		.subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(),
			() => this.dataSource.data = this.ELEMENT_DATA
		);
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
			this.School_dataDataService.deleteSchool_data(Number(this.selection.selected[i].school_id))
			.subscribe((data: string) => {
                this.get_school_data();
            });
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log());

        this.School_dataDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_school_data();
            });

        this.get_school_data()

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
		// Call request from server
        this.store.dispatch(new CustomersPageRequested({ page: queryParams }));
        this.selection.clear();
        const searchText: string = this.searchInput.nativeElement.value;
        this.dataSource.filter = searchText;
        this.dataSource.sort=this.sort
	}

	filterStatus: string = '';

	filterType: string = '';

	
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
	school_data_info: any [];
	edit_corridor(corridor: School_data) {

		this.School_dataDataService.GetAllSchool_data_with_id(corridor.school_id)
		.subscribe((data:any) => this.school_data_info = data.data,
			error => console.log(),
			() => {
				for (let item of this.school_data_info) {					
					this.School_dataDataService.school_id = Number(corridor.school_id);
					this.School_dataDataService.school_name = item.school_name;
					this.School_dataDataService.school_man = item.school_man;
					this.School_dataDataService.school_assis1 = item.school_assis1;
					this.School_dataDataService.school_assis2 = item.school_assis2;
					this.School_dataDataService.school_assis3 = item.school_assis3;
					this.School_dataDataService.school_assis4 = item.school_assis4;
					this.School_dataDataService.school_bdala = item.school_bdala;
					this.School_dataDataService.school_faks = item.school_faks;
					this.School_dataDataService.school_addr = item.school_addr;
					this.School_dataDataService.school_dir = item.school_dir;
					this.School_dataDataService.school_logo = item.school_logo;
					this.School_dataDataService.school_assis1_id =	item.school_assis1_id;
					this.School_dataDataService.school_assis2_id =	item.school_assis2_id;
					this.School_dataDataService.school_assis3_id =	item.school_assis3_id;
					this.School_dataDataService.school_assis4_id =	item.school_assis4_id;
					this.School_dataDataService.school_man_id =	item.school_man_id;
				   
				};
				this.School_dataDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	delete_corridor(corridor: School_data) {
	
		this.School_dataDataService.deleteSchool_data(Number(corridor.school_id)).subscribe(res => {
			this.get_school_data();
			alert("Deleted Succesfully");
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
