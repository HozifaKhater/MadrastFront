import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment } from 'moment';
import { basic_dataDataService } from '../../../../../Services/basic_dataDataService';
import { basic_data, basic_dataMaster } from '../../../../../basic_dataMaster.Model';
import { Employee, EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { startWith, map } from 'rxjs/operators';
const moment = _rollupMoment || _moment;


@Component({
	selector: 'kt-basic_data',
	templateUrl: './basic_data.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-events {
		width: 400px;
		height: 200px;
		border: 1px solid #555;
		overflow: auto;
	  }
	`],
	

})
export class basic_dataComponent implements OnInit {
	@Input() subject_data: any;
    id: string = "";
    name: string = "";
    file_number: string = "";
    identity_number: string = "";
    qualification: string = "";
    register_date: string = "";
    civil_number: string = "";
    exp_years: string = "";
    emp_id: string = "";
    subject_id: any;
    emp: any;
    

	exampleBasicDatepicker;
	exampleDatepickerStartDate;
	exampleDatepickerSelectedValue;
	exampleDatepickerWithMinMaxValidation;
	exampleDatepickerWithFilterValidation;
	exampleDatepickerInputAndChangeEvents;
	exampleDisabledDatepicker;
	exampleDatepickerTouchUI;
	exampleDatepickerOpenMethod;
	exampleDatepickerWithDifferentLocale;
	exampleDatepickerThatUsesMomentJsDates;
	exampleDatepickerWithCustomFormats;
	exampleUsesMomentJsDates;

	startDate = new Date(1990, 0, 1);
	date = new FormControl(new Date());
	date10 = new FormControl(moment([2017, 0, 1]));

	serializedDate = new FormControl((new Date()).toISOString());
	minDate = new Date(2011, 0, 1);
	maxDate = new Date(2018, 11, 1);

    events: string[] = [];
    form1: FormGroup;
    Employee:Employee[];
    constructor(private basic_dataDataService: basic_dataDataService,private EmployeeDataService: EmployeeDataService, public _fb: FormBuilder) {
        this.form1 = this._fb.group({
             id: [''],
            file_number: ['', [Validators.required]],
            qualification: ['', [Validators.required]],
            identity_number: ['', [Validators.required]],
            civil_number: ['', [Validators.required]],
            exp_years: ['', [Validators.required]],
            register_date: ['', [Validators.required]]
          
        });
        this.EmployeeDataService.GetAllEmployee().subscribe(data => this.Employee = data,
            error => console.log(error),
            () => {
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.emp_name),
                        map(emp_name => emp_name ? this._filter(emp_name) : this.Employee.slice())
                    );
                console.log("test", this.filteredOptions)
                //this.filteredList = this.country.slice();
                //console.log("ok", this.filteredList);
            });
    }
    myControl = new FormControl('');
    //  options: string[];
    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employee.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
    emp_chage(event) {
       console.log("emp_id", event.emp_id)
        this.basic_dataDataService.emp_id=event.emp_id
        this.basic_dataDataService.BClicked('Component A is clicked!!');
        this.basic_dataDataService.CClicked('Component A is clicked!!');
    }
	add_subject() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
        
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
            var val = {
                name: this.emp.emp_name,
                file_number: Number(this.file_number),
                identity_number: Number(this.identity_number),
                qualification: String(this.qualification),
                register_date: this.register_date,
                civil_number: Number(this.civil_number),
                exp_years: Number(this.exp_years),
                emp_id: Number(this.emp.emp_id),


            };
            console.log("asd", val)
            this.basic_dataDataService.addbasic_data(val).subscribe(res => {
                alert(res.toString());
                this.basic_dataDataService.DClicked("");
            })
            console.log(val)
           
            this.form1.reset();
        }
	}
	butDisabled: boolean;
    update_subject() {
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
            /*console.log("emp", emp, this.employeedepartment );*/
            var val = {
                id: Number(this.id),
                name: this.emp.emp_name,
                file_number: Number(this.file_number),
                identity_number: Number(this.identity_number),
                qualification: String(this.qualification),
                register_date: this.register_date,
                civil_number: Number(this.civil_number),
                exp_years: Number(this.exp_years),
                emp_id: Number(this.emp.emp_id),

            };

            console.log("val", val);


            this.basic_dataDataService.updatebasic_data(val).subscribe(res => {
                alert(res.toString());
                this.basic_dataDataService.DClicked("");
                
this.is_edit=false;
            })
           
            this.form1.reset();
        }
	}
    
    cancel_subject() {
        this.form1.reset();
		
this.is_edit=false;
	}
    
is_edit:boolean=false;
	ngOnInit() {
		this.butDisabled = true;
		
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.basic_dataDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				this.is_edit=true;
                this.id = String(this.basic_dataDataService.id);
                //this.name = this.basic_dataDataService.name;
                this.file_number = this.basic_dataDataService.file_number;
                this.identity_number = this.basic_dataDataService.identity_number;
                this.qualification = this.basic_dataDataService.qualification;
                this.register_date = this.basic_dataDataService.register_date;
                this.civil_number = this.basic_dataDataService.civil_number;
                this.exp_years = this.basic_dataDataService.exp_years;
               // this.emp_id = this.basic_dataDataService.emp_id;
console.log("empp",this.basic_dataDataService.emp_id)
                var selected_value3 = this.basic_dataDataService.emp_id;
                this.emp = this.Employee[this.Employee.findIndex(function (el) {

                    return String(el.emp_id) == selected_value3;

                })];
				
				console.log(this.basic_dataDataService.name)
				/*	document.getElementById("save_btn").innerHTML="asdasd"*/
				console.log("edited")

			});
	

	}

	myFilter = (d: any): boolean => {
		const day = d.day();
		// Prevent Saturday and Sunday from being selected.
		return day !== 0 && day !== 6;
	}

	addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
		this.events.push(`${type}: ${event.value}`);
	}
}
