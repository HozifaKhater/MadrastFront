import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
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
import { enzratDataService } from '../../../../../Services/enzratDataService';
import { corridorsDataService } from '../../../../../Services/CorridorsDataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CorridorsMaster, corridor } from '../../../../../CorridorsMaster.Model';
import { Student_leaveMaster, Student_leave } from '../../../../../Student_leaveMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import moment from 'moment';
import { Observable } from 'rxjs'; 
import { FormArray, FormBuilder,  FormGroup} from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
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
    selector: 'kt-enzarat',
    templateUrl: './enzarat.component.html',
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
export class EnzaratComponent implements OnInit {
 
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
    is_edit:boolean=false;
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

    form1: FormGroup;
    selected_level: any;
    selected_class: any;
    selected_student: any;

    selectedcorridor:any;
    selectedalert:any;


    constructor(
        private router: Router, private user_privDataService: user_privDataService,
        private cdRef: ChangeDetectorRef,
        private modalService: NgbModal,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private enzratDataService: enzratDataService,
        private School_dataDataService: School_dataDataService,
        private EmployeeService: EmployeeDataService,
        private corridorsDataService: corridorsDataService
    ) {
        this.form1 = this._fb.group({
            selectedcorridor: [''],
            selectedalert: ['', [Validators.required]]
        });

        EmployeeService.Getdefinations_with_scode("alert_type").subscribe(data => this.alert_type = data,
            error => console.log());

        this.corridorsDataService.GetAllCorridors().subscribe(data => this.corridors = data,
            error => console.log());
    }

openModal(content: any, event: any){
this.modalService.open(content,{backdrop:true,size:"xl",});
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

        this.checked_radio = evt.target.value
    }

  
    todate: any;
 
    selectedviol: any;
    selectedproced: any;


	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
        is_sent:any=0;
        is_sent_chck_change(event) {
		
		if (event.checked == true) {
			this.is_sent = 1;
		}
		if (event.checked === false) {
			this.is_sent = 0;
		}
	}
    add_student_leave() {
		
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            
        var val = {
            ser:0,
            level_id: this.selectedlevel.lev_id,
            class_id:  this.selectedclass.class_id,
            alert_type:  this.alert_type,
            student_id:  this.selectedstudent.student_id,
            is_sent:0,
            

            };
            this.enzratDataService.save_in_enzrat(val).subscribe(res => {
               
                alert("Saved Succesfully");
                this.enzratDataService.BClicked("b2");
                this.form1.reset();
            })

        }
      
	}

    update_student_leave() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
        var val = {
            ser:this.enzratDataService.ser,
            
            level_id: this.selectedlevel.lev_id,
            class_id:  this.selectedclass.class_id,
            alert_type:  this.alert_type,
            student_id:  this.selectedstudent.student_id,
            is_sent:  this.is_sent,
            

		};

      

            this.enzratDataService.update_enzrat(val).subscribe(res => {
           
            alert("Updated Successfully");
                this.enzratDataService.BClicked("b2");
                this.is_edit=false;
			
		
        })
            this.form1.reset();
        }
	}
   
    cancel_observ(){}
	
    selectedclass: any =[];
    selectedstudent: any =[];
    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlstudent = new FormControl('');
    selectedlevel: any =[];

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
                    if (this.enzratDataService.class_id || this.enzratDataService.class_id != ""){
                    var selected_class_status = String(this.enzratDataService.class_id);
                    this.selectedclass = this.class[this.class.findIndex(function (el) {

                        return String(el.class_id) == selected_class_status;
                    })];
                }
                    this.filteredOptionsclass = this.myControlclass.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => value? typeof value === 'string' ? value : value.class_name :''),
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
                    if (this.enzratDataService.student_id || this.enzratDataService.student_id != ""){
                    var selected_student_status = String(this.enzratDataService.student_id);
                    this.selectedstudent = this.student[this.student.findIndex(function (el) {

                        return String(el.student_id) == selected_student_status;
                    })];
                }
                    this.filteredOptionsstudent = this.myControlstudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => typeof value === 'string' ? value : value.student_name),
                            map(student_name => student_name ? this._filterstudent(student_name) : this.student.slice())
                        );
                });
        }
    }


 

	priv_info:any=[];
    is_sent_check:boolean=false;
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
                        map(value => value? typeof value === 'string' ? value : value.lev_name :''),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
            });

		

        this.enzratDataService.aClickedEvent
			.subscribe((data: string) => {
				

                this.is_edit=true;
                this.alert_type = this.alert_type;

                this.is_sent = this.is_sent;


          

                var selected_level_status = String(this.enzratDataService.level_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {

                    return String(el.lev_id) == selected_level_status;
                })];
if (this.enzratDataService.is_sent == '0'){
    this.is_sent_check=true
}
else 
{
    this.is_sent_check=false
}


          
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }
     

			});
		

	}
}
