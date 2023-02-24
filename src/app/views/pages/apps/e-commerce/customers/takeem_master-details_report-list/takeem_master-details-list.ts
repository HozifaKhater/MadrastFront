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
// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-Takeem_master-details_report-list',
	templateUrl: './takeem_master-details-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class TakeemMasterDetails_reportListComponent implements OnInit, OnDestroy {
	// Table fields


    Element1: [{ id: "1" },
        { id: "2" }];
	displayedColumns = ['evaluation_id', 'evaluation_item_name', 'evaluation_appreciation'];

	ELEMENT_DATA: Element[];
        //= [{ "dep_id": 1, "dep_name": "main dep", "dep_desc": null, "dep_supervisor_id": 0, "dep_supervisor_name": null },
        //{"dep_id": 2, "dep_name": "asdasd","dep_desc": null, "dep_supervisor_id": 0, "dep_supervisor_name": null},
        //{ "dep_id": 3, "dep_name": "asd", "dep_desc": null, "dep_supervisor_id": 0, "dep_supervisor_name": null },
        //{ "dep_id": 4, "dep_name": "main dep2", "dep_desc": null, "dep_supervisor_id": 0, "dep_supervisor_name": null },
        //{ "dep_id": 5, "dep_name": "Master Department", "dep_desc": null, "dep_supervisor_id": 0, "dep_supervisor_name": null }]
/*	dataSource: [{ "dep_id": 1, "dep_name": "main dep", "dep_desc": "asdasd", "dep_supervisor_id": 0, "dep_supervisor_name": "1", "parent_id": 1 }];*/
	/*dataSource = new MatTableDataSource(this.ELEMENT_DATA)*/
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	//this.dataSource.push(model);  //add the new model object to the dataSource
		//this.dataSource = [...this.dataSource];  //refresh the dataSource
	Takeem_masterMaster: Takeem_masterMaster[];
	//dataSource = new MatTableDataSource<OrdersDetailsDataSource>(null);
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	//@ViewChild('sort1', { static: true }) sort: MatSort;
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
			error => console.log(error),
			() => {  console.log("ffff", this.eva_settings) }
		);
		this.dataSource = new MatTableDataSource([]);

	}
	eva_settings:any;
	get_evaluation() {

		this.Evaluation_itemsDataService.GetAllEvaluation_items().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(error),
			() => { console.log(this.ELEMENT_DATA); this.dataSource.data = this.ELEMENT_DATA} 
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
		console.log("testdclick")
		var valx = {
			evaluation_subject_id:this.Takeem_masterDataService.evaluation_subject_id,
			evaluation_date:this.Takeem_masterDataService.evaluation_date
		}
		this.Takeem_masterDataService.get_evaluation_with_evaluation_subject(valx).subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(error),
			() => {this.dataSource.data = this.ELEMENT_DATA;
			console.log("dataintable",this.ELEMENT_DATA)}
		);
	 })
	 
		//this.get_evaluation();
		// save click
		this.Takeem_masterDataService.cClickedEvent
		.subscribe((data: string) => {
		console.log("testtakem",this.selection.selected)
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
			console.log("testtakem",this.selection.selected)
			for (let i = 0; i < this.selection.selected.length; i++) {
				var val = {
					takeem_id: returned_id,
					Evaluation_item_id: this.selection.selected[i].evaluation_id,
					Evaluation_item_name: this.selection.selected[i].evaluation_item_name,
					Evaluation_appreciation:String(this.selection.selected[i].evaluation_appreciation),
					Evaluation_score:this.selection.selected[i].evaluation_score,
					evaluation_result:Number(this.selection.selected[i].evaluation_id)
	};console.log("valbefore", val)
				this.Takeem_detailsDataService.addTakeem_details(val).subscribe(res => {  console.log("val", val) })
			}
			alert("Added Successfully");
			});
		});
		//bind event

//edit click
	 this.Takeem_masterDataService.eClickedEvent
	 .subscribe((data: string) => {
	 console.log("testtakem",this.selection.selected)
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
	 console.log("val2",val2);
	 this.Takeem_masterDataService.updateTakeem_master(val2).subscribe(res => { 
		console.log("going to delete");
		this.Takeem_detailsDataService.deleteTakeem_details(this.Takeem_masterDataService.takeem_id).subscribe(res => { 
			console.log("deleted");
		 console.log("testtakem",this.selection.selected)
		 for (let i = 0; i < this.selection.selected.length; i++) {
			 var val = {
				 takeem_id: this.Takeem_masterDataService.takeem_id,
				 Evaluation_item_id: this.selection.selected[i].evaluation_item_id,
				 Evaluation_item_name: this.selection.selected[i].evaluation_item_name,
				 Evaluation_appreciation:String(this.selection.selected[i].evaluation_appreciation),
				 Evaluation_score:this.selection.selected[i].evaluation_score,
				 evaluation_result:Number(this.selection.selected[i].evaluation_result)
 };console.log("valbeforeadd", val)
			 this.Takeem_detailsDataService.addTakeem_details(val).subscribe(res => {  console.log("val", val) })
		 }
		 alert("Added Successfully");
		 });
		});
 
	 
	 });
		let model: any = [{ 'id': 1, 'assetID': 2, 'severity': 3, 'riskIndex': 4, 'riskValue': 5, 'ticketOpened': true, 'lastModifiedDate': "2018 - 12 - 10", 'eventType': 'Add' }];  //get the model from the form
		//this.dataSource.push(model);  //add the new model object to the dataSource
		//this.dataSource = [...this.dataSource];  //refresh the dataSource

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
        console.log("yyyy",this.ELEMENT_DATA);
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
	//editCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService ) {

	//	//this.DepartmentService.data = Number(customer.dep_id)
	//	//console.log('CUSTOMER ID', Number(customer.dep_id));
	//	console.log('CUSTOMER ID', customer.takeem_id);
	//	this.Takeem_masterDataService.GetAllTakeem_master_with_id(customer.takeem_id).subscribe(data => this.Takeem_master_info = data,
	//		error => console.log("errorrrrrrrrrrr"),
	//		() => {
	//			for (let item of this.Takeem_master_info) {
	//				console.log(item.takeem_id)
	//				this.Takeem_masterDataService.takeem_id = Number(item.takeem_id);
	//				console.log('testdepname', item.evaluation_object_name);
					
	//				this.Takeem_masterDataService.evaluation_id = item.evaluation_id;
	//				this.Takeem_masterDataService.evaluation_object = item.evaluation_object;
	//				this.Takeem_masterDataService.evaluation_object_name = item.evaluation_object_name;
	//				this.Takeem_masterDataService.evaluation_subject = item.evaluation_subject;
	//				this.Takeem_masterDataService.evaluation_subject_id = item.evaluation_subject_id;
	//				this.Takeem_masterDataService.the_object_id = item.the_object_id;
	//				this.Takeem_masterDataService.evaluation_date = item.evaluation_date;



			
		
	//			};
	//			console.log('Component A is clicked!!', this.Takeem_masterDataService.takeem_id);
	//			this.Takeem_masterDataService.AClicked('Component A is clicked!!');
	//		}
	//	);
		

	//}
	//deleteCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService) {
	
	//	console.log('CUSTOMER ID', customer.takeem_id);
	//	this.Takeem_masterDataService.deleteTakeem_master(Number(customer.takeem_id)).subscribe(res => {
	//		this.get_Takeemaster(Takeem_masterDataService);
	//		alert(res.toString());
		
	//	})
		
	//}
	
	/**
	 * Check all rows are selected
	 */
	editCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService ) {

		//this.DepartmentService.data = Number(customer.dep_id)
		//console.log('CUSTOMER ID', Number(customer.dep_id));
		console.log('CUSTOMER ID', customer.takeem_id);
		this.Takeem_masterDataService.GetAllTakeem_master_with_id(customer.takeem_id).subscribe(data => this.Takeem_master_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				for (let item of this.Takeem_master_info) {
					console.log(item.takeem_id)
					this.Takeem_masterDataService.takeem_id = Number(item.takeem_id);
					console.log('testdepname', item.evaluation_object_name);

					this.Takeem_masterDataService.evaluation_id = item.evaluation_id;
					this.Takeem_masterDataService.evaluation_object = item.evaluation_object;
					this.Takeem_masterDataService.evaluation_object_name = item.evaluation_object_name;
					this.Takeem_masterDataService.evaluation_subject = item.evaluation_subject;
					this.Takeem_masterDataService.evaluation_subject_id = item.evaluation_subject_id;
					this.Takeem_masterDataService.the_object_id = item.the_object_id;
					this.Takeem_masterDataService.evaluation_date = item.evaluation_date;





				};
				console.log('Component A is clicked!!', this.Takeem_masterDataService.takeem_id);
				this.Takeem_masterDataService.AClicked('Component A is clicked!!');
			}
		);


	}
	deleteCustomer(customer: Takeem_master, Takeem_masterDataService: Takeem_masterDataService) {

		console.log('CUSTOMER ID', customer.takeem_id);
		this.Takeem_masterDataService.deleteTakeem_master(Number(customer.takeem_id)).subscribe(res => {
			// this.get_Takeemaster(Takeem_masterDataService);
			alert(res.toString());

		})

	}
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	masterToggle() {
		if (this.selection.selected.length === this.customersResult.length) {
			this.selection.clear();
		} else {
			// this.customersResult.forEach(row => this.selection.select(row));
		}
	}

	/** UI */
	/**
	 * Retursn CSS Class Name by status
	 *
	 * @param status: number
	 */
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'danger';
			case 1:
				return 'success';
			case 2:
				return 'metal';
		}
		return '';
	}

	/**
	 * Returns Item Status in string
	 * @param status: number
	 */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'تم الشرح';
			case 1:
				return 'Active';
			case 2:
				return 'Pending';
		}
		return '';
	}

	/**
	 * Returns CSS Class Name by type
	 * @param status: number
	 */
	getItemCssClassByType(status: number = 0): string {
		switch (status) {
			case 0:
				return 'accent';
			case 1:
				return 'primary';
			case 2:
				return '';
		}
		return '';
	}

	/**
	 * Returns Item Type in string
	 * @param status: number
	 */
	getItemTypeString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Business';
			case 1:
				return 'مثال7';
		}
		return '';
    }
   public test()
    {
    return 0;
};
  
 

}


