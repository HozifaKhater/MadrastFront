 import { Component, OnInit, Injectable, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbDateAdapter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerI18n, NgbCalendarIslamicCivil, NgbCalendarIslamicUmalqura } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentDataService } from '../../../../Services/DepartmentDataService';
import { DepartmentMaster } from '../../../../DepartmentMaster.Model';
import { MasterJob } from '../../../../MasterJobMaster.Model';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { MasterJobsDataService } from '../../../../Services/MasterJobsDataService';
import { EmployeeMaster, Employee } from '../../../../EmployeeMaster.Model';
import { divisionsDataService } from '../../../../Services/divisionsDataService';


/**
 * Example of a Native Date adapter
 */
@Injectable()
export class NgbDateNativeAdapter extends NgbDateAdapter<Date> {
	fromModel(date: Date): NgbDateStruct {
		return (date && date.getFullYear) ? { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() } : null;
	}

	toModel(date: NgbDateStruct): Date {
		return date ? new Date(date.year, date.month - 1, date.day) : null;
	}
}

const I18N_VALUES = {
	'fr': {
		weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
		months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
	}
	// other languages you would support
};

// Define a service holding the language. You probably already have one if your app is i18ned. Or you could also
// use the Angular LOCALE_ID value
@Injectable()
export class I18n {
	language = 'fr';
}

// Define custom service providing the months and weekdays translations
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

	getDayAriaLabel(date: NgbDateStruct): string {
		throw new Error('Method not implemented.'); // TODO: implement this
	}
	constructor(private _i18n: I18n) {
		super();
	}

	getWeekdayShortName(weekday: number): string {
		return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
	}
	getMonthShortName(month: number): string {
		return I18N_VALUES[this._i18n.language].months[month - 1];
	}
	getMonthFullName(month: number): string {
		return this.getMonthShortName(month);
	}
}

@Component({
	selector: 'kt-datepicker',
	templateUrl: './datepicker.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
    select.custom-select {
      margin-right: 0.5rem;
      width: auto;
	}
	.custom-day {
		text-align: center;
		padding: 0.185rem 0.25rem;
		display: inline-block;
		height: 2rem;
		width: 2rem;
	  }
	  .custom-day.focused {
		background-color: #e6e6e6;
	  }
	  .custom-day.range, .custom-day:hover {
		background-color: rgb(2, 117, 216);
		color: white;
	  }
	  .custom-day.faded {
		background-color: rgba(2, 117, 216, 0.5);
	  }
	  .weekend {
		background-color: #f0ad4e;
		border-radius: 1rem;
		color: white;
	  }
	  .hidden {
		display: none;
	  }
  `],

	// NOTE: For this example we are only providing current component, but probably
	// NOTE: you will want to provide your main App Module
	// providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }, I18n,
	// { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, NgbDatepickerConfig]
})
export class DatepickerComponent implements OnInit {

	@Input() division_data: any;
	div_id: number;
	dep_id: string = "";
	dep_name: string = "";
	job_id: string = "";
	job_name: string = "";
	emp_id: string = "";
	emp_name: string = "";
	phone: string = "";
	mob: string = "";
    disabled_emp: any;
	selectedjob: any;
	departments: DepartmentMaster[];
	jobs: MasterJob[];
	selecteddepartment: any;
	Employees: Employee[];
	employeedepartment: any;
	employeedepartment1:any;
	form1: FormGroup;
	exampleBasicDatepicker: any;
	exampleDatepickerInAPopup: any;
	exampleMultipleMonths: any;
	exampleRangeSelection: any;
	exampleDisabledDatepicker: any;
	exampleCustomDateAdapter: any;
	exampleInternationalizationOfDatepickers: any;
	exampleCustomDayView: any;
	exampleAlternativeCalendar: any;
	exampleGlobalConfigurationOfDatepickers: any;

	model: NgbDateStruct;
	date: { year: number, month: number };
	secondModel;
	fourthModel;
	fifthModel: NgbDateStruct;
	displayMonths = 2;
	navigation = 'select';
	showWeekNumbers = false;

	disabled = true;
	hoveredDate: NgbDateStruct;

	fromDate: NgbDateStruct;
	toDate: NgbDateStruct;
	model1: Date;
	model2: Date;
	sixModel;


	constructor(private EmployeeService: EmployeeDataService, private DepartmentService: DepartmentDataService, MasterJobsDataService: MasterJobsDataService, private divisionsDataService: divisionsDataService,) {
		this.DepartmentService.GetAllMasterdepartment().subscribe(data => this.departments = data,
			error => console.log(error),
			() => console.log("ok"));
		MasterJobsDataService.GetAllActivity().subscribe(data => this.jobs = data,
			error => console.log(error),
			() => console.log("ok"));
		this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
			error => console.log(error),
			() => console.log("emp dropdown", this.Employees));
	}


	add_div() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		var val = {

			dep_id: this.selecteddepartment.dep_id,
			dep_name: this.selecteddepartment.dep_name,
			job_id: this.selectedjob.job_id,
			job_name: this.selectedjob.job_name,
			emp_id: this.employeedepartment.emp_id,
			emp_name: this.employeedepartment.emp_name,
			phone: String(this.phone),
			mob: String(this.mob)
		};
		console.log("asd", val)
		this.divisionsDataService.adddivisions(val).subscribe(res => {
			alert(res.toString());
		})
		console.log(val)
	}
	//corridorsDataService: corridorsDataService;
	update_div() {

		var val = {
			div_id: Number(this.div_id),
			dep_id: this.selecteddepartment.dep_id,
			dep_name: this.selecteddepartment.dep_name,
			job_id: this.selectedjob.job_id,
			job_name: this.selectedjob.job_name,
			emp_id: this.employeedepartment.emp_id,
			emp_name: this.employeedepartment.emp_name,
			phone: String(this.phone),
			mob: String(this.mob)
		};

		console.log("val", val);


		this.divisionsDataService.updatedivisions(val).subscribe(res => {
			alert(res.toString());
			this.is_edit=false;
		})

	}
	cancel_div() {
		this.is_edit=false;
	}

	is_edit:boolean=false;

	ngOnInit() {
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.divisionsDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				this.is_edit=true;


				this.div_id = Number(this.divisionsDataService.div_id);
				this.dep_id = this.divisionsDataService.dep_id;
				this.dep_name = this.divisionsDataService.dep_name;
				this.job_id = this.divisionsDataService.job_id;
				this.job_name = this.divisionsDataService.job_name;
				this.emp_id = this.divisionsDataService.emp_id;
				this.emp_name = this.divisionsDataService.emp_name;
				this.phone = this.divisionsDataService.phone;
				this.mob = this.divisionsDataService.mob;

			});
		var test1

		this.div_id = this.div_id;
		this.dep_id = this.dep_id;
		this.dep_name = this.dep_name;
		this.job_id = this.job_id;
		this.job_name = this.job_name;
		this.emp_id = this.emp_id;
		this.emp_name = this.emp_name;
		this.phone = this.phone;
		this.mob = this.mob;
	}

	}



