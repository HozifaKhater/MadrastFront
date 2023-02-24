// Angular
import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
import { ActivityDataService } from '../../../../../../Services/ActivityDataService';
import { ActivityMaster, activity } from '../../../../../../ActivityMaster.Model';
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
	selector: 'kt-activities-list',
    templateUrl: './activities-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select', 'activity_id', 'activity_name', 'activity_dep', 'activity_school_year','activity_level' ,'actions'];
    
	ELEMENT_DATA: Element[]
        
    dataSource: any;
   
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	
    activities: ActivityMaster[];
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';

	// Selection
	selection = new SelectionModel<activity>(true, []);
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
	test_perm:any;
	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
        private ActivityDataService: ActivityDataService
	) {
        this.dataSource = new MatTableDataSource([]);

        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				if (this.priv_info.length > 0 ){
					this.read=this.priv_info[0].read;
					this.write=this.priv_info[0].write;
					this.read_and_Write=this.priv_info[0].read_and_Write;
				}
			}
		);    
	}
	priv_info:any=[];
	read:any;
	write:any;
	read_and_Write:any;

    get_data() {
        this.ActivityDataService.GetAllActivity().subscribe(data => this.ELEMENT_DATA = data,
            error => console.log(),
            () => this.dataSource.data = this.ELEMENT_DATA);
    }

	activities_info: any[];
	editCustomer(activity: activity) {

		this.ActivityDataService.activity_id = Number(activity.activity_id);
		this.ActivityDataService.GetAllActivity_with_id(activity.activity_id).subscribe(data => this.activities_info = data,
			error => console.log(),
			() => {
				for (let item of this.activities_info) {

					this.ActivityDataService.activity_name = item.activity_name;
                    this.ActivityDataService.activity_school_year_id = item.activity_school_year_id;
					this.ActivityDataService.activity_dep = item.activity_dep;
					this.ActivityDataService.activity_school_year = item.activity_school_year;
					this.ActivityDataService.activity_level = item.activity_level;
					this.ActivityDataService.activity_date = item.activity_date;
					this.ActivityDataService.activity_school_term = item.activity_school_term;
					this.ActivityDataService.activity_notes = item.activity_notes;
					this.ActivityDataService.dep_id = item.dep_id;
				};

				this.ActivityDataService.AClicked('Component A is clicked!!');
			}
		);


	}

	deleteCustomer(activity: activity ) {
		this.ActivityDataService.deleteActivity(Number(activity.activity_id)).subscribe(res => {
			alert("Deleted Successfully");
            this.get_data();
		})
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
			this.ActivityDataService.deleteActivity(Number(this.selection.selected[i].activity_id))
			.subscribe(res => {
				this.get_data();
			})
			
		}
		alert("تم حذف الكل");
	}


	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log());
		
	
        this.ActivityDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_data();
            });

        this.get_data();

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
			// messages.push({
			// 	text: `${elem.lastName}, ${elem.firstName}`,
			// 	id: elem.id.toString(),
			// 	status: elem.status
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
			
		});

		const dialogRef = this.layoutUtilsService.updateStatusForEntities(_title, _statuses, _messages);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				this.selection.clear();
				return;
			}

			this.layoutUtilsService.showActionNotification(_updateMessage, MessageType.Update, 10000, true, true);
			this.selection.clear();
		});
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
