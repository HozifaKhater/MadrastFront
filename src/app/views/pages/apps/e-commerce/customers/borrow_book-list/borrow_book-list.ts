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
import { Add_libDataService } from '../../../../../../Services/Add_libDataService';
import { Borrow_bookDataService } from '../../../../../../Services/Borrow_bookDataService';
import { Add_libMaster, Add_lib } from '../../../../../../Add_libMaster.Model';
import { Borrow_book } from '../../../../../../Borrow_bookMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';


@Component({
	selector: 'kt-borrow_book-list',
	templateUrl: './borrow_book-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Borrow_bookListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'lib_id', 'lib_book_name','actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;

	Add_libMaster: Add_libMaster[];

	
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
		private Add_libDataService: Add_libDataService,
		private Borrow_bookDataService: Borrow_bookDataService
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_add_lib() {

		this.Add_libDataService.GetAllAdd_lib().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => {
				this.dataSource.data = this.ELEMENT_DATA
			}); 
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
			this.Add_libDataService.deleteAdd_lib(Number(this.selection.selected[i].lib_id))
			.subscribe((data: string) => {
                this.get_add_lib();
            });
		}
		alert("تم حذف الكل")
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

		this.get_add_lib();
		this.Borrow_bookDataService.bClickedEvent
			.subscribe((data: string) => {
				
				for (let i = 0; i < this.selection.selected.length; i++) {

					var val = {
						borr_date: this.Borrow_bookDataService.borr_date,
						lib_book_name: this.selection.selected[i].lib_book_name,
						borr_name: this.Borrow_bookDataService.borr_name
					};

					this.Borrow_bookDataService.addBorrow_book(val).subscribe()
				}
				alert("Added Successfully");
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
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
	public activeFilters: string[];
	Add_lib_info: any [];
	editCustomer(customer: Add_lib, Add_libDataService: Add_libDataService ) {

		this.Add_libDataService.GetAllAdd_lib_with_id(customer.lib_id).subscribe(data => this.Add_lib_info = data,
			error => console.log(),
			() => {
				for (let item of this.Add_lib_info) {
					this.Add_libDataService.lib_id = Number(item.lib_id);
					
					this.Add_libDataService.lib_book = item.lib_book;
					this.Add_libDataService.lib_ref = item.lib_ref;
					this.Add_libDataService.lib_book_name = item.lib_book_name;

					this.Add_libDataService.lib_author_name = item.lib_author_name;
					this.Add_libDataService.lib_date = item.lib_date;
					this.Add_libDataService.lib_page_no = item.lib_page_no;
					this.Add_libDataService.lib_rec_no = item.lib_rec_no;
					this.Add_libDataService.lib_classification = item.lib_classification;
				
		
				};
				this.Add_libDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: Add_lib) {
	
		this.Add_libDataService.deleteAdd_lib(Number(customer.lib_id)).subscribe(res => {
			this.get_add_lib();
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


