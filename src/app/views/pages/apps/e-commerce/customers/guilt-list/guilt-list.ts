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
import { GuiltServices } from '../../../../../../Services/GuiltServices';
import { Guilt } from '../../../../../../Guilt.Model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({

	selector: 'kt-guilt-list',
	templateUrl: './guilt-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class GuiltListComponent implements OnInit, OnDestroy {

	
    
    ELEMENT_DATA: Guilt[];

	displayedColumns = ['select', 'id','guilt','date_of_guilt','details_of_guilt','actions']
	
	dataSource: any;

    form1: FormGroup;

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
		private GuiltServices: GuiltServices,
        public _fb: FormBuilder
    ) {
        this.dataSource = new MatTableDataSource([]);
		this.GetGuilts();
        this.form1 = this._fb.group({
            guilt:[[Validators.required]],
            date_of_guilt : [[Validators.required]],
            details_of_guilt:[[Validators.required]],
            
        });
	}
	DeleteGuilt_all(){}
	GetGuilts() {
		this.GuiltServices.GetGuilts().subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () =>{
				this.dataSource.data = this.ELEMENT_DATA
				console.log('all Guilts', this.ELEMENT_DATA)
			} 
		);
    }



    customersResult: Guilt[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	Guilt_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }


	EditGuilt(student: Guilt) {
        this.GuiltServices.id = student.id;

		this.GuiltServices.GetGuiltById(student.id)
            .subscribe((data:any) => this.Guilt_info = data.data,
			error => console.log("error in edit guilt"),
			() => {
				for (let item of this.Guilt_info) {

					console.log('selected guilt', item);

					this.GuiltServices.guilt = item.guilt;

                    this.GuiltServices.date_of_guilt = item.date_of_guilt;

					this.GuiltServices.details_of_guilt = item.details_of_guilt;
                    
                    this.GuiltServices.student_id = item.student_id;

                    this.GuiltServices.student_name = item.student_name;
				};

				console.log('Component A is clicked!!', this.GuiltServices.student_name);

				this.GuiltServices.AClicked('Component A is clicked!!');
			}
		);
	}

	DeleteGuilt(guilt: Guilt) {
		console.log('guilt id', guilt.id);
		this.GuiltServices.DeleteGuilt(Number(guilt.id)).subscribe(res => {
			this.GetGuilts();
		})
	}


    private createForm(): void {  
        this.form1 = this._fb.group({  
            //tableRowArray is a FormArray which holds a list of FormGroups  
            tableRowArray: this._fb.array([  
                this.createTableRow()  
            ])  
        })  
    } 

    private createTableRow(): FormGroup {  
        return this._fb.group({  
            guilt: new FormControl(null, {  
                validators: [Validators.required]  
            }),  
            date_of_guilt: new FormControl(null, {  
                validators: [Validators.required]  
            }),  
            details_of_guilt: new FormControl(null, {  
                validators: [Validators.required]  
            })
        });  
    } 
	ngOnInit() {
        
        this.GetGuilts();
       // this.createForm();

		this.GuiltServices.bClickedEvent
		.subscribe((data: string) => {
			this.GetGuilts();
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

	selection = new SelectionModel<Guilt>(true, []);

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


