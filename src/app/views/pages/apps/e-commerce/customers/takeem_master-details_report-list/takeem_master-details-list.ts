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
import { Evaluation_itemsDataService } from '../../../../../../Services/Evaluation_itemsDataService';

import { Takeem_masterMaster, Takeem_master } from '../../../../../../Takeem_masterMaster.Model';

import { Takeem_masterDataService } from '../../../../../../Services/Takeem_masterDataService';
import { Takeem_detailsDataService } from '../../../../../../Services/Takeem_detailsDataService';

import { Takeem_details } from '../../../../../../Takeem_detailsMaster.Model';

@Component({
	selector: 'kt-Takeem_master-details_report-list',
	templateUrl: './takeem_master-details-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
})
export class TakeemMasterDetails_reportListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['evaluation_id', 'evaluation_item_name', 'evaluation_appreciation'];

	ELEMENT_DATA: Element[];
        
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	Takeem_masterMaster: Takeem_masterMaster[];
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	
	// Selection
	selection = new SelectionModel<Takeem_details>(true, []);
	customersResult: CustomerModel[] = [];
	
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
		private Evaluation_itemsDataService: Evaluation_itemsDataService,
		private Takeem_masterDataService: Takeem_masterDataService,
		private Takeem_detailsDataService: Takeem_detailsDataService
	) {
		
        this.Evaluation_itemsDataService.GetAllEvaluation_items().subscribe(data => this.eva_settings = data,
			error => console.log());

		this.dataSource = new MatTableDataSource([]);

	}
	eva_settings:any;
	get_evaluation() {

		this.Evaluation_itemsDataService.GetAllEvaluation_items().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => { this.dataSource.data = this.ELEMENT_DATA} 
		); }
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.Takeem_masterDataService.dClickedEvent
		.subscribe((data: string) => {
		var valx = {
			evaluation_subject_id:this.Takeem_masterDataService.evaluation_subject_id,
			evaluation_date:this.Takeem_masterDataService.evaluation_date
		}
		this.Takeem_masterDataService.get_evaluation_with_evaluation_subject(valx).subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
			() => {
				this.dataSource.data = this.ELEMENT_DATA;
			}
		);
	 })
	 
		//this.get_evaluation();
		// save click
		this.Takeem_masterDataService.cClickedEvent
		.subscribe((data: string) => {
	var	val2 = {
		evaluation_id	: 0	,
		evaluation_object	: 0	,
		evaluation_object_name	: this.Takeem_masterDataService.evaluation_object_name	,
		evaluation_subject	: this.Takeem_masterDataService.evaluation_subject	,
		evaluation_subject_id	: this.Takeem_masterDataService.evaluation_subject_id	,
		the_object_id	: Number(this.Takeem_masterDataService.evaluation_object_id)	,
		evaluation_date	: this.Takeem_masterDataService.evaluation_date	,
		
		}
		this.Takeem_masterDataService.addTakeem_master(val2).subscribe(res => { 
			var returned_id = Number(res)
			for (let i = 0; i < this.selection.selected.length; i++) {
				var val = {
					takeem_id: returned_id,
					Evaluation_item_id: this.selection.selected[i].evaluation_id,
					Evaluation_item_name: this.selection.selected[i].evaluation_item_name,
					Evaluation_appreciation:String(this.selection.selected[i].evaluation_appreciation),
					Evaluation_score:this.selection.selected[i].evaluation_score,
					evaluation_result:Number(this.selection.selected[i].evaluation_id)
	};
				this.Takeem_detailsDataService.addTakeem_details(val).subscribe()
			}
			alert("Added Successfully");
			});
		});
		//bind event

//edit click
	 this.Takeem_masterDataService.eClickedEvent
	 .subscribe((data: string) => {
 var	val2 = {
	takeem_id:this.Takeem_masterDataService.takeem_id,
	 evaluation_id	: 0	,
	 evaluation_object	: 0	,
	 evaluation_object_name	: this.Takeem_masterDataService.evaluation_object_name	,
	 evaluation_subject	: this.Takeem_masterDataService.evaluation_subject	,
	 evaluation_subject_id	: this.Takeem_masterDataService.evaluation_subject_id	,
	 the_object_id	: Number(this.Takeem_masterDataService.evaluation_object_id)	,
	 evaluation_date	: this.Takeem_masterDataService.evaluation_date	,
	 
	 }
	 this.Takeem_masterDataService.updateTakeem_master(val2).subscribe(res => { 
		this.Takeem_detailsDataService.deleteTakeem_details(this.Takeem_masterDataService.takeem_id).subscribe(res => { 
		 for (let i = 0; i < this.selection.selected.length; i++) {
			 var val = {
				 takeem_id: this.Takeem_masterDataService.takeem_id,
				 Evaluation_item_id: this.selection.selected[i].evaluation_item_id,
				 Evaluation_item_name: this.selection.selected[i].evaluation_item_name,
				 Evaluation_appreciation:String(this.selection.selected[i].evaluation_appreciation),
				 Evaluation_score:this.selection.selected[i].evaluation_score,
				 evaluation_result:Number(this.selection.selected[i].evaluation_result)
 };
			 this.Takeem_detailsDataService.addTakeem_details(val).subscribe()
		 }
		 alert("Added Successfully");
		 });
		});
 
	 
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
	 * Delete selected customers
	 */
	deleteCustomers() {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				// idsForDeletion.push(this.selection.selected[i].dep_id);
			}
			this.store.dispatch(new ManyCustomersDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected customers
	 */
	fetchCustomers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				// text: `${elem.lastName}, ${elem.firstName}`,
				// id: elem.dep_id.toString(),
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
				// text: `${elem.lastName}, ${elem.firstName}`,
				// id: elem.dep_id.toString(),
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

			// this.store.dispatch(new CustomersStatusUpdated({
			// 	status: +res,
			// 	// customers: this.selection.selected
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
	Takeem_master_info: any [];

	/**
	 * Check all rows are selected
	 */
	editCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService ) {

		this.Takeem_masterDataService.GetAllTakeem_master_with_id(customer.takeem_id).subscribe(data => this.Takeem_master_info = data,
			error => console.log(),
			() => {
				for (let item of this.Takeem_master_info) {
					this.Takeem_masterDataService.takeem_id = Number(item.takeem_id);

					this.Takeem_masterDataService.evaluation_id = item.evaluation_id;
					this.Takeem_masterDataService.evaluation_object = item.evaluation_object;
					this.Takeem_masterDataService.evaluation_object_name = item.evaluation_object_name;
					this.Takeem_masterDataService.evaluation_subject = item.evaluation_subject;
					this.Takeem_masterDataService.evaluation_subject_id = item.evaluation_subject_id;
					this.Takeem_masterDataService.the_object_id = item.the_object_id;
					this.Takeem_masterDataService.evaluation_date = item.evaluation_date;





				};
				this.Takeem_masterDataService.AClicked('Component A is clicked!!');
			}
		);


	}
	deleteCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService) {

		this.Takeem_masterDataService.deleteTakeem_master(Number(customer.takeem_id)).subscribe(res => {
			// this.get_Takeemaster(Takeem_masterDataService);
			alert("Deleted Successfully");

		})

	}
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
	}

}


