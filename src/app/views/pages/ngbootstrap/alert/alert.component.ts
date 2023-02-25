import { Component, ChangeDetectorRef, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { EmployeeMaster, Employee } from '../../../../EmployeeMaster.Model';
import { Borrow_bookDataService } from '../../../../Services/Borrow_bookDataService';
import { Borrow_bookMaster, Borrow_book } from '../../../../Borrow_bookMaster.Model';

import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';

import moment from 'moment';

@Component({
	selector: 'kt-alert',
	templateUrl: './alert.component.html',
	styles: [
		`
    	:host >>> .alert-custom {
			color: #99004d;
			background-color: #f169b4;
			border-color: #800040;
    	}`
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
	@Input() borrow_data: any;
	borr_id: number;
	borr_date: string = "";
	lib_book_name: string = "";
	borr_name: string = "";
    disabled_emp: any;
	Employees: Employee[];
	employeedepartment: any;

	private _success = new Subject<string>();
	staticAlertClosed = false;
	successMessage: string;
	private backup: Array<IAlert>;

	exampleBasicAlert: any;
	exampleCloseableAlert: any;
	exampleSelfClosingAlert: any;
	exampleCustomAlert: any;
	exampleGlobalConfigurationOfAlerts: any;

	form1: FormGroup;
	constructor(
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, alertConfig: NgbAlertConfig, private EmployeeService: EmployeeDataService, private Borrow_bookDataService: Borrow_bookDataService) {
		this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
			error => console.log());

		this.form1 = this._fb.group({
			borr_name: ['', [Validators.required]]


		});

	}

	add_borrow() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {
		this.Borrow_bookDataService.borr_date = this.borr_date;
		this.Borrow_bookDataService.borr_name = this.employeedepartment.emp_name;
		this.Borrow_bookDataService.BClicked('Component A is clicked!!');
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		//var val = {

		//	borr_date: moment(this.borr_date).format('DD/MM/YYYY'),
		//	lib_book_name: this.lib_book_name,
		//	borr_name: this.employeedepartment.emp_name
		//};
		//console.log("asd", val)
		//this.Borrow_bookDataService.addBorrow_book(val).subscribe(res => {
		//	alert(res.toString());
		//})
		//console.log(val)
			this.form1.reset();
		}
	}


	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		

	
		this.Borrow_bookDataService.aClickedEvent
			.subscribe((data: string) => {
				
				this.borr_id = Number(this.Borrow_bookDataService.borr_id);

				this.borr_date = this.Borrow_bookDataService.borr_date;
				this.lib_book_name = this.Borrow_bookDataService.lib_book_name;
				this.borr_name = this.Borrow_bookDataService.borr_name;


			});
		
		setTimeout(() => this.staticAlertClosed = true, 20000);

		this._success.subscribe((message) => this.successMessage = message);
		this._success.pipe(
			debounceTime(5000)
		).subscribe(() => this.successMessage = null);

		
	}



	changeSuccessMessage() {
		this._success.next(`${new Date()} - Message successfully changed.`);
	}
}

export interface IAlert {
	id: number;
	type: string;
	message: string;
}
