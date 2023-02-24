import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { Http, Response, Headers } from '@angular/http';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { CustomerModel } from '../../../../../core/e-commerce';
import { CustomersListComponent } from '../../../apps/e-commerce/customers/customers-list/customers-list.component';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { EmployeeMaster, Employee } from '../../../../../EmployeeMaster.Model';
import { advertsDataService } from '../../../../../Services/advertsDataService';
import { adverts,advertsMaster } from '../../../../../advertsMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Component({
	selector: 'kt-adverts',
	templateUrl: './adverts.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
		.example-h2 {
			margin: 10px;
		}
		.example-section {
			display: flex;
			align-content: center;
			align-items: center;
			height: 60px;
		}
		.example-margin {
			margin: 0 10px;
		}
	`
	]
	/*,providers: [DepartmentDataService]*/
})
export class advertsComponent implements OnInit {

	@Input() department_data: any;
	ser	:string="";
	title	:string="";
	body	:string="";
	from_emp_id	:string="";
	submit_date	:string="";
	state	:string="";
	start_date	:string="";
	end_date	:string="";
	

	dep_nameSelected: string;
	
	Employees: Employee[];
	departments: Departments[];
	 selecteddepartment: any=[];
	employeedepartment: any;
	exampleBasicCheckboxes;
	exampleConfigurableCheckbox;
	exampleLabelPositions;
	exampleChangeEvent;
	foods = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];
	checked = false;
	indeterminate = false;
	align = 'start';
	disabled = false;
	labelPosition: string = 'before';
	myValue: boolean = true;
    myControl = new FormControl('');
    form1: FormGroup;
	public decoded:any;
	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,private DepartmentService: DepartmentDataService, private advertsDataService: advertsDataService) {
			const userToken = localStorage.getItem(environment.authTokenKey);
			this.decoded = jwt_decode(userToken);
	}
 


	butDisabled: boolean;
	is_dep:any=0;
	selected(test1, test2)
	{
		console.log("worked?", test1, test2)
	}
	depdropdown(event)
	{
		console.log("worked!",event)
	}
	is_dep_check:boolean=false;
	is_public:any=1;
	dep_id:any=0;
	dep_check_change(event) {
        if (event.checked == true) {
            this.is_dep = 1;
        }
        if (event.checked === false) {
            this.is_dep = 0;
        }
    }
	add_department() {

        // if (this.form1.invalid) {
        //     console.log('Form invalid...', this.form1.errors);
        //     this.form1.markAllAsTouched();
        // } else {
			if (this.is_dep_check == true)
			{
this.is_public = 0;
this.dep_id = this.selecteddepartment.dep_id;
			}

		var val = {
			title: this.title,
			body: this.body,
			from_emp_id: this.decoded.id,
			start_date: this.start_date,
			end_date: this.end_date,
			is_public:this.is_public,
			dep_id:this.dep_id

			
		};

		console.log("val", val);


	this.advertsDataService.save_in_adverts(val).subscribe(res => {
        alert("Added Successfully");
        this.advertsDataService.BClicked('Component B is clicked!!');
        this.butDisabled = true;
	//	this.form1.reset();
		})
            
        console.log(val);

            this.form1.reset();
            //for (let name in this.form1.controls) {
            //    this.form1.controls[name].setErrors(null);
            //}
            
       // }
	
    }
    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.form1.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

	initModelForm(): FormGroup {
		return this._fb.group({
			otherControls: [''],
			// The formArray, empty 
			myChoices: new FormArray([]),
		})
}
	myForm: FormGroup = this.initModelForm();
	onCheckChange(event) {
		const formArray: FormArray = this.myForm.get('myChoices') as FormArray;

		/* Selected */
		if (event.target.checked) {
			// Add a new control in the arrayForm
			formArray.push(new FormControl(event.target.value));
		}
		/* unselected */
		else {
			// find the unselected element
			let i: number = 0;

			formArray.controls.forEach((ctrl: FormControl) => {
				if (ctrl.value == event.target.value) {
					// Remove the unselected element from the arrayForm
					formArray.removeAt(i);
					return;
				}

				i++;
			});
		}
		console.log("arrayofchecks",formArray.value)
    }

    update_department() {
        // if (this.form1.invalid) {
        //     console.log('Form invalid...');
        //     this.form1.markAllAsTouched();
        // } else {
       
            /*console.log("emp", emp, this.employeedepartment );*/
            var val = {
				ser:this.advertsDataService.ser,
				title: this.title,
			body: this.body,
			from_emp_id: this.decoded.id,
			start_date: this.start_date,
			end_date: this.end_date,
				
            };

            console.log("val", val);


            this.advertsDataService.update_adverts(val).subscribe(res => {
                alert("Updated Succesfully");
                this.advertsDataService.BClicked('Component B is clicked!!');
             //   this.form1.reset();
                this.butDisabled = true;
                this.selecteddepartment = '';
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
            })
       // }
	}
    cancel_department() {
        //this.form1.reset();
		(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
		(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
	}
	side_dep_chck_change(event) {
		//if ((<HTMLInputElement>document.getElementById("side_dep_chck")).checked = true) {
		//	console.log("checked changed")
		//}
		console.log(event)
		if (event.checked == true) {
			this.butDisabled = false;
		}
		if (event.checked === false) {
			this.butDisabled = true;
		}
	}
    dep_check: any;
    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.departments.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
        return this.selecteddepartment ? this.selecteddepartment.dep_name : undefined;
    }
    test1: any[];
    priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}); 
        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
            error => console.log(error),
            () => {
                console.log("emp dropdown", this.departments);
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.dep_name),
                        map(dep_name => dep_name ? this._filter(dep_name) : this.departments.slice())
                    );
            });
		this.butDisabled = true;
		
/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/
		
		this.advertsDataService.aClickedEvent
			.subscribe((data: string) => {
				if (Number(this.advertsDataService.ser) != 0) {
					this.butDisabled = false;         
				}
			
				(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
				/*this.employeedepartment.emp_id = 1;*/
				/*this.selecteddepartment.dep_id = Number(this.DepartmentService.dep_id);*/

				console.log("department",this.selecteddepartment);
				this.ser = this.advertsDataService.ser;
				this.title = this.advertsDataService.title;
				this.body = this.advertsDataService.body;
				this.from_emp_id = this.advertsDataService.from_emp_id;
				this.submit_date = this.advertsDataService.submit_date;
				this.state = this.advertsDataService.state;
				this.start_date = this.advertsDataService.start_date;
				this.end_date = this.advertsDataService.end_date;

				
		});

		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		
	/*	test1 = this.departments[this.selecteddepartment - 1]*/

		//this.dep_id = this.dep_id;
		//this.dep_name = this.dep_name;
		//this.dep_check = this.dep_check;
		//this.dep_desc = this.dep_desc;
		//this.dep_supervisor_id = this.test1[0].dep_id
		//this.dep_supervisor_name = this.test1[0].dep_name
	}

	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}

	changeValueEvent() {
		console.log('myValue:', this.myValue);
	}


}
