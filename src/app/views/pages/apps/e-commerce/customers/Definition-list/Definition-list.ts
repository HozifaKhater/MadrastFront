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
// Components
import { DefinitionDataService } from '../../../../../../Services/Definition';
import { Definition, DefinitionMaster } from '../../../../../../Definitions.Model';
import { CustomersPageRequested } from '../../../../../../core/e-commerce';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';

@Component({

	selector: 'kt-Definition-list',
	templateUrl: './Definition-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class DefinitionListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: Definition[];

	displayedColumns = ['select', 'def_id', 'def_name', 's_code', 's_code_arabic', 'actions'];
	
	dataSource: any;

	allDefinitions: DefinitionMaster[];

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	private subscriptions: Subscription[] = [];

	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private DefinitionService: DefinitionDataService
    ) {
        this.dataSource = new MatTableDataSource([]);
		
	}

	get_definitions() {
		this.DefinitionService.GetDefinitions().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(),
            () => this.dataSource.data = this.ELEMENT_DATA
		);
    }

    customersResult: Definition[] = [];
    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }
	definition_info: any[];
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

	editDefinition(definition: Definition) {
        this.DefinitionService.def_id = definition.def_id;
		this.DefinitionService.GetDefinitionWithId(definition.def_id).subscribe(data => this.definition_info = data,
			error => console.log(),
			() => {
				for (let item of this.definition_info) {

					this.DefinitionService.def_name = item.def_name;

					this.DefinitionService.s_code = item.s_code;

					this.DefinitionService.s_code_arabic = item.s_code_arabic;
				
				};
				this.DefinitionService.AClicked('Component A is clicked!!');
			}
		);


	}

	deleteDefinition(definition: Definition) {

		this.DefinitionService.deleteDefinition(Number(definition.def_id)).subscribe(res => {
			this.get_definitions();;
			alert("Deleted Succesfully");

		})
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
			this.DefinitionService.deleteDefinition(Number(this.selection.selected[i].def_id))
			.subscribe((data: string) => {
                this.get_definitions()
            });
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];

	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log());

        this.DefinitionService.bClickedEvent
            .subscribe((data: string) => {
                this.get_definitions()
            });

        this.get_definitions();

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

		// First load
		of(undefined).pipe(take(1), delay(1000)).subscribe(() => { // Remove this line, just loading imitation
            this.loadCustomersList();
		}); // Remove this line, just loading imitation
	}

	selection = new SelectionModel<Definition>(true, []);

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

	filterStatus: string = '';

	filterType: string = '';

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


	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}


}


