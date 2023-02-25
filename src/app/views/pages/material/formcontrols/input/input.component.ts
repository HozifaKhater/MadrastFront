import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, SideDepartmentMaster,Departments } from '../../../../../DepartmentMaster.Model';
import { MasterJobMaster, MasterJob } from '../../../../../MasterJobMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

import { Training_coursesDataService } from '../../../../../Services/Training_coursesDataService';
import { Training_coursesMaster, Training_courses } from '../../../../../Training_coursesMaster.Model';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
	selector: 'kt-input',
	templateUrl: './input.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-form {
		min-width: 150px;
		max-width: 500px;
		width: 100%;
	  }
	  .example-full-width {
		width: 100%;
	  }
	  .example-form-field {
		width: 200px;
	  }
	`],
    encapsulation: ViewEncapsulation.None
})
export class InputComponent implements OnInit {
 
    @Input() employee_data: any;
    field: any;
	emp_id: number;
	emp_civilian_id: string = "";
	emp_sex: string = "";
	emp_sex_id: string = "";
	emp_name: string = "";
	emp_nationality: string = "";
	emp_nationality_id: string = "";
	emp_marital_status: string = "";
	emp_marital_status_id: string = "";
	emp_file_ser: string = "";
	emp_dob: string = "";
	emp_age_year: string = "";
	emp_age_month: string = "";
	emp_age_day: string = "";
	emp_pos_type: string = "";
	emp_pos_type_id: string = "";
	emp_pos: string = "";
	emp_pos_id: string = "";
	emp_dep: string = "";
	emp_dep_id: string = "";
	emp_subject: string = "";
	emp_subject_id: string = "";
	emp_div: string = "";
	emp_div_id: string = "";
	emp_contract: string = "";
	emp_contract_id: string = "";
	emp_employment_date: string = "";
	emp_educationa_qualification: string = "";
	emp_educationa_qualification_id: string = "";
	emp_educationa_qualification_date: string = "";
	emp_educationa_qualification_country: string = "";
	emp_educationa_qualification_country_id: string = "";
	emp_exp_out_country: string = "";
	emp_exp_in_country_same_grade: string = "";
	emp_exp_in_country_another_grade: string = "";
	emp_exp_in_country_same_school: string = "";
	emp_address: string = "";
	emp_email: string = "";
	emp_mob: string = "";
	emp_mob1: string = "";
	emp_tel: string = "";
	emp_username: string = "";
	emp_password: string = "";
	in_class_priv: string = "";
	dep_work: string = "";
    relgion_id: number;
	religion_name: string="";

is_edit:boolean=false;

	trainig_id: number;
	trainig_name: string = "";
	trainig_from: string = "";
	trainig_to: string = "";
	traing_desc: string = "";

	departments: Departments[];
    side_departments: SideDepartmentMaster[];
    jobs: MasterJob[];
    subjects: Subjects[];
    sex: def.sex[];
    nat: def.nat[];
    status: def.status[];
    religion: def.religion[];
    job_type: def.job_type[];
    relation_type: def.relation_type[];
    crit_level: def.crit_level[];
    emp_status: def.emp_status[];
    country: def.country[];
	exampleBasicInputs;
	exampleInputWithACustomErrorStateMatcher;
	exampleAutoResizingTextarea;
	exampleInputWithAClearButton;
	exampleInputWithErrorMessages;
	exampleInputsInAForm;
	exampleInputWithHints;
	exampleInputsWithPrefixesAndSuffixes;
    formName: any;
    errorMessage: string;

    selecteddepartment: any;
    selectedsidedepartment: any;
    selectedsex: any;
    selectednat: any;
    selectedstatus: any;
    selectedrel: any;
    selectedjob_tybe: any;
    selectedrelation: any;
    selectedsubject: any;
    selectedcrit: any;
    selectedcountry: any;
    selectedemp_status: any;
    form1: FormGroup;

    constructor(
       
        private modalService: NgbModal,
        private cdRef: ChangeDetectorRef, private router: Router, 
        private user_privDataService: user_privDataService,public _fb: FormBuilder, private DepartmentService: DepartmentDataService, private Training_coursesDataService: Training_coursesDataService, private EmployeeService: EmployeeDataService, MasterJobsDataService: MasterJobsDataService
        , private SubjectDataService: SubjectDataService) {
        this.form1 = this._fb.group({
            emp_civilian_id: ['', [Validators.required]],
            emp_file_ser: ['', [Validators.required]],
            emp_name: ['', [Validators.required]],
            selectedjob: ['', [Validators.required]],
            selecteddepartment: ['', [Validators.required]],
            emp_password: ['', [Validators.required]],
            emp_email: ['', [Validators.required]] 
        });
		this.DepartmentService.GetAllMasterdepartment().subscribe(data => this.departments = data,
			error => console.log());
		
		MasterJobsDataService.GetAllActivity().subscribe(data => this.jobs = data,
			error => console.log());

        SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
            error => console.log(),
            () => console.log());

        EmployeeService.Getdefinations_with_scode("sex").subscribe(data => this.sex = data,
            error => console.log(),
            () => console.log());

        EmployeeService.Getdefinations_with_scode("nat").subscribe(data => this.nat = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("status").subscribe(data => this.status = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("religion").subscribe(data => this.religion = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("job_type").subscribe(data => this.job_type = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("relation_type").subscribe(data => this.relation_type = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("crit_level").subscribe(data => this.crit_level = data,
            error => console.log(),
            () => console.log());
        EmployeeService.Getdefinations_with_scode("emp_status").subscribe(data => this.emp_status = data,
            error => console.log(),
            () => console.log());
        
}
    public filteredList
    public isFiltered(permission) {
       
       // console.log("permission", this.filteredList)

        return this.country.slice().find(item => item.country_id === permission.country_id);
    }
    get_side_dep(event) {
        if(event !== null && event !== undefined && event.length !== 0){

            this.DepartmentService.get_department_def_with_master_id(event.dep_id).subscribe(data => this.side_departments = data,
                error => console.log(),
                () => console.log());
        }
    }
    todate: any;
    updateCalcs(event) {
        //   console.log("age", moment(this.student_dob).format('DD-MM-YYYY'), this.start_date[0].start_year_date, "brrrrrr", getAge("08-28-2000", "9-15-2022"))
        fromdate = moment(event).format('MM-DD-YYYY')
        this.todate = moment(Date.now()).format('MM-DD-YYYY')
        if (this.todate) this.todate = new Date(this.todate);
        else this.todate = new Date();
        var fromdate: any = new Date(fromdate);
        var age = [],
            y = [this.todate.getFullYear(), fromdate.getFullYear()],
            ydiff = y[0] - y[1],
            m = [this.todate.getMonth(), fromdate.getMonth()],
            mdiff = m[0] - m[1],
            d = [this.todate.getDate(), fromdate.getDate()],
            ddiff = d[0] - d[1];

        if (mdiff < 0 || (mdiff === 0 && ddiff < 0))--ydiff;
        if (mdiff < 0) mdiff += 12;
        if (ddiff < 0) {
            fromdate.setMonth(m[1] + 1, 0);
            ddiff = fromdate.getDate() - d[1] + d[0];
            --mdiff;
        }
        if (ydiff >= 0) this.emp_age_year = String(ydiff);
        if (mdiff >= 0) this.emp_age_month = String(mdiff);
        if (ddiff >= 0) this.emp_age_day = String(ddiff);
       // console.log("ageee", String(ydiff), String(mdiff), String(ddiff), event, moment(event).format('DD-MM-YYYY'), moment(Date.now()).format('MM-DD-YYYY'))
    }
	selectedjob: any;
	emailFormControl = new FormControl('', [
		Validators.required,
		Validators.email,
	]);
	emailFormControl2 = new FormControl('', [
		Validators.required,
		Validators.email,
	]);

	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
    add_employee() {
      //  console.log("subjectsss", this.selectedsubject.subject_id, this.selectedsubject.subject_name)
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
        if (this.form1.invalid) {
           // console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
            var val = {

                emp_civilian_id: this.emp_civilian_id,
                emp_sex: this.selectedsex.def_name,
                emp_sex_id: Number(this.selectedsex.def_id),
                emp_name: this.emp_name,
                emp_nationality: this.selectednat.def_name,
                emp_nationality_id: Number(this.selectednat.def_id),
                emp_marital_status: this.selectedstatus.def_name,
                emp_marital_status_id: Number(this.selectedstatus.def_id),
                emp_file_ser: Number(this.emp_file_ser),
                emp_dob: this.emp_dob,
                emp_age_year: Number(this.emp_age_year),
                emp_age_month: Number(this.emp_age_month),
                emp_age_day: Number(this.emp_age_day),
                emp_pos_type: this.selectedjob_tybe.def_name,
                emp_pos_type_id: Number(this.selectedjob_tybe.def_id),
                emp_pos: this.job_name_from_function,
                emp_pos_id: Number(this.job_id_from_function),
                emp_dep: this.selecteddepartment.dep_name,
                emp_dep_id: Number(this.selecteddepartment.dep_id),
                emp_subject: this.selectedsubject.subject_name,
                emp_subject_id: Number(this.selectedsubject.subject_id),
                emp_div: this.emp_div,
                emp_div_id: Number(this.emp_div_id),
                emp_contract: this.selectedrelation.def_name,
                emp_contract_id: Number(this.selectedrelation.def_id),
                emp_employment_date: this.emp_employment_date,
                emp_educationa_qualification: this.selectedcrit.def_name,
                emp_educationa_qualification_id: Number(this.selectedcrit.def_id),
                emp_educationa_qualification_date: this.emp_educationa_qualification_date,
                emp_educationa_qualification_country: this.selectedcountry.country_name,
                emp_educationa_qualification_country_id: Number(this.selectedcountry.country_id),
                emp_exp_out_country: Number(this.emp_exp_out_country),
                emp_exp_in_country_same_grade: Number(this.emp_exp_in_country_same_grade),
                emp_exp_in_country_another_grade: Number(this.emp_exp_in_country_another_grade),
                emp_exp_in_country_same_school: Number(this.emp_exp_in_country_same_school),
                emp_address: this.emp_address,
                emp_email: this.emp_email,
                emp_mob: String(this.emp_mob),
                emp_mob1: String(this.emp_mob1),
                emp_tel: String(this.emp_tel),
                emp_username: this.emp_email,
                emp_password: this.emp_password,
                in_class_priv: Number(this.in_class_priv),
                dep_work: Number(this.dep_work),
                relgion_id: Number(this.selectedrel.def_id),
                religion_name : this.selectedrel.def_name

            };
          //  console.log("asd", val)
            this.EmployeeService.addEmployee(val).subscribe(res => {
                this.EmployeeService.BClicked("saved_emppp");
                alert(res.toString());
                this.form1.reset();
            })
         //   console.log(val)
        }
      
	}

	add_training() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		var val = {



			trainig_name: this.trainig_name,
			trainig_from: moment(this.trainig_from).format('DD/MM/YYYY'),
			trainig_to: moment(this.trainig_to).format('DD/MM/YYYY'),
			traing_desc: this.traing_desc
		};
		//console.log("asd", val)
		this.Training_coursesDataService.addTraining_courses(val).subscribe(res => {
			alert(res.toString());
		})
	//	console.log(val)
	}


	job_id_from_function: any;
	job_name_from_function: any;
	job_selection(event) {
		this.job_id_from_function = event.source.value.job_id;
		this.job_name_from_function = event.source.value.job_name;
		//console.log("selected job function", event.source.value.job_id, event)
	}
	update_employee() {
		//console.log("empsssssssss",this.EmployeeService)
		var val = {
			emp_id: Number(this.EmployeeService.emp_id),

            emp_civilian_id: this.emp_civilian_id,
            emp_sex: this.selectedsex.def_name,
            emp_sex_id: Number(this.selectedsex.def_id),
            emp_name: this.emp_name,
            emp_nationality: this.selectednat.def_name,
            emp_nationality_id: Number(this.selectednat.def_id),
            emp_marital_status: this.selectedstatus.def_name,
            emp_marital_status_id: Number(this.selectedstatus.def_id),
            emp_file_ser: Number(this.emp_file_ser),
            emp_dob: this.emp_dob,
            emp_age_year: Number(this.emp_age_year),
            emp_age_month: Number(this.emp_age_month),
            emp_age_day: Number(this.emp_age_day),
            emp_pos_type: this.selectedjob_tybe.def_name,
            emp_pos_type_id: Number(this.selectedjob_tybe.def_id),
            emp_pos: this.job_name_from_function,
            emp_pos_id: Number(this.job_id_from_function),
            emp_dep: this.selecteddepartment.dep_name,
            emp_dep_id: Number(this.selecteddepartment.dep_id),
            emp_subject: this.selectedsubject.subject_name,
            emp_subject_id: Number(this.selectedsubject.subject_id),
            emp_div: this.emp_div,
            emp_div_id: Number(this.emp_div_id),
            emp_contract: this.selectedrelation.def_name,
            emp_contract_id: Number(this.selectedrelation.def_id),
            emp_employment_date: this.emp_employment_date,
            emp_educationa_qualification: this.selectedcrit.def_name,
            emp_educationa_qualification_id: Number(this.selectedcrit.def_id),
            emp_educationa_qualification_date: this.emp_educationa_qualification_date,
            emp_educationa_qualification_country: this.selectedcountry.country_name,
            emp_educationa_qualification_country_id: Number(this.selectedcountry.country_id),
            emp_exp_out_country: Number(this.emp_exp_out_country),
            emp_exp_in_country_same_grade: Number(this.emp_exp_in_country_same_grade),
            emp_exp_in_country_another_grade: Number(this.emp_exp_in_country_another_grade),
            emp_exp_in_country_same_school: Number(this.emp_exp_in_country_same_school),
            emp_address: this.emp_address,
            emp_email: this.emp_email,
            emp_mob: String(this.emp_mob),
            emp_mob1: String(this.emp_mob1),
            emp_tel: String(this.emp_tel),
            emp_username: this.emp_username,
            emp_password: this.emp_password,
            in_class_priv: Number(this.in_class_priv),
            dep_work: Number(this.dep_work),
            relgion_id: Number(this.selectedrel.def_id),
            religion_name : this.selectedrel.def_name
            
		};

		//console.log("val", val);
      

        this.EmployeeService.updateEmployee(val).subscribe(res => {
            this.EmployeeService.BClicked("saved_emppp");
            alert(res.toString());
            this.form1.reset();
			// (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
			// (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
			// (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
			// (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
            this.is_edit=false;
		})

	}
    cancel_employee() {
        this.form1.reset();
		
	}

    myControl = new FormControl('');
  //  options: string[];
    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.country.filter(option => option.country_name.toLowerCase().includes(filterValue));
    } 
    displayFn(selectedoption) {
        return selectedoption ? selectedoption.country_name : undefined;
    }
 
priv_info:any=[];
read:any;
write:any;
read_and_Write:any;
	ngOnInit() {
        
       // console.log("asdsd",this.router.url as string )
        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {this.cdRef.detectChanges();});
      

        this.EmployeeService.Getcountries().subscribe(data => this.country = data,
            error => console.log(),
            () => {
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.country_name),
                        map(country_name => country_name ? this._filter(country_name) : this.country.slice())
                    );
             //   console.log("test", this.filteredOptions)
                //this.filteredList = this.country.slice();
                //console.log(, this.filteredList);
            });
		
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.EmployeeService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true
				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
				this.emp_id = Number(this.EmployeeService.emp_id);
				this.emp_civilian_id = this.EmployeeService.emp_civilian_id;
				this.emp_sex = this.EmployeeService.emp_sex;
				this.emp_sex_id = this.EmployeeService.emp_sex_id;
				this.emp_name = this.EmployeeService.emp_name;
				this.emp_nationality = this.EmployeeService.emp_nationality;
				this.emp_nationality_id = this.EmployeeService.emp_nationality_id;
				this.emp_marital_status = this.EmployeeService.emp_marital_status;
				this.emp_marital_status_id = this.EmployeeService.emp_marital_status_id;
				this.emp_file_ser = this.EmployeeService.emp_file_ser;
				this.emp_dob = this.EmployeeService.emp_dob;
				this.emp_age_year = this.EmployeeService.emp_age_year;
				this.emp_age_month = this.EmployeeService.emp_age_month;
				this.emp_age_day = this.EmployeeService.emp_age_day;
				this.emp_pos_type = this.EmployeeService.emp_pos_type;
				this.emp_pos_type_id = this.EmployeeService.emp_pos_type_id;
				this.emp_pos = this.EmployeeService.emp_pos;
			/*	this.selectedjob.job_id = this.EmployeeService.emp_pos_id;*/
				this.emp_dep = this.EmployeeService.emp_dep;
				/*this.selecteddepartment.dep_id = this.EmployeeService.emp_dep_id;*/
				this.emp_subject = this.EmployeeService.emp_subject;
				this.emp_subject_id = this.EmployeeService.emp_subject_id;
				this.emp_div = this.EmployeeService.emp_div;
				this.emp_div_id = this.EmployeeService.emp_div_id;
				this.emp_contract = this.EmployeeService.emp_contract;
				this.emp_contract_id = this.EmployeeService.emp_contract_id;
				this.emp_employment_date = this.EmployeeService.emp_employment_date;
				this.emp_educationa_qualification = this.EmployeeService.emp_educationa_qualification;
				this.emp_educationa_qualification_id = this.EmployeeService.emp_educationa_qualification_id;
				this.emp_educationa_qualification_date = this.EmployeeService.emp_educationa_qualification_date;
				this.emp_educationa_qualification_country = this.EmployeeService.emp_educationa_qualification_country;
				this.emp_educationa_qualification_country_id = this.EmployeeService.emp_educationa_qualification_country_id;
				this.emp_exp_out_country = this.EmployeeService.emp_exp_out_country;
				this.emp_exp_in_country_same_grade = this.EmployeeService.emp_exp_in_country_same_grade;
				this.emp_exp_in_country_another_grade = this.EmployeeService.emp_exp_in_country_another_grade;
				this.emp_exp_in_country_same_school = this.EmployeeService.emp_exp_in_country_same_school;
				this.emp_address = this.EmployeeService.emp_address;
				this.emp_email = this.EmployeeService.emp_email;
				this.emp_mob = this.EmployeeService.emp_mob;
				this.emp_mob1 = this.EmployeeService.emp_mob1;
				this.emp_tel = this.EmployeeService.emp_tel;
				this.emp_username = this.EmployeeService.emp_username;
				this.emp_password = this.EmployeeService.emp_password;
				this.in_class_priv = this.EmployeeService.in_class_priv;
				this.dep_work = this.EmployeeService.dep_work;
                
                
                var selected_rel = String(this.EmployeeService.relgion_id);
                this.selectedsex = this.religion[this.religion.findIndex(function (el) {

                    return String(el.def_id) == selected_rel;

                })];


                var selected_sex = String(this.EmployeeService.emp_sex_id);
                this.selectedsex = this.sex[this.sex.findIndex(function (el) {

                    return String(el.def_id) == selected_sex;

                })];

                var selected_nat = String(this.EmployeeService.emp_nationality_id);
                this.selectednat = this.nat[this.nat.findIndex(function (el) {

                    return String(el.def_id) == selected_nat;

                })];

                var selected_status = String(this.EmployeeService.emp_marital_status_id);
                this.selectedstatus = this.status[this.status.findIndex(function (el) {

                    return String(el.def_id) == selected_status;

                })];

                var selected_status = String(this.EmployeeService.emp_marital_status_id);
                this.selectedstatus = this.status[this.status.findIndex(function (el) {
                    return String(el.def_id) == selected_status;
                })];

                var selected_job_tybe = String(this.EmployeeService.emp_pos_type_id);
                this.selectedjob_tybe = this.job_type[this.job_type.findIndex(function (el) {
                    return String(el.def_id) == selected_job_tybe;
                })];

                var selected_relation = String(this.EmployeeService.emp_contract_id);
                this.selectedrelation = this.relation_type[this.relation_type.findIndex(function (el) {
                    return String(el.def_id) == selected_relation;
                })];

                var selected_crit = String(this.EmployeeService.emp_educationa_qualification_id);
                this.selectedcrit = this.crit_level[this.crit_level.findIndex(function (el) {
                    return String(el.def_id) == selected_crit;
                })];

                var selected_emp_status = String(this.EmployeeService.emp_educationa_qualification_id);
                this.selectedemp_status = this.emp_status[this.emp_status.findIndex(function (el) {
                    return String(el.def_id) == selected_emp_status;
                })];

                var selected_job = String(this.EmployeeService.emp_pos_id);
                this.selectedjob = this.jobs[this.jobs.findIndex(function (el) {
                    return String(el.job_id) == selected_job;
                })];

                var selected_dep = String(this.EmployeeService.emp_dep_id);
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
                    return String(el.dep_id) == selected_dep;
                })];

                var selected_subject = String(this.EmployeeService.emp_subject_id);
                this.selectedsubject = this.subjects[this.subjects.findIndex(function (el) {
                    return String(el.subject_id) == selected_subject;
                })];

                var selected_subject = String(this.EmployeeService.emp_dep_id);
                this.selectedsubject = this.subjects[this.subjects.findIndex(function (el) {
                    return String(el.subject_id) == selected_subject;
                })];

                var selected_country = String(this.EmployeeService.emp_educationa_qualification_country_id);
                this.selectedcountry = this.country[this.country.findIndex(function (el) {
                    return String(el.country_id) == selected_country;
                })];


				/*	document.getElementById("save_btn").innerHTML="asdasd"*/
                //console.log("edited", this.country)

                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }
			});

		this.Training_coursesDataService.aClickedEvent
			.subscribe((data: string) => {
				//console.log("edited");
				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;


				this.trainig_id = Number(this.Training_coursesDataService.trainig_id);

				this.trainig_name = this.Training_coursesDataService.trainig_name;
				this.trainig_from = this.Training_coursesDataService.trainig_from;
				this.trainig_to = this.Training_coursesDataService.trainig_to;
				this.traing_desc = this.Training_coursesDataService.traing_desc;

       
			});

	

		this.trainig_id = this.trainig_id;
		this.trainig_name = this.trainig_name;
		this.trainig_from = this.trainig_from;
		this.trainig_to = this.trainig_to;
		this.traing_desc = this.traing_desc;

  //      (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
	}

	fieldArray: Array<any> = [
		{
			name: '',
			name1: ''
		}
	];
	newAttribute: any = {};

	firstField = true;
	firstFieldName = 'First Item name';
	isEditItems: boolean;

	addFieldValue(index) {
		if (index != 0) {
			this.fieldArray.push(this.newAttribute);
			//console.log("zzzzz", this.fieldArray, this.newAttribute)
			this.newAttribute = {};
		}
	}

	deleteFieldValue(index) {
		if (index != 0) {
			this.fieldArray.splice(index, 1);
			//console.log("delete", index)
		}
	}

    display = "";
    openModal(content: any, event: any) {

        this.modalService.open(content, { backdrop: true, size: "xl", });
    }
    openModal1() {
        this.display = "show";
       // console.log("clicked")
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }

}
