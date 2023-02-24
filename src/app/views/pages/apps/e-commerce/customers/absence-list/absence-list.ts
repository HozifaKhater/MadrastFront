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
import { AbsenceDataService } from '../../../../../../Services/AbsenceDataService';
import { StudentDataService } from '../../../../../../Services/StudentDataService';
import { StudentMaster, Student } from '../../../../../../StudentMaster.Model';
import { AbsenceMaster, Absence } from '../../../../../../AbsenceMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';


@Component({
	selector: 'kt-absence-list',
	templateUrl: './absence-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
})
export class AbsenceListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'absence_id', 'absence_student_name','civil_id','absence_date', 'actions'];

	ELEMENT_DATA: Element[];
       
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;

	AbsenceMaster: AbsenceMaster[];
	
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

	Student: Student[];

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
		private AbsenceDataService: AbsenceDataService,
		private StudentDataService: StudentDataService
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_absence() {

		this.AbsenceDataService.GetAllAbsence().subscribe(data => this.ELEMENT_DATA = data,
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
			this.AbsenceDataService.deleteAbsence(Number(this.selection.selected[i].absence_id)).subscribe(res => {
				this.get_absence()
			})
		}
		alert("تم حذف الكل")
	}
	
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

		this.AbsenceDataService.bClickedEvent
			.subscribe((data: string) => {
				this.get_absence();
			});
		this.get_absence()

		


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

	/*
	 * Fetch selected customers
	 */
	fetchCustomers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			// messages.push({
			// 	text: `${elem.lastName}, ${elem.firstName}`,
			// 	id: elem.dep_id.toString(),
			// 	/*status: elem.status*/
			// });
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
			// _messages.push({
			// 	text: `${elem.lastName}, ${elem.firstName}`,
			// 	id: elem.dep_id.toString(),
			// 	//status: elem.status,
			// 	//statusTitle: this.getItemStatusString(elem.status),
			// 	//statusCssClass: this.getItemCssClassByStatus(elem.status)
			// });
		});

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			// this.store.dispatch(new CustomersStatusUpdated({
			// 	status: +res,
			// 	customers: this.selection.selected
			// }));

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
	Absence_info: any [];
	editCustomer(customer: Absence) {

		this.AbsenceDataService.GetAllAbsence_with_id(customer.absence_id).subscribe(data => this.Absence_info = data,
			error => console.log(),
			() => {
				for (let item of this.Absence_info) {
					this.AbsenceDataService.absence_id = Number(item.absence_id);
					this.AbsenceDataService.absence_lev = item.absence_lev;
					this.AbsenceDataService.absence_class = item.absence_class;
					this.AbsenceDataService.absence_date = item.absence_date;
					this.AbsenceDataService.absence_student_id = item.absence_student_id;
					this.AbsenceDataService.absence_student_name = item.absence_student_name;
		
				};
				this.AbsenceDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: Absence) {
	
		this.AbsenceDataService.deleteAbsence(Number(customer.absence_id)).subscribe(res => {
			this.get_absence();
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


