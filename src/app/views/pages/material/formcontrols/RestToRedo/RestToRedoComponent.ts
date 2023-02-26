import { Component,ChangeDetectorRef, OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
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
import { RestToRedoService } from '../../../../../Services/RestToRedoService';
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';


@Component({
    selector: 'kt-RestToRedo',
    templateUrl: './RestToRedoComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class RestToRedoComponent implements OnInit, AfterViewInit {
    public id: number;
    public level_id: string = "";
    public level_name: string = "";
    public class_id: string = "";
    public class_name: string = "";
    public student_id: string = "";
    public student_name: string = "";
    public def_id: string = "";
    public s_code: string = "";
    public date_of_file_opening: string = "";
    public reasons: string = "";
    public results: string = "";

    student_age_day:string="";
    student_age_month:string="";
    student_age_year:string = "";
    date_of_birth:string="";
    nationality:string="";
    
    phone_no:string="";
    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

    student: Student[];
    selectedStudent : any;

    slides:Definition[];
    allSlides:any;
    selectedSlide:string="";

    selected_student_id: any;
	selected_student_name: any;
    
    is_edit:boolean=false;

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;

    constructor(
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private ActivityDataService: ActivityDataService,
        private StudentDataService: StudentDataService,
        private LevelsDataService: LevelsDataService, 
        private ClassesDataService: ClassesDataService,
        private RestToRedoService: RestToRedoService,
        private DefinitionDataService: DefinitionDataService) {

            this.form1 = this._fb.group({
                student_age_day:[[Validators.required]],
                student_age_month : [[Validators.required]],
                student_age_year:[[Validators.required]],
                date_of_birth:[[Validators.required]],
                nationality : [[Validators.required]],
                s_code	: [[Validators.required]],
                date_of_file_opening	: [[Validators.required]],
                reasons	: ['', [Validators.required]],
                results	: ['', [Validators.required]],
            });
       
        this.DefinitionDataService.Getdefinations_with_scode("followUpSlides")
        .subscribe(data => this.slides = data,
            error => console.log());
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
                            map(value => value? typeof value === 'string' ? value : value.class_name : ''),
                            map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                        );
                });
        }
    }

    change_class(event) {
        if(event !== null && event !== undefined && event.length !== 0){

            this.ActivityDataService.activity_id = event.class_id;
            this.ActivityDataService.BClicked("test");
            this.class_id = event.class_id;
            this.Change_Student();
        }
    }

    Change_Student(){
        if(this.class_id !== null && this.class_id !== undefined){

            this.StudentDataService.GetAllStudent_of_class(Number(this.class_id)).subscribe(data => this.student = data,
                error => console.log(),
                () => {
                    
                    this.filteredOptionsStudents = this.myControlStudent.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => typeof value === 'string' ? value : value.student_name),
                            map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
                        );
                });

                if(this.selectedStudent !== null && this.selectedStudent !== undefined){

                    this.setData();
                }
        }

    }

  
    setData(){
        this.nationality = this.selectedStudent.student_nationality;
        this.date_of_birth = this.selectedStudent.student_dob;
        this.student_age_day = this.selectedStudent.student_age_day;
        this.student_age_month = this.selectedStudent.student_age_month;
        this.student_age_year = this.selectedStudent.student_age_year;  
        
        this.RestToRedoService.student_id = this.selectedStudent.student_id;
        this.RestToRedoService.student_name = this.selectedStudent.student_name;
    }

    ngAfterViewInit() {

    }

    AddRestToRedo(){
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        }else {
            
            var newRestToRedo = {
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                
                def_id:this.slides.find(e => e.def_name == this.selectedSlide).def_id,
                s_code:this.selectedSlide,

                date_of_file_opening : this.date_of_file_opening,

                reasons: this.reasons,
                results: this.results
            }


            this.RestToRedoService.SaveRestToRedo(newRestToRedo).subscribe(res => {
                alert("Added Sucesfully ");
                this.RestToRedoService.BClicked("");
                this.form1.reset();
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
            })

        }
    }

    UpdateRetToRedo(){

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {

            var updatedRestToRedo = {
                id:  Number(this.RestToRedoService.id),
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                    
                def_id:this.slides.find(e => e.def_name == this.selectedSlide).def_id,
                s_code:this.selectedSlide,

                date_of_file_opening :this.date_of_file_opening,

                reasons: this.reasons,
                results: this.results
                
            }

            this.RestToRedoService.UpdateRestToRedo(updatedRestToRedo).subscribe(res => {
                alert("Updated Sucessfully");
                this.RestToRedoService.BClicked("");
                this.form1.reset();
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
                this.is_edit=false;
               
            });
        }
   }
   
  

   Cancle() {
       this.form1.reset();
       this.is_edit=false;

   }

   updatedClass:any;
   updatedStudent:any;

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

        this.butDisabled = true;
        

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

                
        this.RestToRedoService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.RestToRedoService.id) != 0) {
                this.butDisabled = false;         
            }
    
             this.is_edit=true
    
            this.id = this.RestToRedoService.id;
            this.level_name = this.RestToRedoService.level_name;
            this.class_id = this.RestToRedoService.class_id.toString();
            this.class_name = this.RestToRedoService.class_name;
            this.student_id = this.RestToRedoService.student_id.toString();
            this.student_name  = this.RestToRedoService.student_name;
            this.def_id = this.RestToRedoService.def_id.toString();
            this.s_code = this.RestToRedoService.s_code;
            this.date_of_file_opening = this.RestToRedoService.date_of_file_opening;
            this.reasons = this.RestToRedoService.reasons;
            this.results = this.RestToRedoService.results;
            
            this.selectedSlide = this.RestToRedoService.s_code;

            this.selected_student_id = this.RestToRedoService.student_id;
            this.selected_student_name = this.RestToRedoService.student_name;
    
           // this.studentValue = this.RestToRedoService.student_name;

                this.StudentDataService.GetAlldepartment()
                .subscribe(data => this.anotherStuArray = data,
                    error => console.log(),
                    () => {
                        // Get Student Object 
                        var id = this.RestToRedoService.student_id;
                        this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
                
                            return el.student_id == id;
                        })];
                        this.selectedStudent = this.studentVar;

                        this.nationality = this.studentVar.student_nationality;
                        this.phone_no = this.studentVar.mother_phone;
                        this.date_of_birth =  this.studentVar.student_dob;
                        
                        this.student_age_day = this.studentVar.student_age_day;
                        this.student_age_month = this.studentVar.student_age_month;
                        this.student_age_year = this.studentVar.student_age_year; 
                        
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
                    });		
        });

        
    }
}