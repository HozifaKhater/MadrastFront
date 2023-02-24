import { Component, ChangeDetectorRef,OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
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
import { Supervisor_opinionDataService } from '../../../../../Services/Supervisor_opinionDataService';
import { Supervisor_opinionMaster, Supervisor_opinion } from '../../../../../Supervisor_opinionMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

@Component({
    selector: 'kt-supervisor_opinion',
    templateUrl: './supervisor_opinion.component.html',
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
export class SupervisoropinionComponent implements OnInit {
 
	@Input() employee_data: any;
    supervisor_opin_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    dep_id: string = "";
    dep_name: string = "";
    student_id: string = "";
    student_name: string = "";
    super_opin_date: string = "";
    behave_stat_rep: string = "";
    dep_mang_opin: string = "";
    supervisor_opin: string = ""



    departments: Departments[];
  
    jobs: DepartmentMaster[];
    level: Levels[];
    class: Classes[];
    student: Student[];
    viols: def.viols[];
    viols_proced: def.viols_proced[];

    form1: FormGroup;
    selected_level: any;
    selected_class: any;
    selected_student: any;
    constructor(
        private cdRef:ChangeDetectorRef,
        private modalService: NgbModal,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Supervisor_opinionDataService: Supervisor_opinionDataService,
        private DepartmentService: DepartmentDataService,
        private EmployeeService: EmployeeDataService
    ) {
        this.form1 = this._fb.group({
            selecteddepartment: ['', [Validators.required]],
            supervisor_opin: ['', [Validators.required]]
        });

		
        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
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
    add_superopin() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                    lev_id: Number(this.selectedlevel.lev_id),
                    lev_name: this.selectedlevel.lev_name,
                    class_id: Number(this.selectedclass.class_id),
                    class_name: this.selectedclass.class_name,
                    dep_id: Number(this.selecteddepartment.dep_id),
                    dep_name: this.selecteddepartment.dep_name,
                    student_id: Number(this.selectedstudent.student_id),
                    student_name: this.selectedstudent.student_name,
                    super_opin_date: this.super_opin_date,             
                    behave_stat_rep: this.behave_stat_rep,
                    dep_mang_opin: this.dep_mang_opin,
                    supervisor_opin: this.supervisor_opin

                };
                
            this.Supervisor_opinionDataService.addSuperopin(val).subscribe(res => {
                alert("saved succesfully");
                this.Supervisor_opinionDataService.BClicked("b2");
                    this.form1.reset();
                }
            )
        }
      
	}

    update_superopin() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
        var val = {
            supervisor_opin_id: Number(this.Supervisor_opinionDataService.supervisor_opin_id),
            lev_id: Number(this.selectedlevel.lev_id),
            lev_name: this.selectedlevel.lev_name,
            class_id: Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            dep_id: Number(this.selecteddepartment.dep_id),
            dep_name: this.selecteddepartment.dep_name,
            student_id: Number(this.selectedstudent.student_id),
            student_name: this.selectedstudent.student_name,
            super_opin_date: this.super_opin_date,
            behave_stat_rep: this.behave_stat_rep,
            dep_mang_opin: this.dep_mang_opin,
            supervisor_opin: this.supervisor_opin
		};      

        this.Supervisor_opinionDataService.updateSuperopin(val).subscribe(res => {
           
            alert("Updateed Successfully");
            this.Supervisor_opinionDataService.BClicked("b2");
          
		})
            this.form1.reset();
        }
	}
    cancel_superopin() {
        this.form1.reset();
		
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
        if(event !== null && event !== undefined && event.length !== 0){

            this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
                error => console.log(),
                () => {
                    var selected_class_status = String(this.Supervisor_opinionDataService.class_id);
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
                    var selected_student_status = String(this.Supervisor_opinionDataService.student_id);
                    this.selectedstudent = this.student[this.student.findIndex(function (el) {

                        return String(el.student_id) == selected_student_status;
                    })];
                    this.filteredOptionsstudent = this.myControlstudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.student_name :''),
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

		

        this.Supervisor_opinionDataService.aClickedEvent
			.subscribe((data: string) => {
				
                this.supervisor_opin_id = this.supervisor_opin_id;
                this.lev_id = this.lev_id;
                this.lev_name = this.lev_name;
                this.class_id = this.class_id;
                this.class_name = this.class_name;
                this.dep_id = this.dep_id;
                this.dep_name = this.dep_name;
                this.student_id = this.student_id;
                this.student_name = this.student_name;
                this.super_opin_date = this.Supervisor_opinionDataService.super_opin_date;
                this.behave_stat_rep = this.Supervisor_opinionDataService.behave_stat_rep;
                this.dep_mang_opin = this.Supervisor_opinionDataService.dep_mang_opin;
                this.supervisor_opin = this.Supervisor_opinionDataService.supervisor_opin;

                var selected_level_status = String(this.Supervisor_opinionDataService.lev_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {

                    return String(el.lev_id) == selected_level_status;
                })];

                var selected_dep_status = String(this.Supervisor_opinionDataService.dep_id);
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {

                    return String(el.dep_id) == selected_dep_status;
                })];


       
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});

       
	}
}
