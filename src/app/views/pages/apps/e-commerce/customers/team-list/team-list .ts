﻿// Angular
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
import { teams_and_groupsDataService } from '../../../../../../Services/teams_and_groupsDataService';

import { teams_and_groupsMaster, teams_and_groups } from '../../../../../../teams_and_groupsMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-teams-list',
	templateUrl: './team-list .html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class TeamsListComponent implements OnInit, OnDestroy {
	// Table fields


    Element1: [{ id: "1" },
        { id: "2" }];
	displayedColumns = ['select', 'id', 'name', 'goals','actions'];

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
	teams_and_groupsMaster: teams_and_groupsMaster[];
	//dataSource = new MatTableDataSource<OrdersDetailsDataSource>(null);
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	//@ViewChild('sort1', { static: true }) sort: MatSort;
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
		private teams_and_groupsDataService: teams_and_groupsDataService
	) {
		
		this.dataSource = new MatTableDataSource([]);
	}
	get_team() {

		this.teams_and_groupsDataService.GetAllteams_and_groups().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(error),
			() => this.dataSource.data = this.ELEMENT_DATA
		); }
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
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
			this.teams_and_groupsDataService.deleteteams_and_groups(Number(this.selection.selected[i].id))
			.subscribe((data: string) => {
                this.get_team();
            });
		}
		alert("تم حذف الكل")
	}

	priv_info:any=[];
	ngOnInit() {
		
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

		this.teams_and_groupsDataService.bClickedEvent
		.subscribe((data: string) => {
			this.get_team();
		});
	this.get_team()
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
	Teams_info: any [];
	editCustomer(customer: teams_and_groups, teams_and_groupsDataService: teams_and_groupsDataService ) {

		this.teams_and_groupsDataService.GetAllteams_and_groups_with_id(customer.id).subscribe(data => this.Teams_info = data,
			error => console.log(),
			() => {
				for (let item of this.Teams_info) {
					this.teams_and_groupsDataService.id = Number(item.id);
					
					this.teams_and_groupsDataService.type_id = item.type_id;
					this.teams_and_groupsDataService.type_name = item.type_name;
					this.teams_and_groupsDataService.name = item.name;
					this.teams_and_groupsDataService.goals = item.goals;
					this.teams_and_groupsDataService.emp_name	=	item.emp_name	;
					this.teams_and_groupsDataService.emp_id	=	item.emp_id	;
					this.teams_and_groupsDataService.dep_id	=	item.dep_id	;
					this.teams_and_groupsDataService.dep_name	=	item.dep_name	;
				   

		
				};
				this.teams_and_groupsDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	deleteCustomer(customer: teams_and_groups, teams_and_groupsDataService: teams_and_groupsDataService) {
	
		this.teams_and_groupsDataService.deleteteams_and_groups(Number(customer.id)).subscribe(res => {
			this.get_team();
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

