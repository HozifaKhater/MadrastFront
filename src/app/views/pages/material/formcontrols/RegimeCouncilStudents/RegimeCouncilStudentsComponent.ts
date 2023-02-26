import { Component, ChangeDetectorRef,OnInit, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
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
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { RegimeCouncilStudentService } from '../../../../../Services/RegimeCouncilStudentService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';


@Component({
    selector: 'kt-RegimeCouncilStudents',
    templateUrl: './RegimeCouncilStudentsComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class RegimeCouncilStudentsComponent implements OnInit, AfterViewInit {
    public id: number;
    public level_id: string = "";
    public level_name: string = "";
    public class_id: string = "";
    public class_name: string = "";
    public student_id: string = "";
    public student_name: string = "";
    public def_id: string = "";
    public s_code: string = "";
    public date: string="";

    nationality:string="";
    
    is_edit:boolean=false;

    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

    student: Student[];
    selectedStudent : any;

    slides:Definition[];
    allSlides:any;
    selectedSlide:string="";

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
        private RegimeCouncilStudentService: RegimeCouncilStudentService,
        private DefinitionDataService: DefinitionDataService) {

            this.form1 = this._fb.group({
                nationality : [[Validators.required]],
                s_code	: [[Validators.required]],
                date : ['', [Validators.required]],
            });
       
        this.DefinitionDataService.GetSituationTypes().subscribe((data:any) => this.slides = data.data,
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

        this.StudentDataService.GetAllStudent_of_class(this.class_id).subscribe(data => this.student = data,
            error => console.log(),
            () => {
                
                this.filteredOptionsStudents = this.myControlStudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.student_name : ''),
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
    }

    ngAfterViewInit() {

    }

    AddRegimeCouncilStudent(){
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.id);
            };

            var newRegimeCouncilStudent= {
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                
                def_id:this.slides.find(e => e.def_name == this.selectedSlide).def_id,
                s_code:this.selectedSlide,

                date : (<HTMLInputElement>document.getElementById("date")).value,

            }

            this.RegimeCouncilStudentService.SaveRegimeCouncilStudent(newRegimeCouncilStudent).subscribe(res => {
                alert("Added Sucesfully");
                this.form1.reset();
                this.RegimeCouncilStudentService.BClicked("");
                
            })

        }
    }

    UpdateRegimeCouncilStudent(){

        var chck;

        if (this.butDisabled == false) {
           chck = Number(this.id);
        };

        var updatedRegimeCouncilStudent = {
            id: Number(chck),
            level_id: Number(this.selectedlevel.lev_id),
            level_name: this.selectedlevel.lev_name,

            class_id : Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,

            student_id: Number(this.selectedStudent.student_id),
            student_name: this.selectedStudent.student_name,
                
            def_id:this.slides.find(e => e.def_name == this.selectedSlide).def_id,
            s_code:this.selectedSlide,

            date :this.date,        
       }

       this.RegimeCouncilStudentService.UpdateRegimeCouncilStudent(updatedRegimeCouncilStudent).subscribe(res => {
           alert("Updated Sucessfully ");
           this.form1.reset();
           this.RegimeCouncilStudentService.BClicked("");
           this.is_edit=false;

       })
   }
   
  

   Cancle() {
       this.form1.reset();
       this.is_edit=false;

   }
   updatedClass:any;
   updatedStudent:any;

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
                        map(value => typeof value === 'string' ? value : value.lev_name),
                        map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
                    );
        });

        this.RegimeCouncilStudentService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.RegimeCouncilStudentService.id) != 0) {
                this.butDisabled = false;         
            }
            this.is_edit=true

            this.id = this.RegimeCouncilStudentService.id;
            this.level_name = this.RegimeCouncilStudentService.level_name;
            this.class_id = this.RegimeCouncilStudentService.class_id.toString();
            this.class_name = this.RegimeCouncilStudentService.class_name;
            this.student_id = this.RegimeCouncilStudentService.student_id.toString();
            this.student_name  = this.RegimeCouncilStudentService.student_name;
            this.def_id = this.RegimeCouncilStudentService.def_id.toString();
            this.s_code = this.RegimeCouncilStudentService.s_code;
            this.selectedSlide = this.s_code;
            this.date = this.RegimeCouncilStudentService.date;

            
            //this.student_age_day = this.scodes.find(e => e.s_code_arabic == this.selected).s_code,
           
            /*
            this.StudentDataService.GetAllstudents_with_id(this.student_id).subscribe(data => this.updatedStudent = data,
            error => console.log(error),
            () => {console.log("student updated Data ", this.updatedStudent)});

            this.ClassesDataService.GetAllClasses_with_id(this.class_id).subscribe(data => this.updatedClass = data,
            error => console.log(error),
            () => {console.log("class updated Data ", this.updatedClass)});

            this.nationality = this.updatedStudent.student_nationality;
            this.student_age_day = this.updatedStudent.student_age_day;
            this.student_age_month = this.updatedStudent.student_age_month;
            this.student_age_year = this.updatedStudent.student_age_year;

            console.log("ddd  ", this.nationality,this.student_age_day,this.student_age_month);

            //this.change_class(this.updatedClass);
           // this.Change_Student();

            this.selectedStudent = this.updatedStudent;
            this.selectedclass = this.updatedClass; 

                */
    
        });

    }
}