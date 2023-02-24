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
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from "@ckeditor/ckeditor5-angular/ckeditor.component";
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../../Services/user_privDataService ';
import { environment } from '../../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../../Services/EmployeeDataService';
import { Employee } from '../../../../../../EmployeeMaster.Model';

@Component({
	selector: 'kt-ta7deirs-list',
	templateUrl: './Ta7diers-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class Ta7deirComponent implements OnInit, OnDestroy {
	
	displayedColumns = ['select','civil_id','emp_dep','emp_name', 'ta7dier_id', 'ta7dier_date', 'subject_name', 'ta7dier_state_id', 'actions'];

	ELEMENT_DATA: Element[];
      
    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	dataSource: any;
    	
	ta7diers: Ta7dier_masterMaster[];
	departments: DepartmentMaster[];

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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
	public Editor = ClassicEditor;
	@ViewChild("myEditor", { static: false }) myEditor: any;
	breadCrumbItems: Array<{}>;
	
	public onChange({ editor }: ChangeEvent) {
		const data = editor.getData();
		this.data = data;
	}

	constructor(
		private EmployeeDataService: EmployeeDataService,
		private router: Router, private user_privDataService: user_privDataService,
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private ta7dier_masterDataService: ta7dier_masterDataService,
			private DepartmentService: DepartmentDataService
	) {
        this.dataSource = new MatTableDataSource([]);
	
	}
	decoded:any;
	Employee: Employee[];
	get_ta7diers() {
		
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
		this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe(data => this.Employee = data,
			error => console.log(),
			() => {
				if( (this.Employee[0].emp_pos_id == String(37)) || (this.Employee[0].emp_pos_id == String(38)) || (this.Employee[0].emp_pos_id == String(41)))
			  	{
				
					this.ta7dier_masterDataService.get_ta7dier_master_with_dep_id(this.Employee[0].emp_dep_id).subscribe(data => this.ELEMENT_DATA = data,
						error => console.log(),
						() => this.dataSource.data = this.ELEMENT_DATA
					); 
			  	}
			  	else
			  	{
					this.ta7dier_masterDataService.GetAllTa7dier_master().subscribe(data => this.ELEMENT_DATA = data,
					error => console.log(),
					() => this.dataSource.data = this.ELEMENT_DATA); 
				}
			
			});
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
			this.ta7dier_masterDataService.deleteTa7dier_master(Number(this.selection.selected[i].ta7dier_id)).subscribe(res => {
				this.get_ta7diers()
			})
		}
		alert("تم حذف الكل");
	}

	priv_info:any=[];

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

	ngOnInit() {

		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log()); 

        this.ta7dier_masterDataService.bClickedEvent
            .subscribe((data: string) => {
                this.get_ta7diers();

            });

        this.get_ta7diers();
		
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
		this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Editor', active: true }];
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
	deleteCustomers_all(){}
	/**
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
	public activeFilters: string[];
	departments_info: any[];
	subjects_info: any[];
	edit_ta7dier(ta7deir: Ta7dier ) {

		this.ta7dier_masterDataService.ta7dier_id = ta7deir.ta7dier_id;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(ta7deir.ta7dier_id).subscribe(data => this.subjects_info = data,
			error => console.log(),
			() => {
				for (let item of this.subjects_info) {
					this.ta7dier_masterDataService.ta7dier_id = item.ta7dier_id;
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
					this.ta7dier_masterDataService.ta7dier_file_type = item.ta7dier_file_type;
					this.ta7dier_masterDataService.is_file = item.is_file;

				};

				this.ta7dier_masterDataService.AClicked('Component A is clicked!!');
			}
		);
		

	}
	delete_ta7dier(ta7dier: Ta7dier) {
	
		this.ta7dier_masterDataService.deleteTa7dier_master(Number(ta7dier.ta7dier_id)).subscribe(res => {
			this.get_ta7diers();
			alert("Deleted Successfully");
		
		})
	}

	view_ta7dier(ta7deir: Ta7dier) {
		this.ta7dier_masterDataService.ta7dier_id = ta7deir.ta7dier_id;
		this.ta7dier_masterDataService.GetAllTa7dier_master_with_id(ta7deir.ta7dier_id).subscribe(data => this.subjects_info = data,
			error => console.log(),
			() => {
				for (let item of this.subjects_info) {
					this.ta7dier_masterDataService.ta7dier_file = item.ta7dier_file;
					this.ta7dier_masterDataService.ta7dier_file_type = item.ta7dier_file_type;
					this.ta7dier_masterDataService.is_file = item.is_file;

				};
				if (this.ta7dier_masterDataService.is_file == 1){
			this.openFile(this.ta7dier_masterDataService.ta7dier_file,this.ta7dier_masterDataService.ta7dier_file_type);
				}
				else if(this.ta7dier_masterDataService.is_file == 0)
				{this.showEditor =true
				this.data=this.ta7dier_masterDataService.ta7dier_file 
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
	/**
	 * Check all rows are selected
	 */
	isAllSelected(): boolean {
		const numSelected = this.selection.selected.length;
		const numRows = this.customersResult.length;
		return numSelected === numRows;
	}

}
