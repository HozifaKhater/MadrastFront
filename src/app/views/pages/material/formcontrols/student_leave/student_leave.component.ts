import { Component, ChangeDetectorRef,OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { Levels } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Classes} from '../../../../../ClassesMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { Student } from '../../../../../StudentMaster.Model';
import { School_dataDataService } from '../../../../../Services/School_dataDataService';
import { School_data } from '../../../../../School_dataMaster.Model';
import { Student_leaveDataService } from '../../../../../Services/Student_leaveDataService';
import * as def from '../../../../../definationsMaster.Model';
import { Observable } from 'rxjs'; 
import { FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
    selector: 'kt-student_leave',
    templateUrl: './student_leave.component.html',
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
export class Student_leaveComponent implements OnInit {
 
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
  
    jobs: DepartmentMaster[];
    level: Levels[];
    class: Classes[];
    student: Student[];
    leavereason: def.leavereason[];
    branch: def.branch[];
    eduregion: def.eduregion[];

    selectedbranch: any =[];
    selectedschool: any=[];
    selectedregion: any=[];
    selectedreason: any=[];

    selectedclass: any =[];
    selectedstudent: any =[];
    selectedlevel: any=[];

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlstudent = new FormControl('');
    is_edit:boolean=false;
    form1: FormGroup;

    constructor(
        private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Student_leaveDataService: Student_leaveDataService,
        private School_dataDataService: School_dataDataService,
        private EmployeeService: EmployeeDataService
    ) {
        this.form1 = this._fb.group({
            student_civilian_id: ['', [Validators.required]],
            selectedbranch: ['', [Validators.required]],
            selectedreason: ['', [Validators.required]]
        });

        EmployeeService.Getdefinations_with_scode("leavereason")
        .subscribe(data => this.leavereason = data,
            error => console.log());

        EmployeeService.Getdefinations_with_scode("branch")
        .subscribe(data => this.branch = data,
            error => console.log());
}
  
  
openModal(content: any, event: any){

    this.modalService.open(content,{backdrop:true,size:"xl",});
}
    todate: any;
 
    selectedviol: any;
    selectedproced: any;


	matcher = new MyErrorStateMatcher();
	value = 'Clear me';

    add_student_leave() {
        if (this.form1.invalid) {
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

            this.Student_leaveDataService.addStudentleave(val).subscribe(res => {
                alert("Saved Succesfully");
                this.Student_leaveDataService.BClicked("b2");
                this.form1.reset();
            })
        }
	}

    update_student_leave() {
        if (this.form1.invalid) {
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

            this.Student_leaveDataService.updateStudentleave(val).subscribe(res => {
                alert("Updated Succesfully");
                this.Student_leaveDataService.BClicked("b2");
                this.is_edit=false;

		    })

            this.form1.reset();
        }
	}
   
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
        if(event !== null && event !== undefined && event.length !== 0){

            this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
                error => console.log(),
                () => {
                    var selected_class_status = String(this.Student_leaveDataService.class_id);
                    this.selectedclass = this.class[this.class.findIndex(function (el) {

                        return String(el.class_id) == selected_class_status;
                    })];

                    this.filteredOptionsclass = this.myControlclass.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.class_name : ''),
                            map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                        );
                });

        }
    }
    change_class(event) {
        if(event !== null && event !== undefined && event.length !== 0){

            this.StudentDataService.GetAllStudent_of_class(event.class_id).subscribe(data => this.student = data,
                error => console.log(),
                () => {
                    var selected_student_status = String(this.Student_leaveDataService.student_id);
                    this.selectedstudent = this.student[this.student.findIndex(function (el) {

                        return String(el.student_id) == selected_student_status;
                    })];
                    this.filteredOptionsstudent = this.myControlstudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.student_name : ''),
                            map(student_name => student_name ? this._filterstudent(student_name) : this.student.slice())
                        );
                });
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
       
        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(),
            () => {
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

        this.Student_leaveDataService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true;

                this.leav_stu_id = this.leav_stu_id;
                this.student_civilian_id = this.Student_leaveDataService.student_civilian_id;
                this.student_branch_id = this.student_branch_id;
                this.student_branch = this.Student_leaveDataService.student_branch;
                this.leave_reason_id = this.leave_reason_id;
                this.leave_reason = this.Student_leaveDataService.leave_reason;
                this.leave_date = this.Student_leaveDataService.leave_date;

                var selected_level_status = String(this.Student_leaveDataService.lev_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {

                    return String(el.lev_id) == selected_level_status;
                })];


                var selected_branch_status = String(this.Student_leaveDataService.student_branch_id);
                this.selectedbranch = this.branch[this.branch.findIndex(function (el) {

                    return String(el.def_id) == selected_branch_status;
                })];

                var selected_reason_status = String(this.Student_leaveDataService.leave_reason_id);
                this.selectedreason = this.leavereason[this.leavereason.findIndex(function (el) {

                    return String(el.def_id) == selected_reason_status;
                })];
     
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});

	}
}
