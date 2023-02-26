import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input, ViewEncapsulation} from '@angular/core';
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
import { calling_parentsDataService } from '../../../../../Services/calling_parentsDataService';
import { calling_parentsMaster, calling_parents } from '../../../../../calling_parentsMaster.Model';
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
    selector: 'kt-calling_parents',
    templateUrl: './calling_parent.component.html',
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
export class calling_parentsComponent implements OnInit {
 
	@Input() employee_data: any;
    behave_stat_id: number;
    ser: string = "";
    date: string = "";
    lev_name: string = "";
    lev_id: string = "";
    class_name: string = "";
    class_id: string = "";
    meeting_date: string = "";
    student_name: string = "";
    student_id: string = "";
    meeting_side_name: string = "";
    meeting_side_id: string = "";
    

    behave_date:any;
    cancel_behav(){this.is_edit=false;}

behave_stat_rep:any;

	departments: DepartmentMaster[];
    side_departments: SideDepartmentMaster[];
    jobs: DepartmentMaster[];
    level: Levels[];
    class: Classes[];
    student: Student[];
    viols: def.viols[];
    viols_proced: def.viols_proced[];

    form1: FormGroup;

    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private LevelsDataService: LevelsDataService,
        private ClassesDataService: ClassesDataService,
        private StudentDataService: StudentDataService,
        private calling_parentsDataService: calling_parentsDataService,
        private EmployeeService: EmployeeDataService
       ) {
        this.form1 = this._fb.group({
            
        });
		
    }
  
  
    todate: any;
 
    selectedviol: any;
    selectedproced: any;


	matcher = new MyErrorStateMatcher();
	value = 'Clear me';
    add_behav() {
            var val = {
                date: this.date,
                lev_name: this.selectedlevel.lev_name,
                lev_id: this.selectedlevel.lev_id,
                class_name: this.selectedclass.class_name,
                class_id: this.selectedclass.class_id,
                meeting_date: this.meeting_date,
                student_name: this.selectedstudent.student_name,
                student_id: this.selectedstudent.student_id,
                meeting_side_name: this.meeting_side_name,
                meeting_side_id: Number(this.meeting_side_id),
            };
            this.calling_parentsDataService.save_in_calling_parents(val).subscribe(res => {
               
                alert("saved succesfully");
                this.calling_parentsDataService.BClicked("b2");

            })


      
	}

    update_behav() {
		
        var val = {
            ser: Number(this.calling_parentsDataService.ser),
            date: this.date,
            lev_name: this.lev_name,
            lev_id: this.lev_id,
            class_name: this.class_name,
            class_id: this.class_id,
            meeting_date: this.meeting_date,
            student_name: this.selectedstudent.student_name,
            student_id: this.selectedstudent.student_id,
            meeting_side_name: this.meeting_side_name,
            meeting_side_id:  Number(this.meeting_side_id),
            
		};
        this.calling_parentsDataService.update_calling_parents(val).subscribe(res => {
           
            alert("Updated Successfully");
            this.calling_parentsDataService.BClicked("b2");
            this.is_edit=false;
		})

	}
    is_edit:boolean=false;

    selectedclass: any=[];
    selectedstudent: any=[];
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
                    var selected_class_status = String(this.calling_parentsDataService.class_id);
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
                error => console.log(error),
                () => {
                    var selected_student_status = String(this.calling_parentsDataService.student_id);
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

    classValue: any;
    levelValue:any;
    studentValue:any;
    studentVar:any;
    classVar:any;
    anotherStuArray:Student[];
    anotherClassArray:Classes[];
    anotherLevelArray: Levels[];
 
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


        this.calling_parentsDataService.aClickedEvent
			.subscribe((data: string) => {
                this.is_edit=true;
                this.ser = this.calling_parentsDataService.ser;
                this.date = this.calling_parentsDataService.date;
                this.lev_name = this.calling_parentsDataService.lev_name;
                this.lev_id = this.calling_parentsDataService.lev_id;
                this.class_name = this.calling_parentsDataService.class_name;
                this.class_id = this.calling_parentsDataService.class_id;
                this.meeting_date = this.calling_parentsDataService.meeting_date;
                this.student_name = this.calling_parentsDataService.student_name;
                this.student_id = this.calling_parentsDataService.student_id;
                this.meeting_side_name = this.calling_parentsDataService.meeting_side_name;
                this.meeting_side_id = this.calling_parentsDataService.meeting_side_id;
                
                // Get Student Object 

                var std_id = this.calling_parentsDataService.student_id;

                this.StudentDataService.GetAllstudents_with_id(Number(std_id))
                .subscribe(data => this.anotherStuArray = data,
                    error => console.log(),
                    () => {
                        
                        this.selectedstudent = this.anotherStuArray[0];
                       
                        // Get Class Object with Student Object 
                        var class_id2 = this.calling_parentsDataService.class_id;

                        this.ClassesDataService.GetAllClasses_with_id(class_id2)
                        .subscribe(data => this.anotherClassArray = data,
                            error => console.log(),
                        () => {
                            this.selectedclass = this.anotherClassArray[0];

                            // Get Level Object with Class Object 
                            var level_id = this.calling_parentsDataService.lev_id;

                            this.LevelsDataService.GetAllLevels_with_id(level_id)
                            .subscribe(data => this.anotherLevelArray = data,
                                error => console.log(),
                                () => {
                                    this.selectedlevel = this.anotherLevelArray[this.anotherLevelArray.findIndex(function (el) {
                    
                                        return String(el.lev_id) == level_id;
                                    })];
                                });
                        });
                    });

                
                // open modal
                var ele = document.getElementById('modalOpener');
                if (ele) { ele.click() }
			});
		
       

    }

    display = "";
    openModal(content: any, event: any) {

        this.modalService.open(content, { backdrop: true, size: "xl", });
    }
    openModal1() {
        this.display = "show";
        console.log("clicked")
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }

}
