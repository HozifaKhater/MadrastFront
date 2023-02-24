import { Component, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';;
import { MasterJobMaster } from '../../../../../MasterJobMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { EmployeeMaster } from '../../../../../EmployeeMaster.Model';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels,LevelsMaster } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Classes,ClassesMaster} from '../../../../../ClassesMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { Student, StudentMaster } from '../../../../../StudentMaster.Model';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { School_dataMaster, School_data } from '../../../../../School_dataMaster.Model';
import { Student_leaveDataService } from '../../../../../Services/Student_leaveDataService';
import { corridorsDataService } from '../../../../../Services/CorridorsDataService';

import { CorridorsMaster, corridor } from '../../../../../CorridorsMaster.Model';
import { Student_leaveMaster, Student_leave } from '../../../../../Student_leaveMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs'; 
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
    selector: 'kt-behavioral_report',
    templateUrl: './behavioral_report.component.html',
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
export class BehavioralreportComponent implements OnInit {
 

   
  

   
    //private _filter(value: string): any[] {
    //    const filterValue = value.toLowerCase();

    //    return this.country.filter(country => country);
    //}
	@Input() employee_data: any;
    leav_stu_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_id: string = "";
    student_name: string = "";
    student_civilian_id: string = "";
    student_branch_id: string = "";
    student_branch: string = "";
    leave_reason_id: string = "";
    leave_reason: string = "";
    leave_date: string = "";

    school: School_data[];
    corridors: corridor[];
    jobs: DepartmentMaster[];
    level: Levels[];
    class: Classes[];
    student: Student[];
    alert_type: def.alert_type[];
    branch: def.branch[];
    eduregion: def.eduregion[];
    selectedbranch: any;
    selectedschool: any;
    selectedregion: any;
    selectedreason: any;

    disabled_class: boolean;
    disabled: boolean;
    disabled_emp: boolean;

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

    form1: FormGroup;
    selected_level: any;
    selected_class: any;
    selected_student: any;
    constructor(public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Student_leaveDataService: Student_leaveDataService,
        private School_dataDataService: School_dataDataService,
        private EmployeeService: EmployeeDataService,
        private corridorsDataService: corridorsDataService
    ) {
        this.form1 = this._fb.group({
            student_civilian_id: ['', [Validators.required]],
            selectedbranch: ['', [Validators.required]],
            selectedreason: ['', [Validators.required]]
        });

        EmployeeService.Getdefinations_with_scode("alert_type").subscribe(data => this.alert_type = data,
            error => console.log(error),
            () => console.log("ok"));

        this.corridorsDataService.GetAllCorridors().subscribe(data => this.corridors = data,
            error => console.log(error),
            () => console.log("emp dropdown", this.corridors));
}


    checked_radio: any;

    handleChange(evt) {
        if (evt.target.value === "department") {
            this.disabled = false
            this.disabled_class = false
            this.disabled_emp = true
        }
        else if (evt.target.value === "employee") {
            this.disabled = false
            this.disabled_class = false
            this.disabled_emp = false
        }

        console.log(evt.target.value, evt);
        this.checked_radio = evt.target.value
    }

  
    todate: any;
 
    selectedviol: any;
    selectedproced: any;


	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
    add_student_leave() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]

        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
        var val = {

                lev_id: Number(this.selectedlevel.lev_id),
                lev_name: this.selectedlevel.lev_name,
                class_id: Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,
                student_id: Number(this.selectedstudent.student_id),
                student_name: this.selectedstudent.student_name,
            student_civilian_id: this.student_civilian_id, 
            student_branch_id: Number(this.selectedbranch.def_id),
            student_branch: this.selectedbranch.def_name,
            leave_reason_id: Number(this.selectedreason.def_id),
            leave_reason: this.selectedreason.def_name,
            leave_date: this.leave_date

            };
            console.log("asd", val)
            this.Student_leaveDataService.addStudentleave(val).subscribe(res => {
               
                alert("saved succesfully");
                this.Student_leaveDataService.BClicked("b2");
                this.form1.reset();
            })
            console.log(val)

        }
      
	}

    update_student_leave() {
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
        var val = {
            leav_stu_id: Number(this.Student_leaveDataService.leav_stu_id),
            lev_id: Number(this.selectedlevel.lev_id),
            lev_name: this.selectedlevel.lev_name,
            class_id: Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            student_id: Number(this.selectedstudent.student_id),
            student_name: this.selectedstudent.student_name,
            student_civilian_id: this.student_civilian_id,
            student_branch_id: Number(this.selectedbranch.def_id),
            student_branch: this.selectedbranch.def_name,
            leave_reason_id: Number(this.selectedreason.def_id),
            leave_reason: this.selectedreason.def_name,
            leave_date: this.leave_date
		};

		console.log("val", val);
      

            this.Student_leaveDataService.updateStudentleave(val).subscribe(res => {
           
            alert(res.toString());
                this.Student_leaveDataService.BClicked("b2");
          
			(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
			(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
			(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
			(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		})
            this.form1.reset();
        }
	}
    cancel_student_leave() {
        this.form1.reset();
		(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
		(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
	}
	selecteddepartment: any;
	selectedsidedepartment: any;
    selectedclass: any;
    selectedstudent: any;
    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlstudent = new FormControl('');
    selectedlevel: any;
    filteredOptionslev: Observable<any[]>;
    private _filterlev(value: string) {
        const filterValue = value.toLowerCase();
        return this.level.filter(option => option.lev_name.toLowerCase().includes(filterValue));
    }
    displayFnlev(selectedoption) {
        return selectedoption ? selectedoption.lev_name : undefined;
    }

    filteredOptionsclass: Observable<any[]>;
    private _filterclass(value: string) {
        const filterValue = value.toLowerCase();
        return this.class.filter(option => option.class_name.toLowerCase().includes(filterValue));
    }
    displayFnclass(selectedoption) {
        return selectedoption ? selectedoption.class_name : undefined;
    }

    filteredOptionsstudent: Observable<any[]>;
    private _filterstudent(value: string) {
        const filterValue = value.toLowerCase();
        return this.student.filter(option => option.student_name.toLowerCase().includes(filterValue));
    }
    displayFnstudent(selectedoption) {
        return selectedoption ? selectedoption.student_name : undefined;
    }

    change_level(event) {
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
                var selected_class_status = String(this.Student_leaveDataService.class_id);
                this.selectedclass = this.class[this.class.findIndex(function (el) {

                    return String(el.class_id) == selected_class_status;
                })];
                console.log("emp dropdown", this.class);
                this.filteredOptionsclass = this.myControlclass.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.class_name),
                        map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                    );
            });


    }
    change_class(event) {
        this.StudentDataService.GetAllStudent_of_class(event.class_id).subscribe(data => this.student = data,
            error => console.log(error),
            () => {
                var selected_student_status = String(this.Student_leaveDataService.student_id);
                this.selectedstudent = this.student[this.student.findIndex(function (el) {

                    return String(el.student_id) == selected_student_status;
                })];
                console.log("emp dropdown", this.student);
                this.filteredOptionsstudent = this.myControlstudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.student_name),
                        map(student_name => student_name ? this._filterstudent(student_name) : this.student.slice())
                    );
            });
    }

 
	ngOnInit() {
       
        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(error),
            () => {
                console.log("emp dropdown", this.level);
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

        this.Student_leaveDataService.aClickedEvent
			.subscribe((data: string) => {
				(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
                console.log("editemps", this.Student_leaveDataService.leav_stu_id)
                this.leav_stu_id = this.leav_stu_id;
                this.student_civilian_id = this.Student_leaveDataService.student_civilian_id;
                this.student_branch_id = this.student_branch_id;
                this.student_branch = this.Student_leaveDataService.student_branch;
                this.leave_reason_id = this.leave_reason_id;
                this.leave_reason = this.Student_leaveDataService.leave_reason;
                this.leave_date = this.Student_leaveDataService.leave_date;

          
                /*	document.getElementById("save_btn").innerHTML="asdasd"*/

                var selected_level_status = String(this.Student_leaveDataService.lev_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {

                    return String(el.lev_id) == selected_level_status;
                })];


                var selected_branch_status = String(this.Student_leaveDataService.student_branch_id);
                this.selectedbranch = this.branch[this.branch.findIndex(function (el) {

                    return String(el.def_id) == selected_branch_status;
                })];


     
				console.log("edited")

			});
		
        this.selectedbranch = this.selectedbranch;
        this.selectedreason = this.selectedreason;

	}
}
