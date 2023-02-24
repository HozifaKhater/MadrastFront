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
import { RestToRedo } from '../../../../../../RestToRedo.Model';
import { behaviours_statusDataService } from '../../../../../../Services/behaviours_statusDataService';
import { behaviours_status,behaviours_statusMaster,behaviours_status_details } from '../../../../../../behaviours_status.Model';


@Component({

	selector: 'kt-behaviors_status_detais-list',
	templateUrl: './behaviors_status_detais-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class behaviors_status_detaisListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: RestToRedo[];

	displayedColumns = ['select', 'ser','another_situations','date','efforts','end_year_situation','actions'];
	
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
		private behaviours_statusDataService: behaviours_statusDataService
    ) {
        this.dataSource = new MatTableDataSource([]);
		this.dataSource.data.unshift({ser: null, another_situations: null, date: null, efforts:null, end_year_situation:null});
		this.show_actions = false
	}
	student_name:any;
	show_actions:any;
	showInput = true;
	GetRestToRedo( id) {
		this.behaviours_statusDataService.get_behaviours_status_details_with_behaviour_status_id(id).subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () =>{
				this.dataSource.data = this.ELEMENT_DATA
				


				console.log('all rest to redo ', this.ELEMENT_DATA)
			} 
		);

        
    }

    customersResult: RestToRedo[] = [];

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.customersResult.length;
        return numSelected === numRows;
    }

	restToRedo_info: any[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
	 counter : number= 2;
	 Delete_Catch_Reciept(){}
	Add(behaviours_status_details: behaviours_status_details){
		
		this.dataSource.data.push({ser: this.counter,
			 another_situations: behaviours_status_details.another_situations,
			  date:  behaviours_status_details.date, 
			  efforts:behaviours_status_details.efforts, 
			  end_year_situation:behaviours_status_details.end_year_situation});
			  this.behaviours_statusDataService.details=  this.dataSource.data;
			  this.counter+= 1;
			  this.dataSource.paginator = this.paginator;
			  this.dataSource.data[0].ser = 1;
  this.dataSource.data[0].another_situations = '';
  this.dataSource.data[0].date = '';
  this.dataSource.data[0].efforts = '';
  this.dataSource.data[0].end_year_situation = '';
		console.log(this.dataSource.data,"studentstudent")
	}

	
	EditRestToRedo(behaviours_status_details: behaviours_status_details) {
		if (!Number.isNaN(Number(behaviours_status_details.ser))) {
		var newbehaviours_status = {
			ser: behaviours_status_details.ser,
			behaviour_status_id: behaviours_status_details.behaviour_status_id,
			student_id: behaviours_status_details.student_id,
			another_situations: behaviours_status_details.another_situations,
			date: behaviours_status_details.date,
			efforts: behaviours_status_details.efforts,
			end_year_situation: behaviours_status_details.end_year_situation,

		}

		console.log("new Rest To Redo", newbehaviours_status);

		this.behaviours_statusDataService.update_behaviours_status_details(newbehaviours_status).subscribe(res => {
		})
	}
       // this.behaviours_statusDataService.id = String(student.id);

		// this.behaviours_statusDataService.GetRestToRedoWithId(student.id).subscribe((data:any) => this.restToRedo_info = data.data,
		// 	error => console.log("error in edit rest to redo"),
		// 	() => {
		// 		for (let item of this.restToRedo_info) {

		// 			console.log('selected restToRedo', item);

		// 			this.behaviours_statusDataService.level_id = item.level_id;

        //             this.behaviours_statusDataService.level_name = item.level_name;

		// 			this.behaviours_statusDataService.class_id = item.class_id;
                    
        //             this.behaviours_statusDataService.class_name = item.class_name;

        //             this.behaviours_statusDataService.student_id = item.student_id;

        //             this.behaviours_statusDataService.student_name = item.student_name;

        //             this.behaviours_statusDataService.def_id = item.def_id;

        //             this.behaviours_statusDataService.s_code = item.s_code;

        //             this.behaviours_statusDataService.date_of_file_opening = item.date_of_file_opening;

        //             this.behaviours_statusDataService.reasons = item.reasons;

        //             this.behaviours_statusDataService.results = item.results;				
		// 		};

		// 		console.log('Component A is clicked!!', this.behaviours_statusDataService.student_name);

		// 		this.behaviours_statusDataService.AClicked('Component A is clicked!!');
		// 	}
		//);
	}

	DeleteRestToRedo(behaviours_status_details: behaviours_status_details) {

		console.log('rest to redo id', behaviours_status_details.ser);

		this.behaviours_statusDataService.delete_from_behaviours_status_details(Number(behaviours_status_details.ser)).subscribe(res => {
			//this.GetRestToRedo();
			alert("Deleted Sucesfully :) ");
		})
	}

	ngOnInit() {
        
       // this.GetRestToRedo();

		// this.behaviours_statusDataService.bClickedEvent
		// .subscribe((data: string) => {
		// 	this.GetRestToRedo();
		// });
		this.behaviours_statusDataService.get_detailsClickedEvent
		.subscribe((data: string) => {
			this.GetRestToRedo(this.behaviours_statusDataService.id);
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

	selection = new SelectionModel<RestToRedo>(true, []);

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


