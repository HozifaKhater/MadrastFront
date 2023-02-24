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
/*import { GridListEntryComponent } from '../../../../material/layout/grid-list-entry/grid-list-entry.component';*/

import { user_privDataService } from '../../../../../../Services/user_privDataService ';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../../EmployeeMaster.Model';
import { environment } from '../../../../../../../../src/environments/environment';
// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-ezons-list-edit-state',
	templateUrl: './ezons-list-edit-state.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})

export class EzonListEditStateComponent implements OnInit, OnDestroy {
	// Table fields


    Element1: [{ id: "1" },
        { id: "2" }];
	displayedColumns = ['select', 'ezn_id', 'emp_name','civil_id','emp_dep', 'ezn_date', 'time_from', 'time_to','ezn_state'];

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
	EzonMaster: EzonMaster[];
	//dataSource = new MatTableDataSource<OrdersDetailsDataSource>(null);
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	//@ViewChild('sort1', { static: true }) sort: MatSort;
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
	 private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private EzonDataService: EzonDataService,
		private router: Router
	) {
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
        this.dataSource = new MatTableDataSource([]);
	}
	deleteCustomers_all(){}
	decoded:any;
	Employee: Employee[];
	get_ezons(emp_id) {
        this.EzonDataService.GetAllEzon_with_emp_id(emp_id).subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(error),
			() => this.dataSource.data = this.ELEMENT_DATA
		); }
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ezon_info: any[];
	editCustomer(ezon: ezon) {

		//this.DepartmentService.data = Number(customer.dep_id)
		//console.log('CUSTOMER ID', Number(customer.dep_id));
		console.log('CUSTOMER ID', ezon.ezn_id);
		this.EzonDataService.ezn_id = Number(ezon.ezn_id);
		this.EzonDataService.GetAllEzon_with_id(ezon.ezn_id).subscribe(data => this.ezon_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				for (let item of this.ezon_info) {
					console.log(item.dep_id)
					
					console.log('testdepname', item.corridor_name);

					
					this.EzonDataService.absent_ezn_id = item.absent_ezn_id;
					this.EzonDataService.premit_id = item.premit_id;
					this.EzonDataService.emp_id = item.emp_id;
					this.EzonDataService.ezn_date = item.ezn_date;
					this.EzonDataService.ezn_reason = item.ezn_reason;
					this.EzonDataService.time_from = item.time_from;
					this.EzonDataService.time_to = item.time_to;
					this.EzonDataService.ezn_state = item.ezn_state;
				};
				console.log('Component A is clicked!!', this.EzonDataService.ezn_id);
				this.EzonDataService.AClicked('Component A is clicked!!');
			}
		);
		this.router.navigate(['/material/layout/grid-list-entry']);

	}
	deleteCustomer(ezon: ezon, EzonDataService: EzonDataService) {

		console.log('CUSTOMER ID', ezon.ezn_id);
		this.EzonDataService.deleteEzon(Number(ezon.ezn_id)).subscribe(res => {
            this.get_ezons(ezon.ezn_id);
			alert(res.toString());

		})

	}
	deleteCustomers(ezon: ezon, EzonDataService: EzonDataService) {
		for (let i = 0; i < this.selection.selected.length; i++) {
			if (this.selection.selected[i].ezn_state == "true") {
				console.log("d5lt!")
				this.selection.selected[i].ezn_state = "1"
			}
			if (this.selection.selected[i].ezn_state == "false") {
				console.log("d5lt!")
				this.selection.selected[i].ezn_state = "0"
			}
			var val = {
				ezn_id: Number(this.selection.selected[i].ezn_id),
				ezn_state: Number(this.selection.selected[i].ezn_state)

			};
			console.log("val", val);
			this.EzonDataService.updateEzon_for_state(val).subscribe(res => {
				console.log("updated!");
                this.get_ezons(this.EzonDataService.emp_id);

			})
			/*	idsForDeletion.push(this.selection.selected[i].dep_id);*/
		}
		alert("تم الاعتماد")
	}

	updateCheckedList(ezon: ezon){
		
		if (ezon.ezn_state == "true") {
			console.log("d5lt!")
			ezon.ezn_state = "1"
		}
		if (ezon.ezn_state == "false") {
			console.log("d5lt!")
			ezon.ezn_state = "0"
		}
		var val = {
			ezn_id: Number(ezon.ezn_id),
			ezn_state: Number(ezon.ezn_state),
			emp_id:	this.decoded.id,
			route:this.router.url as string,
			to_emp_id:ezon.emp_id,

		};
		
		console.log("val", val,ezon);
		console.log("ezooooooooooooon", ezon);
	
		this.EzonDataService.updateEzon_for_state(val).subscribe(res => {
			console.log("updated!");
			this.get_ezons(this.EzonDataService.emp_id);

		})
		alert("تم الاعتماد")
	}
		//const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.TITLE');
		//const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION');
		//const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION');
		//const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.MESSAGE');

		//const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		//dialogRef.afterClosed().subscribe(res => {
		//	if (!res) {
		//		return;
		//	}

		//	const idsForDeletion: number[] = [];

		//	//this.store.dispatch(new ManyCustomersDeleted({ ids: idsForDeletion }));
		//	//this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
		//	this.selection.clear();
		//});
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
	priv_info:any;
	masterToggle() {
		console.log("gest",this.customersResult,this.ELEMENT_DATA)
		this.customersResult = this.ELEMENT_DATA
		if (this.selection.selected.length === this.ELEMENT_DATA.length) {
			this.selection.clear();
			console.log("gest1")
		} else {
			this.customersResult.forEach(row => this.selection.select(row));
			console.log("gest2")
		}
	}
    ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 
        this.EzonDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_ezons(this.EzonDataService.emp_id);
            });
    

		this.EzonDataService.bindClickedEvent.subscribe((data: string) => {
			console.log("d5l 3la table1")
			this.EzonDataService.GetAllEzon_with_emp_id(this.EzonDataService.emp_id).subscribe(data => this.ELEMENT_DATA = data,
				error => console.log(error),
				() => { console.log("d5l 3la table", this.ELEMENT_DATA); this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) }
			);
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


	/**
	 * Fetch selected customers
	 */
	//fetchCustomers() {
	//	const messages = [];
	//	this.selection.selected.forEach(elem => {
	//		messages.push({
	//			text: `${elem.lastName}, ${elem.firstName}`,
	//			id: elem.dep_id.toString(),
	//			/*status: elem.status*/
	//		});
	//	});
	//	this.layoutUtilsService.fetchElements(messages);
		
	//}

	/**
	 * Show UpdateStatuDialog for selected customers
	 */
	//updateStatusForCustomers() {
	//	const _title = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.TITLE');
	//	const _updateMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.MESSAGE');
	//	const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
	//	const _messages = [];

	//	this.selection.selected.forEach(elem => {
	//		_messages.push({
	//			text: `${elem.lastName}, ${elem.firstName}`,
	//			id: elem.dep_id.toString(),
	//			//status: elem.status,
	//			//statusTitle: this.getItemStatusString(elem.status),
	//			//statusCssClass: this.getItemCssClassByStatus(elem.status)
	//		});
	//	});

	//	const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
	//	dialogRef.afterClosed().subscribe(res => {
	//		if (!res) {
	//			this.selection.clear();
	//			return;
	//		}

	//		this.store.dispatch(new CustomersStatusUpdated({
	//			status: +res,
	//			customers: this.selection.selected
	//		}));

	//		this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
	//		this.selection.clear();
	//	});
	//}

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
	corridor_info: any [];
	edit_corridor(ezon: ezon, EzonDataService: EzonDataService ) {

		//this.DepartmentService.data = Number(customer.dep_id)
		//console.log('CUSTOMER ID', Number(customer.dep_id));
		//console.log('emp ID', corridor.corridor_id);
		//this.corridorsDataService.corridor_id = Number(corridor.corridor_id);
		//this.corridorsDataService.GetAllCorridors_with_id(corridor.corridor_id).subscribe(data => this.corridor_info = data,
		//	error => console.log("errorrrrrrrrrrr", error),
		//	() => {
		//		for (let item of this.corridor_info) {
		//			console.log(item.dep_id)
					
		//			console.log('testempname', item.emp_name);
		//			this.corridorsDataService.corridor_name = item.corridor_name;
		//			this.corridorsDataService.corridor_desc = item.corridor_desc;
					

		
		//		};
		//		console.log('Component A is clicked!!', this.corridorsDataService);
		//		this.corridorsDataService.AClicked('Component A is clicked!!');
		//	}
		//);
		

	}
	delete_corridor(ezon: ezon, EzonDataService: EzonDataService ) {
	
		//console.log('CUSTOMER ID', corridor.corridor_id);
		//this.corridorsDataService.deleteCorridors(Number(corridor.corridor_id)).subscribe(res => {
		//	this.get_corridros(corridorsDataService);;
		//	alert(res.toString());
		
		//})
		
	}
	
	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
	}

	/**
	 * Toggle all selections
	 */
	//masterToggle() {
	//	if (this.selection.selected.length === this.customersResult.length) {
	//		this.selection.clear();
	//	} else {
	//		this.customersResult.forEach(row => this.selection.select(row));
	//	}
	//}

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
    //console.log("zzzzz", this.test);
 

}

//console.log("zzzzzz", this.departments)
export interface Element {
    dep_id: number;
    dep_name: string;
    dep_desc: string;
    dep_supervisor_id: number;
    dep_supervisor_name: string;
}
