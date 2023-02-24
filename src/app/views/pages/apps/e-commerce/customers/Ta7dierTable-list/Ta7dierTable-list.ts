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

import { Ta7dierJoinEmployee } from '../../../../../../Ta7dierJoinEmpoyee.Model';
import { Ta7dierJoinEmployeeDataService } from '../../../../../../Services/Ta7dierJoinEmployeeDataService';
import { CustomerModel, CustomersDataSource, OneCustomerDeleted, ManyCustomersDeleted, CustomersStatusUpdated } from '../../../../../../core/e-commerce';

@Component({

	selector: 'kt-Ta7dierTable-list',
	templateUrl: './Ta7dierTable-list.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})

export class Ta7dierTableListComponent implements OnInit, OnDestroy {

	ELEMENT_DATA: Ta7dierJoinEmployee[];

	displayedColumns = ['select', 'week', 'day', 'levelName','className','date',
                        'emp_name','ta7dierName','notes'];
	
	dataSource: any;

	@ViewChild(MatSort, { static: true }) sort: MatSort;

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	@ViewChild('searchInput', { static: true }) searchInput: ElementRef;

	private subscriptions: Subscription[] = [];


	//student: StudentMaster[];

	filterStatus: string = '';
	filterType: string = '';

	// Selection
	selection = new SelectionModel<CustomerModel>(true, []);
	customersResult: CustomerModel[] = [];

    
	constructor(
		public dialog: MatDialog,
		public snackBar: MatSnackBar,
		private layoutUtilsService: LayoutUtilsService,
		private translate: TranslateService,
		private store: Store<AppState>,
		private Ta7dierJoinEmployeeService: Ta7dierJoinEmployeeDataService
    ) {
        this.dataSource = new MatTableDataSource([]);
	}
	Delete_Catch_Reciept_all(){}
	GetTa7dierTable(ta7dier) {
		
		this.Ta7dierJoinEmployeeService.GetTa7dierTable(ta7dier)
		.subscribe((data:any) => this.ELEMENT_DATA = data.data,
			error => console.log(error),
            () => this.dataSource.data = this.ELEMENT_DATA
		);
        console.log('table data ', this.ELEMENT_DATA);
    }
   
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
	object:Ta7dierJoinEmployee;

	ngOnInit() {
        this.Ta7dierJoinEmployeeService.bClickedEvent
            .subscribe((data: string) => {
				this.object.subject_name = this.Ta7dierJoinEmployeeService.subject_name;
				this.object.emp_dep = this.Ta7dierJoinEmployeeService.emp_dep;
				this.GetTa7dierTable(this.object)
                console.log("submitted object")
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
		console.log("yyyy", this.ELEMENT_DATA);
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
	deleteCustomers() {
		const _title: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.TITLE');
		const _description: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION');
		const _waitDesciption: string = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION');
		const _deleteMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.MESSAGE');

		const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}

			const idsForDeletion: number[] = [];
			for (let i = 0; i < this.selection.selected.length; i++) {
				idsForDeletion.push(this.selection.selected[i].id);
			}
			this.store.dispatch(new ManyCustomersDeleted({ ids: idsForDeletion }));
			this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
			this.selection.clear();
		});
	}

	/**
	 * Fetch selected customers
	 */
	fetchCustomers() {
		const messages = [];
		this.selection.selected.forEach(elem => {
			messages.push({
				text: `${elem.lastName}, ${elem.firstName}`,
				id: elem.id.toString(),
				status: elem.status
			});
		});
		this.layoutUtilsService.fetchElements(messages);

	}

	/**
	 * Show UpdateStatuDialog for selected customers
	 */
    /*
	updateStatusForCustomers() {
		const _title = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.TITLE');
		const _updateMessage = this.translate.instant('ECOMMERCE.CUSTOMERS.UPDATE_STATUS.MESSAGE');
		const _statuses = [{ value: 0, text: 'Suspended' }, { value: 1, text: 'Active' }, { value: 2, text: 'Pending' }];
		const _messages = [];

		this.selection.selected.forEach(elem => {
			_messages.push({
				text: `${elem.lastName}, ${elem.firstName}`,
				id: elem.id.toString(),
				status: elem.status,
				statusTitle: this.getItemStatusString(elem.status),
				statusCssClass: this.getItemCssClassByStatus(elem.status)
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
*/
	/**
	 * Show add customer dialog
	 */


	/**
	 * Show Edit customer dialog and save after success close result
	 * @param customer: CustomerModel
	 */
    /*
	students_info: any[];
	editCustomer(Student: Student, StudentDataService: StudentDataService) {

		//this.DepartmentService.data = Number(customer.dep_id)
		//console.log('CUSTOMER ID', Number(customer.dep_id));
		console.log('CUSTOMER ID', Student.student_id);
		this.StudentDataService.student_id = Number(Student.student_id);
		this.StudentDataService.GetAllstudents_with_id(Student.student_id).subscribe(data => this.students_info = data,
			error => console.log("errorrrrrrrrrrr"),
			() => {
				console.log("this.students_info", this.students_info);
				for (let item of this.students_info) {
					console.log("hhhhhh", item.student_id)

					console.log('testdepname', item.student_name);

					this.StudentDataService.student_file_ser = item.student_file_ser;
					this.StudentDataService.student_civilian_id = item.student_civilian_id;
					this.StudentDataService.student_sex = item.student_sex;
					this.StudentDataService.student_sex_id = item.student_sex_id;
					this.StudentDataService.student_name = item.student_name;
					this.StudentDataService.student_nationality = item.student_nationality;
					this.StudentDataService.student_nationality_id = item.student_nationality_id;
					this.StudentDataService.student_dob = item.student_dob;
					this.StudentDataService.student_age_year = item.student_age_year;
					this.StudentDataService.student_age_month = item.student_age_month;
					this.StudentDataService.student_age_day = item.student_age_day;
					this.StudentDataService.student_acceptance_reason_id = item.student_acceptance_reason_id;
					this.StudentDataService.student_acceptance_reason = item.student_acceptance_reason;
					this.StudentDataService.student_religion = item.student_religion;
					this.StudentDataService.student_religion_id = item.student_religion_id;
					this.StudentDataService.student_district = item.student_district;
					this.StudentDataService.student_district_id = item.student_district_id;
					this.StudentDataService.student_school = item.student_school;
					this.StudentDataService.student_stage = item.student_stage;
					this.StudentDataService.student_stage_id = item.student_stage_id;
					this.StudentDataService.student_state = item.student_state;
					this.StudentDataService.student_state_id = item.student_state_id;
					this.StudentDataService.student_study_state = item.student_study_state;
					this.StudentDataService.student_study_state_id = item.student_study_state_id;
					this.StudentDataService.student_grade = item.student_grade;
					this.StudentDataService.student_grade_id = item.student_grade_id;
					this.StudentDataService.student_div = item.student_div;
					this.StudentDataService.student_div_id = item.student_div_id;
					this.StudentDataService.student_failure_years = item.student_failure_years;



				};
				console.log('Component A is clicked!!', this.StudentDataService.student_name);
				this.StudentDataService.AClicked('Component A is clicked!!');
			}
		);


	}

	deleteCustomer(Student: Student, StudentDataService: StudentDataService) {

		console.log('CUSTOMER ID', Student.student_id);
		this.StudentDataService.deletestudents(Number(Student.student_id)).subscribe(res => {
			//this.get_departments(MasterJobsDataService);
			alert(res.toString());

		})

	}
*/
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
	masterToggle() {
		if (this.selection.selected.length === this.customersResult.length) {
			this.selection.clear();
		} else {
			this.customersResult.forEach(row => this.selection.select(row));
		}
	}

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
	public test() {
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




