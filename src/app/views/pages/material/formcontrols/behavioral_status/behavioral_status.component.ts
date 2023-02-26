import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
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
import { Behavioral_statusDataService } from '../../../../../Services/Behavioral_statusDataService';
import { Behavioral_statusMaster, Behavioral_status } from '../../../../../Behavioral_statusMaster.Model';
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
    selector: 'kt-behave_status',
    templateUrl: './behavioral_status.component.html',
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
export class BehavestatusComponent implements OnInit {
 
	@Input() employee_data: any;
    behave_stat_id: number;
    lev_id: string = "";
    lev_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_id: string = "";
    student_name: string = "";
    behave_date: string = "";
    behave_stat_rep: string = "";


    is_edit:boolean=false;
    class_id_value:number=0;

	level: Levels[]=[];
    selectedlevel: any=[];

    class: Classes[]=[];
    selectedclass: any=[];

	student: Student[]=[];
    selectedStudent : any=[];

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');
  

    form1: FormGroup;

    selected_level: any=[];
    selected_class: any=[];
    selected_student: any=[];

    constructor(
        private modalService: NgbModal,
        private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private Behavioral_statusDataService: Behavioral_statusDataService,
        private EmployeeService: EmployeeDataService
       ) {
        this.form1 = this._fb.group({

        });
		
    }
  
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    add_behav() {
            var val = {
                lev_name: this.selectedlevel.lev_name,
                lev_id: Number(this.selectedlevel.lev_id),
                class_name: this.selectedclass.class_name,
                class_id: Number(this.selectedclass.class_id),
                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                behave_date: this.behave_date,             
                behave_stat_rep: this.behave_stat_rep

            };
            this.Behavioral_statusDataService.addBehave(val).subscribe(res => {
                alert("Saved Succesfully");
                this.Behavioral_statusDataService.BClicked("b2");
                this.selectedStudent = [];
                this.selectedclass = [];
                this.selectedlevel = [];
                this.myControllev.reset();
                this.myControlclass.reset();
                this.myControlStudent.reset();
            });
	}

    update_behav() {
		
        var val = {
            behave_stat_id: Number(this.Behavioral_statusDataService.behave_stat_id),
            lev_name: this.selectedlevel.lev_name,
            lev_id: Number(this.selectedlevel.lev_id),
            class_name: this.selectedclass.class_name,
            class_id: Number(this.selectedclass.class_id),
            student_id: Number(this.selectedStudent.student_id),
            student_name: this.selectedStudent.student_name,
            behave_date: this.behave_date,
            behave_stat_rep: this.behave_stat_rep
		};

        this.Behavioral_statusDataService.updateBehave(val).subscribe(res => {
           
            alert("Updated Successfully");
            
this.is_edit=false;
            this.Behavioral_statusDataService.BClicked("b2");
            this.selectedStudent = [];
            this.selectedclass = [];
            this.selectedlevel = [];
            this.myControllev.reset();
            this.myControlclass.reset();
            this.myControlStudent.reset();
            this.is_edit=false;
		})

	}
    cancel_behav() {
        /*this.form1.reset();*/
        
this.is_edit=false;
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

	filteredOptionsStudents:  Observable<any[]>;
	
    private _filterStudent(value: string) {
        const filterValue = value.toLowerCase();
        return this.student.filter(option => option.student_name.toLowerCase().includes(filterValue));
    }

    displayFnStudent(selectedoption) {
        return selectedoption ? selectedoption.student_name : undefined;
    }

    change_level(event) {
		
        if(event !== null && event !== undefined && event.length !== 0){
			this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
				error => console.log(),
				() => {
					this.filteredOptionsclass = this.myControlclass.valueChanges
						.pipe(
							startWith(''),
							map(value => value ? typeof value === 'string' ? value : value.class_name : ''),
							map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
						);
				});
		}
        
    }

    change_class(event) {
        if(event !== null && event !== undefined && event.length !== 0){
			this.class_id_value = event.class_id;
			this.Change_Student();
		}
    }

    Change_Student(){
        if(this.class_id_value !== null && this.class_id_value !== undefined){

            this.StudentDataService.GetAllStudent_of_class(this.class_id_value)
            .subscribe(data => this.student = data,
                error => console.log(),
                () => {
                    this.filteredOptionsStudents = this.myControlStudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value ? typeof value === 'string' ? value : value.student_name : ''),
                            map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
                        );
                        if(this.selectedStudent !== null && this.selectedStudent !== undefined){
                            this.setData();
                        }
                });
        }

    }

	setData(){
		this.student_id = this.selectedStudent.student_id;
        this.student_name = this.selectedStudent.student_name;
	}
  
    studentVar:any=[];
    classVar:any=[];
    anotherStuArray:Student[]=[];
    anotherClassArray:Classes[]=[];
    anotherLevelArray: Levels[]=[];

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
                        map(value => value ? typeof value === 'string' ? value : value.lev_name : ''),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

        

        this.Behavioral_statusDataService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true;
                this.behave_stat_id = this.Behavioral_statusDataService.behave_stat_id;
                this.behave_date = this.Behavioral_statusDataService.behave_date;
                this.behave_stat_rep = this.Behavioral_statusDataService.behave_stat_rep;
                
                this.StudentDataService.GetAlldepartment()
                .subscribe(data => this.anotherStuArray = data,
                    error => console.log(),
                    () => {
                        // Get Student Object 
                        var id = this.Behavioral_statusDataService.student_id;
                        this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
                
                            return el.student_id == id;
                        })];
                        
                        this.selectedStudent = this.studentVar;
                        
                        // Get Class Object with Student Object 
                        var class_id2 = this.studentVar.student_class_id;

                        this.ClassesDataService.GetAllClasses_with_id(class_id2)
                        .subscribe(data => this.anotherClassArray = data,
                            error => console.log(),
                        () => {
                            this.selectedclass = this.anotherClassArray[0];

                            // Get Level Object with Class Object 
                            var level_id = this.selectedclass.class_level;

                            this.LevelsDataService.GetAllLevels_with_id(level_id)
                            .subscribe(data => this.anotherLevelArray = data,
                                error => console.log(),
                                () => {
                                    this.selectedlevel = this.anotherLevelArray[this.anotherLevelArray.findIndex(function (el) {
                    
                                        return String(el.lev_id) == level_id;
                                    })];
                                });
                        });

                        var ele = document.getElementById('modalOpener');
                        if (ele) { ele.click() }


                    });

			});

	}
}
