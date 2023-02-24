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
import { Store } from '@ngrx/store';
import { AppState } from '../../../../../../core/reducers';
// CRUD
import { LayoutUtilsService, MessageType, QueryParamsModel } from '../../../../../../core/_base/crud';
// Services and Models
import { CustomerModel, CustomersPageRequested, ManyCustomersDeleted, CustomersStatusUpdated } from '../../../../../../core/e-commerce';
// Components
import { Student_leaveDataService } from '../../../../../../Services/Student_leaveDataService'; 
import { Student_leaveMaster, Student_leave } from '../../../../../../Student_leaveMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-studentleave-list',
	templateUrl: './Student_leave-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class Student_leaveListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'leav_stu_id', 'lev_name', 'class_name', 'student_name','civil_id', 'leave_reason', 'actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	Student_leaveMaster: Student_leaveMaster[];
	
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
		private Student_leaveDataService: Student_leaveDataService
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_studentleave() {

		this.Student_leaveDataService.GetAllStudentleave().subscribe((data: any) => this.ELEMENT_DATA = data.data,
			error => console.log(),
			() => this.dataSource.data = this.ELEMENT_DATA); 
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
			this.Student_leaveDataService.deleteStudentleave(Number(this.selection.selected[i].leav_stu_id)).subscribe(res => {
				this.get_studentleave();
			})
		}
		alert("تم حذف الكل");
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

		this.Student_leaveDataService.bClickedEvent
			.subscribe((data: string) => {
				this.get_studentleave();
			});
		this.get_studentleave()

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
	Student_leave_info: any [];
	editCustomer(customer: Student_leave) {

		this.Student_leaveDataService.leav_stu_id = Number(customer.leav_stu_id);
		this.Student_leaveDataService.GetAllStudentleave_with_id(customer.leav_stu_id).subscribe((data: any) => this.Student_leave_info = data.data,
			error => console.log(),
			() => {
				for (let item of this.Student_leave_info) {
					
					this.Student_leaveDataService.lev_id = item.lev_id;
					this.Student_leaveDataService.lev_name = item.lev_name;
					this.Student_leaveDataService.class_id = item.class_id;
					this.Student_leaveDataService.class_name = item.class_name;
					this.Student_leaveDataService.student_id = item.student_id;
					this.Student_leaveDataService.student_name = item.student_name;
					this.Student_leaveDataService.student_civilian_id = item.student_civilian_id;
					this.Student_leaveDataService.student_branch_id = item.student_branch_id;
					this.Student_leaveDataService.student_branch = item.student_branch;
					this.Student_leaveDataService.leave_reason_id = item.leave_reason_id;
					this.Student_leaveDataService.leave_reason = item.leave_reason;
					this.Student_leaveDataService.leave_date = item.leave_date;
		
				};

				this.Student_leaveDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: Student_leave) {
	
		this.Student_leaveDataService.deleteStudentleave(Number(customer.leav_stu_id)).subscribe(res => {
			this.get_studentleave();
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


