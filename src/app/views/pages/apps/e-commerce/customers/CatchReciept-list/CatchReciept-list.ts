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
import { CustomersPageRequested } from '../../../../../../core/e-commerce';
import { CatchReciept, CatchRecieptMaster } from '../../../../../../CatchReciept.Model';
import { CatchRecieptService } from '../../../../../../Services/CatchRecieptService';


@Component({

	selector: 'kt-CatchReciept-list',
	templateUrl: './CatchReciept-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class CatchRecieptListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: CatchReciept[];

	displayedColumns = ['select', 'serial_number', 'region', 'center_number','school_name',
        'dinar_value','fels_value','date_of_reciept','client_name','total_in_arabic',
        'cache_or_check','bank_name','details','actions'];
	
	dataSource: any;

	allReciepts: CatchRecieptMaster[];

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	private subscriptions: Subscription[] = [];
    
	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private CatchRecieptService: CatchRecieptService
    ) {
        this.dataSource = new MatTableDataSource([]);
		//this.Get_Catch_Reciepts(CatchRecieptService);
	}

	Get_Catch_Reciepts() {
		
		
		this.CatchRecieptService.GetCatchReciept().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () => this.dataSource.data = this.ELEMENT_DATA
		);

		console.log('all reciepts ', this.dataSource);
        console.log('all reciepts 2 ', this.ELEMENT_DATA);
    }


    customersResult: CatchReciept[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	reciept_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	Edit_Catch_Reciept(reciept: CatchReciept) {
        this.CatchRecieptService.id = reciept.id;

		this.CatchRecieptService.GetCatchRecieptWithId(reciept.id).subscribe((data:any) => this.reciept_info = data.data,
			error => console.log("error in edit reciept"),
			() => {
				for (let item of this.reciept_info) {

					console.log('selected reciept', item);

					this.CatchRecieptService.title = item.title;

					this.CatchRecieptService.serial_number = item.serial_number;

					this.CatchRecieptService.region = item.region;

                    this.CatchRecieptService.center_number = item.center_number;

                    this.CatchRecieptService.school_name = item.school_name;

                    this.CatchRecieptService.dinar_value = item.dinar_value;

                    this.CatchRecieptService.fels_value = item.fels_value;

                    this.CatchRecieptService.date_of_reciept = item.date_of_reciept;

                    this.CatchRecieptService.client_name = item.client_name;

                    this.CatchRecieptService.emp_id = item.emp_id;

                    this.CatchRecieptService.total_in_arabic = item.total_in_arabic;

                    this.CatchRecieptService.cache_or_check = item.cache_or_check;

                    this.CatchRecieptService.bank_name = item.bank_name;

                    this.CatchRecieptService.details = item.details;
				
				};

				console.log('Component A is clicked!!', this.CatchRecieptService.client_name);

				this.CatchRecieptService.AClicked('Component A is clicked!!');
			}
		);
	}

	Delete_Catch_Reciept(reciept: CatchReciept, CatchRecieptService: CatchRecieptService) {

		console.log('reciept ID', reciept.id);

		this.CatchRecieptService.DeleteCatchReciept(Number(reciept.id)).subscribe(res => {
			this.Get_Catch_Reciepts();
			alert("Deleted Sucesfully :) ");
		})
	}
	Delete_Catch_Reciept_all(){}
	ngOnInit() {
        
        this.Get_Catch_Reciepts();

		this.CatchRecieptService.bClickedEvent
		.subscribe((data: string) => {
			this.Get_Catch_Reciepts();
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

        const searchSubscription = fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
            // tslint:disable-next-line:max-line-length
            debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
            distinctUntilChanged(), // This operator will eliminate duplicate values
            tap(() => {
                console.log("searchhhh", searchSubscription)
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

	selection = new SelectionModel<CatchReciept>(true, []);

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
		console.log("yyyy", this.ELEMENT_DATA);
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
        this.dataSource.filter = searchText;
		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	}


	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}


}


