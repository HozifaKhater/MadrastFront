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
import { NchraDataService } from '../../../../../../Services/NchraDataService';

import { NchraMaster, Nchra } from '../../../../../../NchraMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({
	selector: 'kt-nchra-list',
	templateUrl: './nchra-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class NchraListComponent implements OnInit, OnDestroy {

	displayedColumns = ['select', 'nchra_id', 'nchra_topic', 'actions'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	NchraMaster: NchraMaster[];
	
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
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private NchraDataService: NchraDataService,
		private router: Router, private user_privDataService: user_privDataService,
	) {
		this.dataSource = new MatTableDataSource([]);

	}
	get_nchra() {

		this.NchraDataService.GetAllNchra().subscribe(data => this.ELEMENT_DATA = data,
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
			this.NchraDataService.deleteNchra(Number(this.selection.selected[i].nchra_id))
			.subscribe(res => {
				this.get_nchra()
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

		this.NchraDataService.bClickedEvent
			.subscribe((data: string) => {
				this.get_nchra();
			});

		this.get_nchra()

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
	Nchra_info: any [];

	editCustomer(customer: Nchra, NchraDataService: NchraDataService ) {
		this.NchraDataService.GetAllNchra_with_id(customer.nchra_id)
		.subscribe(data => this.Nchra_info = data,
			error => console.log(),
			() => {
				for (let item of this.Nchra_info) {
					this.NchraDataService.nchra_id = Number(item.nchra_id);
					this.NchraDataService.nchra_id = item.nchra_id;
					this.NchraDataService.nchra_pages_num = item.nchra_pages_num;
					this.NchraDataService.nchra_date = item.nchra_date;
					this.NchraDataService.nchra_sender = item.nchra_sender;
					this.NchraDataService.nchra_topic = item.nchra_topic;
					this.NchraDataService.nchra_text = item.nchra_text;
					this.NchraDataService.nchra_attach = item.nchra_attach;
					this.NchraDataService.nachra_file_type = item.nachra_file_type;
					this.NchraDataService.is_file = item.is_file;
					this.NchraDataService.is_dep = item.is_dep;
		
				};
				this.NchraDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	
	deleteCustomer(customer: Nchra) {
        this.NchraDataService.deleteNchra(customer.nchra_id).subscribe(res => {
			alert("Deleted Successfully");
            this.get_nchra();
		})
	}

	data:any;
	showEditor :any;

	view_nchra(nchra: Nchra) {
		this.NchraDataService.nchra_id = nchra.nchra_id;

		this.NchraDataService.GetAllNchra_with_id(nchra.nchra_id)
		.subscribe(data => this.Nchra_info = data,
			error => console.log(),
			() => {
				for (let item of this.Nchra_info) {
					this.NchraDataService.nchra_attach = item.nchra_attach;
					this.NchraDataService.nachra_file_type = item.nachra_file_type;
					this.NchraDataService.is_file = item.is_file;

				};
				
				this.openFile(this.NchraDataService.nchra_attach,
					this.NchraDataService.nachra_file_type);
			}
		);
	}
	
	openFile(base64textString,file_type) {
		
		const base64Data = base64textString.substring(base64textString.indexOf(',') + 1);
				const fileType = file_type;
				const base64File = base64Data;
				const blob = this.b64toBlob(base64File, fileType);
				const blobUrl = URL.createObjectURL(blob);
				window.open(blobUrl, '_blank');
			  }

			  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
				const byteCharacters = atob(b64Data);
				const byteArrays = [];
			  
				for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				  const slice = byteCharacters.slice(offset, offset + sliceSize);
			  
				  const byteNumbers = new Array(slice.length);
				  for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				  }
			  
				  const byteArray = new Uint8Array(byteNumbers);
				  byteArrays.push(byteArray);
				}
			  
				return new Blob(byteArrays, { type: contentType });
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


