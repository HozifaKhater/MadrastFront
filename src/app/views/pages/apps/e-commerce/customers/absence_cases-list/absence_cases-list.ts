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
import { Absence_casesDataService } from '../../../../../../Services/Absence_casesDataService'; 

import { Absence_casesMaster, Absence_cases } from '../../../../../../Absence_casesMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-absencecases-list',
	templateUrl: './absence_cases-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsenceCasesListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'absence_cases_id', 'lev_name', 'class_name', 'student_name', 'civil_id','self_reasons', 'actions'];

	ELEMENT_DATA: Element[];
       
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	Absence_casesMaster: Absence_casesMaster[];
	
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
		private Absence_casesDataService: Absence_casesDataService
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_absencecases() {
		this.Absence_casesDataService.GetAllAbsenceCases().subscribe((data: any) => this.ELEMENT_DATA = data.data,
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
			this.Absence_casesDataService.deleteAbsenceCases(Number(this.selection.selected[i].absence_cases_id))
			.subscribe((data: string) => {
                this.get_absencecases();
            });
		}
		alert("تم حذف الكل")
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log());

		this.Absence_casesDataService.bClickedEvent
			.subscribe((data: string) => {
				this.get_absencecases();
			});

		this.get_absencecases()

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

	
	public activeFilters: string[];
	Absence_cases_info: any [];
	editCustomer(customer: Absence_cases) {

		this.Absence_casesDataService.absence_cases_id = Number(customer.absence_cases_id);
		this.Absence_casesDataService.GetAllAbsenceCases_with_id(customer.absence_cases_id).subscribe((data: any) => this.Absence_cases_info = data.data,
			error => console.log(),
			() => {
				for (let item of this.Absence_cases_info) {
					
					this.Absence_casesDataService.lev_id = item.lev_id;
					this.Absence_casesDataService.lev_name = item.lev_name;
					this.Absence_casesDataService.class_id = item.class_id;
					this.Absence_casesDataService.class_name = item.class_name;
					this.Absence_casesDataService.student_id = item.student_id;
					this.Absence_casesDataService.student_name = item.student_name;
					this.Absence_casesDataService.nationality_id = item.nationality_id;
					this.Absence_casesDataService.nationality_name = item.nationality_name;
					this.Absence_casesDataService.phone_no = item.phone_no;
					this.Absence_casesDataService.birth_date = item.birth_date;
					this.Absence_casesDataService.work_start_date = item.work_start_date;
					this.Absence_casesDataService.behavioral_notes = item.behavioral_notes;
					this.Absence_casesDataService.self_reasons = item.self_reasons;

					this.Absence_casesDataService.absence_details_id = item.absence_details_id;
					this.Absence_casesDataService.other_situations = item.other_situations;
					this.Absence_casesDataService.date = item.date;
					this.Absence_casesDataService.effort_results = item.effort_results;
					this.Absence_casesDataService.end_year_state = item.end_year_state;
		
				};
				this.Absence_casesDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: Absence_cases) {
	
		this.Absence_casesDataService.deleteAbsenceCases(Number(customer.absence_cases_id)).subscribe(res => {
			this.get_absencecases();
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


