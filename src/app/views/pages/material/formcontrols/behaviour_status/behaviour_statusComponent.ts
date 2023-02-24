import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { StudentDataService } from '../../../../../Services/studentDataService';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Levels } from '../../../../../LevelsMaster.Model';
import { Classes } from '../../../../../ClassesMaster.Model';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { Student } from '../../../../../StudentMaster.Model';
import { behaviours_statusDataService } from '../../../../../Services/behaviours_statusDataService';
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-behaviours_status',
    templateUrl: './behaviour_statusComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class behaviours_statusComponent implements OnInit, AfterViewInit {
    public id: number;
    public level_id: string = "";
    public level_name: string = "";
    public class_id: string = "";
    public class_name: string = "";
    public student_id: string = "";
    public student_name: string = "";
    public def_id: string = "";
    public s_code: string = "";
    public status_type: string = "";
    public notes: string = "";
    public reasons: string = "";

    student_age_day:string="";
    student_age_month:string="";
    student_age_year:string = "";
    date_of_birth:string="";
    nationality:string="";
    
    phone_no:string="";

    level: Levels[];
    selectedlevel: any=[];

    class: Classes[];
    selectedclass: any=[];

    student: Student[];
    selectedStudent : any=[];

    slides:Definition[];
    allSlides:any;
    selectedSlide:string="";

    selected_student_id: any;
	selected_student_name: any;
    

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;

    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private ActivityDataService: ActivityDataService,
        private StudentDataService: StudentDataService,
        private LevelsDataService: LevelsDataService, 
        private ClassesDataService: ClassesDataService,
        private behaviours_statusDataService: behaviours_statusDataService,
        private DefinitionDataService: DefinitionDataService) {

            this.form1 = this._fb.group({
                date_of_birth:[[Validators.required]],
                nationality : [[Validators.required]],
                reasons	: ['', [Validators.required]],
                notes	: ['', [Validators.required]],
                phone_no: [[Validators.required]],
                status_type: [[Validators.required]],
            });
       
    } 

  
    ngAfterViewInit() {

    }

    returned_id:any;


    Add(){

        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {

            var newbehaviours_status = {
                status_type	: this.status_type,
                notes	: this.notes,
                reasons	: this.reasons,
                lev_id	:this.selectedlevel.lev_id.toString(),
                class_id	: this.selectedclass.class_id.toString(),
                student_id	:this.selectedStudent.student_id.toString(),
                behaviours_status: "rr",
                
            }

            console.log(" new behaviours_status", newbehaviours_status);

            this.behaviours_statusDataService.save_in_behaviours_status(newbehaviours_status)
            .subscribe(res => {
               // this.returned_id = res['data'][0].Column1;
                console.log("  returned_id", res);

               
                    for (let i = 0; i < this.behaviours_statusDataService.details.length-1; i++) {
                        var details = {
                            behaviour_status_id: this.returned_id,
                            student_id: String(this.selectedStudent.student_id),
                            another_situations: this.behaviours_statusDataService.details[i].another_situations,
                            date: this.behaviours_statusDataService.details[i].date,
                            efforts: this.behaviours_statusDataService.details[i].efforts,
                            end_year_situation: this.behaviours_statusDataService.details[i].end_year_situation
                            
                        }
                        this.behaviours_statusDataService.save_in_behaviours_status_details(details)
                        .subscribe(res => {
                            console.log("details", details);
    
                        })
                    }
                
                
                alert("Added Sucesfully");
                this.behaviours_statusDataService.BClicked("b2");
                this.form1.reset();
                this.myControlStudent.reset();
                this.myControlclass.reset();
                this.myControllev.reset();
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
                
            });

            
            
            

        }
    }

    Update(){

        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {

            var updatedbehaviours_status = {
                id	: this.id.toString()	,
                status_type	: this.status_type	,
                notes	: this.notes	,
                reasons	: this.reasons	,
                lev_id	: this.selectedlevel.lev_id.toString()	,
                class_id	: this.selectedclass.class_id.toString()	,
                student_id	: this.selectedStudent.student_id.toString()	,
            }

            console.log("updated behaviours_status   ", updatedbehaviours_status);

            this.behaviours_statusDataService.update_behaviours_status(updatedbehaviours_status)
            .subscribe(res => {
                alert("Updated Sucessfully ");
                this.behaviours_statusDataService.BClicked("b2");
                this.form1.reset();
                this.myControlStudent.reset();
                this.myControlclass.reset();
                this.myControllev.reset();
                (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
                (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
                (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
                (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
            });
        }   
    }
   
  

   Cancle() {
        this.form1.reset();
        this.myControlStudent.reset();
        this.myControlclass.reset();
        this.myControllev.reset();
        (<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
        (<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
   }
   updatedClass:any;
   updatedStudent:any;
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
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
                console.log("class dropdown", this.class);
                this.filteredOptionsclass = this.myControlclass.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.class_name),
                        map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                    );
            });
    }

    change_class(event) {
        this.ActivityDataService.activity_id = event.class_id;
        this.ActivityDataService.BClicked("test");
        this.class_id = event.class_id;
        console.log(" class id",  event.class_id);
        this.Change_Student();
    }
    Change_Student(){
        this.StudentDataService.GetAllStudent_of_class(Number(this.class_id)).subscribe(data => this.student = data,
            error => console.log(error),
            () => {
                console.log("student dropdown", this.student);
                
                this.filteredOptionsStudents = this.myControlStudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.student_name),
                        map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
                    );
            });

            
        console.log("selected student", this.selectedStudent);
        this.setData();

    }

    setData(){
        this.nationality = this.selectedStudent.student_nationality;
        this.date_of_birth = this.selectedStudent.student_dob;  
        this.phone_no = this.selectedStudent.phone;
    }

    classValue: any;
    levelValue:any;
    studentValue:any;
    studentVar:any;
    classVar:any;
    anotherStuArray:Student[];
    anotherClassArray:Classes[];
    anotherLevelArray: Levels[];
 
    priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			});
       
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

        this.butDisabled = true;
        

        this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
            error => console.log(error),
            () => {
                console.log("levels dropdown", this.level);
                this.filteredOptionslev = this.myControllev.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
        });

        this.behaviours_statusDataService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.behaviours_statusDataService.id) != 0) {
                this.butDisabled = false;         
            }
    
            //(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
            //(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
            //(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
            //(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
            //(<HTMLInputElement>document.getElementById("reset_btn")).hidden = true;
    
            this.id = Number(this.behaviours_statusDataService.id);
            this.class_id = this.behaviours_statusDataService.class_id;
            this.student_id = this.behaviours_statusDataService.student_id;
            this.reasons = this.behaviours_statusDataService.reasons;
            this.notes = this.behaviours_statusDataService.notes;
            this.status_type = this.behaviours_statusDataService.status_type;
            this.level_id = this.behaviours_statusDataService.lev_id;
            
            this.selected_student_id = this.behaviours_statusDataService.student_id;
    
                this.StudentDataService.GetAlldepartment()
                .subscribe(data => this.anotherStuArray = data,
                    error => console.log(error),
                    () => {
                        // Get Student Object 
                        console.log("stu dropdown", this.anotherStuArray)
                        var id = this.behaviours_statusDataService.student_id;
                        console.log("id",id);
                        this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
                
                            return el.student_id == Number(id);
                        })];
                        console.log("studentVar",this.studentVar)
                        this.selectedStudent = this.studentVar;

                        this.nationality = this.studentVar.student_nationality;
                        this.phone_no = this.studentVar.mother_phone;
                        this.date_of_birth =  this.studentVar.student_dob;
                        
                        // Get Class Object with Student Object 
                        var class_id2 = this.studentVar.student_class_id;

                        this.ClassesDataService.GetAllClasses_with_id(class_id2)
                        .subscribe(data => this.anotherClassArray = data,
                            error => console.log(error),
                        () => {
                            console.log("anotherClassArray ", this.anotherClassArray)
                            this.selectedclass = this.anotherClassArray[0];
                            console.log("selectedclass ", this.selectedclass)

                            // Get Level Object with Class Object 
                            var level_id = this.selectedclass.class_level;

                            this.LevelsDataService.GetAllLevels_with_id(level_id)
                            .subscribe(data => this.anotherLevelArray = data,
                                error => console.log(error),
                                () => {
                                    console.log("anotherLevelArray", this.anotherLevelArray);
                                    this.selectedlevel = this.anotherLevelArray[this.anotherLevelArray.findIndex(function (el) {
                    
                                        return String(el.lev_id) == level_id;
                                    })];
                                    console.log("selectedlevel ", this.selectedlevel)
                                });
                        });
                    });		

                
            // open modal
            var ele = document.getElementById('modalOpener');
            if (ele) { ele.click() }

        });
        (<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        (<HTMLInputElement>document.getElementById("reset_btn")).hidden = false;

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