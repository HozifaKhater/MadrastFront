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
import { ta7dier_masterDataService } from '../../../../../../Services/Ta7dier_masterDataService';
import { Ta7dier, Ta7dier_masterMaster } from '../../../../../../Ta7dier_masterMaster.Model';
import { DepartmentDataService } from '../../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../../DepartmentMaster.Model';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { environment } from '../../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../../EmployeeMaster.Model';
import { ta } from 'date-fns/locale';
// Table with EDIT item in MODAL
// ARTICLE for table with sort/filter/paginator
// https://blog.angular-university.io/angular-material-data-table/
// https://v5.material.angular.io/compgetItemCssClassByStatusonents/table/overview
// https://v5.material.angular.io/components/sort/overview
// https://v5.material.angular.io/components/table/overview#sorting
// https://www.youtube.com/watch?v=NSt9CI3BXv4
@Component({
	// tslint:disable-next-line:component-selector
	selector: 'kt-ta7deirs-list-edit-state',
	templateUrl: './Ta7diers-list-edit-state.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
	
	/*,providers: [DepartmentDataService]*/
})
export class Ta7deirEditStateComponent implements OnInit, OnDestroy {
	// Table fields


    Element1: [{ id: "1" },
        { id: "2" }];
	displayedColumns = ['ta7dier_id', 'civil_id','emp_dep','emp_name','ta7dier_date', 'subject_name','ta7dier_state_id', 'actions'];

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
	ta7diers: Ta7dier_masterMaster[];
	departments: DepartmentMaster[];
	//dataSource = new MatTableDataSource<OrdersDetailsDataSource>(null);
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	//@ViewChild('sort1', { static: true }) sort: MatSort;
	// Filter fields
	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;
	filterStatus: string = '';
	filterType: string = '';
	// Selection
	selection = new SelectionModel<Ta7dier>(true, []);
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
	public Editor = ClassicEditor;
	@ViewChild("myEditor", { static: false }) myEditor: any;
	breadCrumbItems: Array<{}>;
	public onChange({ editor }: ChangeEvent) {
		const data = editor.getData();
		this.data = data;
	}
	constructor(
		private EmployeeDataService: EmployeeDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private ta7dier_masterDataService: ta7dier_masterDataService,
		private DepartmentService: DepartmentDataService,
		private router: Router
	) {
        this.dataSource = new MatTableDataSource([]);

	}
	deleteCustomers_all(){}
	decoded:any;
	Employee: Employee[];
	get_ta7diers() {
	
		// this.ta7dier_masterDataService.GetAllTa7dier_master().subscribe(data => this.ELEMENT_DATA = data,
		// 	error => console.log(error),
		// 	() => this.dataSource.data = this.ELEMENT_DATA
		// ); 
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
		this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe(data => this.Employee = data,
			error => console.log(error),
			() => {
			  if( (this.Employee[0].emp_pos_id == String(37)) || (this.Employee[0].emp_pos_id == String(38)) || (this.Employee[0].emp_pos_id == String(41)))
			  {
				
				this.ta7dier_masterDataService.get_ta7dier_master_with_dep_id(this.Employee[0].emp_dep_id).subscribe(data => this.ELEMENT_DATA = data,
					error => console.log(error),
					() => this.dataSource.data = this.ELEMENT_DATA
				); 
			  }
			  else
			  {
					this.ta7dier_masterDataService.GetAllTa7dier_master().subscribe(data => this.ELEMENT_DATA = data,
			error => console.log(error),
			() => this.dataSource.data = this.ELEMENT_DATA
		); 
			  }
			
			  console.log("emp ddaaddssadsdasdasd", this.Employee)
			});
	}
	// get_ta7diers(subject_id) {
	
    //     this.ta7dier_masterDataService.GetAllTa7dier_master_with_subject_id(subject_id).subscribe(data => this.ELEMENT_DATA = data,
	// 		error => console.log(error),
    //         () => this.dataSource.data = this.ELEMENT_DATA
	// 	); }
	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    ngOnInit() {
        this.ta7dier_masterDataService.bClickedEvent
            .subscribe((data: string) => {
              //  this.get_ta7diers(this.ta7dier_masterDataService.subject_id);
				this.get_ta7diers();
            });
			this.get_ta7diers() 
		//this.ta7dier_masterDataService.bindClickedEvent
		//	.subscribe((data: string) => {
		//		this.ta7dier_masterDataService.GetAllTa7dier_master_with_subject_id(this.ta7dier_masterDataService.subject_id).subscribe(data => this.ELEMENT_DATA = data,
		//			error => console.log(error, this.ta7dier_masterDataService.subject_id),
		//			() => { console.log("d5l fe table", this.ta7dier_masterDataService.subject_id);this.dataSource = new MatTableDataSource(this.ELEMENT_DATA) }
		//		);
		//	});
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
	//delete1Customers() {
	//	const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.TITLE');
	//	const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION');
	//	const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION');
	//	const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.MESSAGE');

	//	const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
	//	dialogRef.afterClosed().subscribe(res => {
	//		if (!res) {
	//			return;
	//		}

	//		const idsForDeletion: number[] = [];
	//		for (let i = 0; i < this.selection.selected.length; i++) {
	//			idsForDeletion.push(this.selection.selected[i].dep_id);
	//			console.log("motb3a", this.selection.selected[i].dep_id)
	//		}
	//		//this.store.dispatch(new ManyCustomersDeleted({ ids: idsForDeletion }));
	//		//this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
	//		//this.selection.clear();
	//	});
	//}

	/**
	 * Fetch selected customers
	// */
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

	///**
	// * Show UpdateStatuDialog for selected customers
	// */
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
	departments_info: any[];
	subjects_info: any[];
	edit_ta7dier(ta7deir: Ta7dier, DepartmentService: DepartmentDataService, ta7dier_masterDataService: ta7dier_masterDataService ) {

		//this.DepartmentService.data = Number(customer.dep_id)
		//console.log('CUSTOMER ID', Number(customer.dep_id));
		console.log('ta7dier ID', ta7deir.ta7dier_id);
		this.ta7dier_masterDataService.ta7dier_id = ta7deir.ta7dier_id;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(ta7deir.ta7dier_id).subscribe(data => this.subjects_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				for (let item of this.subjects_info) {
					
                    console.log('testsuname', item.subject_id);
					
					this.ta7dier_masterDataService.emp_id = item.emp_id;
					this.ta7dier_masterDataService.emp_name = item.emp_name;
					this.ta7dier_masterDataService.subject_id = item.subject_id;
					this.ta7dier_masterDataService.subject_name = item.subject_name;
					this.ta7dier_masterDataService.grade_id = item.grade_id;
					this.ta7dier_masterDataService.grade_name = item.grade_name;
					this.ta7dier_masterDataService.ta7dier_date = item.ta7dier_date;
					this.ta7dier_masterDataService.ta7dier_week = item.ta7dier_week;
					this.ta7dier_masterDataService.ta7dier_day = item.ta7dier_day;
					this.ta7dier_masterDataService.ta7dier_state_id = item.ta7dier_state_id;
					this.ta7dier_masterDataService.state_name = item.state_name;
					this.ta7dier_masterDataService.ta7dier_name = item.ta7dier_name;
					this.ta7dier_masterDataService.ta7dier_body = item.ta7dier_body;
					this.ta7dier_masterDataService.ta7dier_notes = item.ta7dier_notes;
					this.ta7dier_masterDataService.ta7dier_supervision_state_id = item.ta7dier_supervision_state_id;
					this.ta7dier_masterDataService.ta7dier_supervision_state_name = item.ta7dier_supervision_state_name;
					this.ta7dier_masterDataService.ta7dier_state_name = item.ta7dier_state_name;
					this.ta7dier_masterDataService.ta7dier_file = item.ta7dier_file;
				};
				console.log('Component A is clicked!!', this.ta7dier_masterDataService);
				this.ta7dier_masterDataService.AClicked('Component A is clicked!!');
			}
		);
		
		this.router.navigate(['/material/layout/card']);
	}
	delete_ta7dier(ta7dier: Ta7dier, customer: CustomerModel, DepartmentService: DepartmentDataService, ta7dier_masterDataService: ta7dier_masterDataService) {
	
		console.log('CUSTOMER ID', ta7dier.ta7dier_id);
		this.ta7dier_masterDataService.deleteTa7dier_master(Number(ta7dier.ta7dier_id)).subscribe(res => {
          //  this.get_ta7diers(this.ta7dier_masterDataService.subject_id);
			this.get_ta7diers();
			alert(res.toString());
		
		})
       // this.get_ta7diers(this.ta7dier_masterDataService.subject_id);
	   this.get_ta7diers();
	}
	view_ta7dier(ta7deir: Ta7dier) {
		this.ta7dier_masterDataService.ta7dier_id = ta7deir.ta7dier_id;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(ta7deir.ta7dier_id).subscribe(data => this.subjects_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				for (let item of this.subjects_info) {
					this.ta7dier_masterDataService.ta7dier_file = item.ta7dier_file;
					this.ta7dier_masterDataService.ta7dier_file_type = item.ta7dier_file_type;
					this.ta7dier_masterDataService.is_file = item.is_file;
					this.ta7dier_masterDataService.ta7dier_body = item.ta7dier_body;


				};
				if (this.ta7dier_masterDataService.is_file == 1){
			this.openFile(this.ta7dier_masterDataService.ta7dier_file,this.ta7dier_masterDataService.ta7dier_file_type);
				}
				else if(this.ta7dier_masterDataService.is_file == 0)
				{this.showEditor =true
				this.data=	this.ta7dier_masterDataService.ta7dier_body
				}
			}
		);
	}
	data:any;
	showEditor :any;
	openFile(base64textString,file_type) {
		
		const base64Data = base64textString.substring(base64textString.indexOf(',') + 1);
				const fileType = file_type;
				const base64File = base64Data;
				console.log("file",base64File)
				const blob = this.b64toBlob(base64File, fileType);
				const blobUrl = URL.createObjectURL(blob);
				// const link = document.createElement('a');
				// 	link.download = "test.pdf";
				// 	link.href = blobUrl;
				// 	link.click();
				window.open(blobUrl, '_blank');
			  }
			  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
				const byteCharacters = atob(b64Data);
				const byteArrays = [];
			  
				for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				  const slice = byteCharacters.slice(offset, offset + sliceSize);
			  
				  const byteNumbers = new Array(slice.length);
				  for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				  }
			  
				  const byteArray = new Uint8Array(byteNumbers);
				  byteArrays.push(byteArray);
				}
			  
				return new Blob(byteArrays, { type: contentType });
			  }
	deleteCustomers(ta7deir: Ta7dier, ta7dier_masterDataService: ta7dier_masterDataService, DepartmentService: DepartmentDataService) {
		for (let i = 0; i < this.selection.selected.length; i++) {
			if (this.selection.selected[i].ta7dier_state_id == "true") {
				console.log("d5lt!")
				this.selection.selected[i].ta7dier_state_id = "1"
			}
			if (this.selection.selected[i].ta7dier_state_id == "false") {
				console.log("d5lt!")
				this.selection.selected[i].ta7dier_state_id = "0"
			}
			var val = {
				ta7dier_id: Number(this.selection.selected[i].ta7dier_id),
				ta7dier_state_id: Number(this.selection.selected[i].ta7dier_state_id)

			};
			console.log("val", val);
			this.ta7dier_masterDataService.updateTa7dier_master_for_state(val).subscribe(res => {
				console.log("updated!");
                //this.get_ta7diers(this.ta7dier_masterDataService.subject_id);
				this.get_ta7diers();

			})
			/*	idsForDeletion.push(this.selection.selected[i].dep_id);*/
		}
		alert("تم الاعتماد")
	}
	updateCheckedList(ta7dier) {
		 
			if (ta7dier.ta7dier_state_id == "true") {
				console.log("d5lt!")
				ta7dier.ta7dier_state_id = "1"
			}
			if (ta7dier.ta7dier_state_id == "false") {
				console.log("d5lt!")
				ta7dier.ta7dier_state_id = "0"
			}
			var val = {
				ta7dier_id: Number(ta7dier.ta7dier_id),
				ta7dier_state_id: Number(ta7dier.ta7dier_state_id),
				emp_id:	this.decoded.id,
				route:this.router.url as string,
				to_emp_id:ta7dier.emp_id,

			};
			console.log("val", val);
			this.ta7dier_masterDataService.updateTa7dier_master_for_state(val).subscribe(res => {
				console.log("updated!");
              //  this.get_ta7diers(this.ta7dier_masterDataService.subject_id);
			  this.get_ta7diers();

			})
		
		
		alert("تم التعديل")
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
