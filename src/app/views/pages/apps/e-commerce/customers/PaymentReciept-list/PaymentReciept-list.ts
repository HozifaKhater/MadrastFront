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

//import { PaymentReciept} from '../../../../../PaymentRecieptMasterModel';
//import { PaymentRecieptService } from 'src/app/Services/PaymentRecieptDataService';

import { PaymentReciept } from '../../../../../../PaymentRecieptMasterModel';
import { PaymentRecieptService } from '../../../../../../Services/PaymentRecieptDataService';

@Component({

	selector: 'kt-PaymentReciept-list',
	templateUrl: './PaymentReciept-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class PaymentRecieptListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: PaymentReciept[];

	displayedColumns = ['select', 'serial_number', 'region', 'center_number','school_name',
        'dinar_value','fels_value','date_of_reciept','client_name','identity_number','total_in_arabic',
        'cash_or_check','bank_name','details','actions'];
	
	dataSource: any;

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
		private PaymentRecieptService: PaymentRecieptService
    ) {
        this.dataSource = new MatTableDataSource([]);
		//this.Get_Catch_Reciepts(CatchRecieptService);
	}
	Delete_Catch_Reciept_all(){}
	Get_Payment_Reciepts() {
		
		
		this.PaymentRecieptService.GetPaymentReciepts().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () => this.dataSource.data = this.ELEMENT_DATA
		);

		console.log('all reciepts ', this.dataSource);
        console.log('all reciepts 2 ', this.ELEMENT_DATA);
    }


    customersResult: PaymentReciept[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	reciept_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	Edit_Payment_Reciept(reciept: PaymentReciept) {
        this.PaymentRecieptService.id = reciept.id;

		this.PaymentRecieptService.GetPaymentRecieptWithId(reciept.id).subscribe((data:any) => this.reciept_info = data.data,
			error => console.log("error in edit reciept"),
			() => {
				for (let item of this.reciept_info) {

					console.log('selected reciept', item);

					this.PaymentRecieptService.title = item.title;

					this.PaymentRecieptService.serial_number = item.serial_number;

					this.PaymentRecieptService.region = item.region;

                    this.PaymentRecieptService.center_number = item.center_number;

                    this.PaymentRecieptService.school_name = item.school_name;

                    this.PaymentRecieptService.dinar_value = item.dinar_value;

                    this.PaymentRecieptService.fels_value = item.fels_value;

                    this.PaymentRecieptService.date_of_reciept = item.date_of_reciept;

                    this.PaymentRecieptService.client_name = item.client_name;

                    this.PaymentRecieptService.emp_id = item.emp_id;

                    this.PaymentRecieptService.total_in_arabic = item.total_in_arabic;

                    this.PaymentRecieptService.cash_or_check = item.cash_or_check;

                    this.PaymentRecieptService.bank_name = item.bank_name;

                    this.PaymentRecieptService.details = item.details;

                    this.PaymentRecieptService.identity_number = item.identity_number;
				
				};

				console.log('Component A is clicked!!', this.PaymentRecieptService.client_name);

				this.PaymentRecieptService.AClicked('Component A is clicked!!');
			}
		);
	}

	Delete_Payment_Reciept(reciept: PaymentReciept, PaymentRecieptService: PaymentRecieptService) {

		console.log('reciept ID', reciept.id);

		this.PaymentRecieptService.DeletePaymentReciept(Number(reciept.id)).subscribe(res => {
			this.Get_Payment_Reciepts();
			alert("Deleted Sucesfully :) ");
		})
	}

	ngOnInit() {
        
        this.Get_Payment_Reciepts();

		this.PaymentRecieptService.bClickedEvent
		.subscribe((data: string) => {
			this.Get_Payment_Reciepts();
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

	selection = new SelectionModel<PaymentReciept>(true, []);

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


