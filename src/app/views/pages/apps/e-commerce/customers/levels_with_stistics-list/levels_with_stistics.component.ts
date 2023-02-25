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
import { ta7dier_masterDataService } from '../../../../../../Services/Ta7dier_masterDataService';
import { Ta7dier, Ta7dier_masterMaster } from '../../../../../../Ta7dier_masterMaster.Model';
import { DepartmentDataService } from '../../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../../DepartmentMaster.Model';
import { twze3_students_mostwa_t7sylyDataService } from '../../../../../../Services/twze3_students_mostwa_t7sylyDataService';
import { twze3_students_mostwa_t7syly,twze3_students_mostwa_t7sylyMaster } from '../../../../../../twze3_students_mostwa_t7sylyMaster.Model';


import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
    selector: 'kt-levels_with_stistics-list',
    templateUrl: './levels_with_stistics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
})
export class levels_with_stisticslistComponent implements OnInit, OnDestroy {
	
    displayedColumns = ['select', 'id', 'level_name', 'first_term_fails', 'second_term_fails', 'academic_failure', 'academic_excellence'];
	ELEMENT_DATA: Element[];
       
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
	
	ta7diers: Ta7dier_masterMaster[];
	departments: DepartmentMaster[];
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<twze3_students_mostwa_t7syly>(true, []);
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
		private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private ta7dier_masterDataService: ta7dier_masterDataService,
        private DepartmentService: DepartmentDataService,
        private twze3_students_mostwa_t7sylyDataService: twze3_students_mostwa_t7sylyDataService,
		private router: Router
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_data() {
	
        this.twze3_students_mostwa_t7sylyDataService.GetAlltwze3_students_mostwa_t7syly().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => this.dataSource.data = this.ELEMENT_DATA
		); }
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	updateCheckedList(ta7dier) {
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
	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 
		this.get_data()

		
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
	/*	this.dataSource = new CustomersDataSource(this.store);*/
		//const entitiesSubscription = this.dataSource.entitySubject.pipe(
		//	skip(1),
		//	distinctUntilChanged()
		//).subscribe(res => {
		//	this.customersResult = res;
		//});
		/*this.subscriptions.push(entitiesSubscription);*/
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
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
	public activeFilters: string[];
	departments_info: any[];
	subjects_info: any[];
	edit_ta7dier(ta7deir: Ta7dier, DepartmentService: DepartmentDataService, ta7dier_masterDataService: ta7dier_masterDataService ) {

		this.ta7dier_masterDataService.ta7dier_id = ta7deir.ta7dier_id;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(ta7deir.ta7dier_id).subscribe(data => this.subjects_info = data,
			error => console.log(),
			() => {
				for (let item of this.subjects_info) {
					/*this.ta7dier_masterDataService.ta7dier_id = item.ta7dier_id;*/
					this.ta7dier_masterDataService.emp_id = item.emp_id;
					this.ta7dier_masterDataService.emp_name = item.emp_name;
					this.ta7dier_masterDataService.subject_id = item.subject_id;
					this.ta7dier_masterDataService.subject_name = item.subject_name;
					this.ta7dier_masterDataService.grade_id = item.grade_id;
					this.ta7dier_masterDataService.grade_name = item.grade_name;
					this.ta7dier_masterDataService.ta7dier_date = item.ta7dier_date;
					this.ta7dier_masterDataService.ta7dier_week = item.ta7dier_week;
					this.ta7dier_masterDataService.ta7dier_day = item.ta7dier_day;
					this.ta7dier_masterDataService.ta7dier_state_id = item.ta7dier_state_id;
					this.ta7dier_masterDataService.state_name = item.state_name;
					this.ta7dier_masterDataService.ta7dier_name = item.ta7dier_name;
					this.ta7dier_masterDataService.ta7dier_body = item.ta7dier_body;
					this.ta7dier_masterDataService.ta7dier_notes = item.ta7dier_notes;
					this.ta7dier_masterDataService.ta7dier_supervision_state_id = item.ta7dier_supervision_state_id;
					this.ta7dier_masterDataService.ta7dier_supervision_state_name = item.ta7dier_supervision_state_name;
					this.ta7dier_masterDataService.ta7dier_state_name = item.ta7dier_state_name;

				};
				this.ta7dier_masterDataService.AClicked('Component A is clicked!!');
			}
		);
		
		this.router.navigate(['/material/layout/card']);
	}
	delete_ta7dier(ta7dier: Ta7dier, customer: CustomerModel, DepartmentService: DepartmentDataService, ta7dier_masterDataService: ta7dier_masterDataService) {
	
		this.ta7dier_masterDataService.deleteTa7dier_master(Number(ta7dier.ta7dier_id)).subscribe(res => {
			this.get_data();
			alert(res.toString());
		
		})
		this.get_data();
	}

	save_twze3_students() {
		for (let i = 0; i < this.selection.selected.length; i++) {
			
			for (let i = 0; i < this.selection.selected.length; i++) {
			var val = {
				level_id	: this.selection.selected[i].level_id,
				level_name	: this.selection.selected[i].level_name,
				first_term_fails	: this.selection.selected[i].first_term_fails,
				second_term_fails	: this.selection.selected[i].second_term_fails,
				academic_failure	: this.selection.selected[i].academic_failure,
				academic_excellence	:this.selection.selected[i].academic_excellence,
			};
			this.twze3_students_mostwa_t7sylyDataService.addTwze3_students(val).subscribe(res => {
				this.get_data();

			})
		}}
		alert("تم الحفظ")
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
