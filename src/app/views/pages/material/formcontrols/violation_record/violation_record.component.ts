import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, SideDepartmentMaster } from '../../../../../DepartmentMaster.Model';
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
import { Violation_recordDataService } from '../../../../../Services/Violation_recordDataService';
import { Violation_recordMaster, Violation_record } from '../../../../../Violation_recordMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs';
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
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
    selector: 'kt-violation_record',
    templateUrl: './violation_record.component.html',
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
export class ViolationrecordComponent implements OnInit {
 
	@Input() employee_data: any;
    viol_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_id: string = "";
    student_name: string = "";
    viol_date: string = "";
    violation_id: string = "";
    violation_name: string = "";
    procedure_id: string = "";
    procedure_name: string = "";


	departments: DepartmentMaster[];
    side_departments: SideDepartmentMaster[];
    jobs: DepartmentMaster[];
    level: Levels[];
    class: Classes[];
    student: Student[];
    viols: def.viols[];
    viols_proced: def.viols_proced[];

    selectedclass: any =[];
    selectedstudent: any =[];
    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlstudent = new FormControl('');
    selectedlevel: any =[];
  
    form1: FormGroup;

    constructor(
        private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
        private modalService: NgbModal,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Violation_recordDataService: Violation_recordDataService,
        private EmployeeService: EmployeeDataService
       ) {
        this.form1 = this._fb.group({
            violation_name: ['', [Validators.required]],
          
            procedure_name: ['', [Validators.required]]       
        });
		
        EmployeeService.Getdefinations_with_scode("viols").subscribe(data => this.viols = data,
            error => console.log());

        EmployeeService.Getdefinations_with_scode("viols_proced").subscribe(data => this.viols_proced = data,
            error => console.log());
    }

    openModal(content: any, event: any){
        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
  
    selectedviol: any;
    selectedproced: any;

    add_viols() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var val = {

                lev_name: this.selectedlevel.lev_name,
                lev_id: Number(this.selectedlevel.lev_id),
                class_name: this.selectedclass.class_name,
                class_id: Number(this.selectedclass.class_id),
                student_id: Number(this.selectedstudent.student_id),
                student_name: this.selectedstudent.student_name,
                viol_date: this.viol_date,
                violation_id: Number(this.selectedviol.def_id),
                violation_name: this.selectedviol.def_name,
                procedure_id: Number(this.selectedproced.def_id),
                procedure_name: this.selectedproced.def_name


            };

            this.Violation_recordDataService.addViolation(val).subscribe(res => {
                alert("Saved Succesfully");
                this.Violation_recordDataService.BClicked("b2");
                this.form1.reset();
            })

        }
      
	}

    update_viols() {
		
        var val = {
            viol_id: Number(this.Violation_recordDataService.viol_id),
            lev_name: this.selectedlevel.lev_name,
            lev_id: Number(this.selectedlevel.lev_id),
            class_name: this.selectedclass.class_name,
            class_id: Number(this.selectedclass.class_id),
            student_id: Number(this.selectedstudent.student_id),
            student_name: this.selectedstudent.student_name,
            viol_date: this.viol_date,
            violation_id: Number(this.selectedviol.def_id),
            violation_name: this.selectedviol.def_name,
            procedure_id: Number(this.selectedproced.def_id),
            procedure_name: this.selectedproced.def_name
		};
    
        this.Violation_recordDataService.updateViolation(val).subscribe(res => {
            alert("Updated Sucessfully");
            this.is_edit=false;
            this.Violation_recordDataService.BClicked("b2");
            this.form1.reset();
			
		})

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
                    var selected_class_status = String(this.Violation_recordDataService.class_id);
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
                    var selected_student_status = String(this.Violation_recordDataService.student_id);
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
    is_edit:boolean=false;
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

		
        this.Violation_recordDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
                this.viol_id = this.viol_id;
                this.viol_date = this.Violation_recordDataService.viol_date;
                this.violation_id = this.violation_id;
                this.violation_name = this.Violation_recordDataService.violation_name;
                this.procedure_id = this.procedure_id;
                this.procedure_name = this.Violation_recordDataService.procedure_name;

          

                var selected_level_status = String(this.Violation_recordDataService.lev_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {

                    return String(el.lev_id) == selected_level_status;
                })];

               
                var selected_viol_status = String(this.Violation_recordDataService.violation_id);
                this.selectedviol = this.viols[this.viols.findIndex(function (el) {

                    return String(el.def_id) == selected_viol_status;
                })];

                var selected_proced_status = String(this.Violation_recordDataService.procedure_id);
                this.selectedproced = this.viols_proced[this.viols_proced.findIndex(function (el) {

                    return String(el.def_id) == selected_proced_status;
                })];



                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }

			});
		


	}
}
