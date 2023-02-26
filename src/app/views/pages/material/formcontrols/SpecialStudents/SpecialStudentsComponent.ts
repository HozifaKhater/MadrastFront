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
import { SpecialStudentService } from '../../../../../Services/SpecialStudentService';
import { Departments, SideDepartmentMaster } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-SpecialStudents',
    templateUrl: './SpecialStudentsComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class SpecialStudentsComponent implements OnInit, AfterViewInit {
    public id: number;
    public level_id: string = "";
    public level_name: string = "";
    public class_id: string = "";
    public class_name: string = "";
    public student_id: string = "";
    public student_name: string = "";
    public dep_id: string="";
    public dep_name: string="";
    public sub_dep_id: string="";
    public sub_dep_name: string="";
    public excellence_manifestations: string="";
    public suggested_development: string="";
    public result: string="";    
    
    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

    student: Student[];
    selectedStudent : any;

    departments: Departments[];
    selectedDepartment: string="";
    allDepartments:any;

    selectedSideDepartment:string="";
    side_departments: Departments[];
    allSideDepartments:any;

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;

    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef, public _fb: FormBuilder,
        private ActivityDataService: ActivityDataService,
        private StudentDataService: StudentDataService,
        private LevelsDataService: LevelsDataService, 
        private ClassesDataService: ClassesDataService,
        private SpecialStudentService: SpecialStudentService,
        private DepartmentService: DepartmentDataService) {

            this.form1 = this._fb.group({
                suggested_development : [[Validators.required]],
                excellence_manifestations : [[Validators.required]],
                dep_name : [[Validators.required]],
                sub_dep_name : [[Validators.required]],
                result : [[Validators.required]],
            });

        this.DepartmentService.GetAllMasterdepartment().subscribe(data => this.departments = data,
            error => console.log(error),
            () => console.log("department Data ", this.departments));
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
        this.StudentDataService.GetAllStudent_of_class(this.class_id).subscribe(data => this.student = data,
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
    }


    get_side_dep() {
        this.dep_id = this.departments.find(e => e.dep_name == this.selectedDepartment).dep_id;
        console.log("dept id ", this.dep_id);
        this.DepartmentService.get_department_def_with_master_id(this.dep_id).subscribe(data => this.side_departments = data,
            error => console.log(error),
            () => console.log("side_departments", this.side_departments));
    }

    ngAfterViewInit() {

    }
   
    AddSpecialStudent(){
        if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        }else {
            var chck;
            
            if (this.butDisabled == true) {
                chck = Number(this.id);
                console.log("check  ", chck);
            };
            console.log("side dept,dep id ", this.selectedSideDepartment,
            this.side_departments.find(e => e.dep_name == this.selectedSideDepartment).dep_id);

            var newSpecialStudent= {
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,

                dep_id: Number(this.dep_id),
                dep_name: this.selectedDepartment,

                sub_dep_id: Number(this.side_departments.find(e => e.dep_name == this.selectedSideDepartment).dep_id),
                sub_dep_name: this.selectedSideDepartment ,

                excellence_manifestations: this.excellence_manifestations,
                suggested_development: this.suggested_development,
                result: this.result
            }

            console.log("new Special Student ", newSpecialStudent);

            this.SpecialStudentService.SaveSpecialStudent(newSpecialStudent).subscribe(res => {
                alert("Added Sucesfully");
                this.form1.reset();
                this.SpecialStudentService.BClicked("");
            })
        }
    }

    UpdateSpecialStudent(){

        var chck;

        if (this.butDisabled == false) {
           chck = Number(this.id);
           console.log("selected id ", chck );
        };

        var updatedSpecialStudent= {
            id: Number(chck),
            level_id: Number(this.selectedlevel.lev_id),
            level_name: this.selectedlevel.lev_name,

            class_id : Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,

            student_id: Number(this.selectedStudent.student_id),
            student_name: this.selectedStudent.student_name,
                
            dep_id: Number(this.dep_id),
            dep_name: this.selectedDepartment,

            sub_dep_id: Number(this.side_departments.find(e => e.dep_name == this.selectedSideDepartment).dep_id),
            sub_dep_name: this.selectedSideDepartment ,
        
            excellence_manifestations: this.excellence_manifestations,
            suggested_development: this.suggested_development,
            result: this.result       
       }

       console.log("updated Special Student", updatedSpecialStudent);

       this.SpecialStudentService.UpdateSpecialStudent(updatedSpecialStudent).subscribe(res => {
           alert("Updated Sucessfully");
           this.form1.reset();
           this.SpecialStudentService.BClicked("");

           this.is_edit=false;
       })
   }
   
  

   Cancle() {
       this.form1.reset();
       this.is_edit=false;
   }
   updatedClass:any;
   updatedStudent:any;
   is_edit:boolean=false;
    ngOnInit() {

        this.butDisabled = true;
      
        //(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
        //(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
        //(<HTMLInputElement>document.getElementById("reset_btn")).hidden = false;

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

        this.SpecialStudentService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.SpecialStudentService.id) != 0) {
                this.butDisabled = false;         
            }
    
            this.is_edit=true;
            //(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
            //(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
            //(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
            //(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
            //(<HTMLInputElement>document.getElementById("reset_btn")).hidden = true;
    
            this.id = this.SpecialStudentService.id;
            this.level_name = this.SpecialStudentService.level_name;
            this.class_id = this.SpecialStudentService.class_id.toString();
            this.class_name = this.SpecialStudentService.class_name;
            this.student_id = this.SpecialStudentService.student_id.toString();
            this.student_name  = this.SpecialStudentService.student_name;
            this.dep_id = this.SpecialStudentService.dep_id.toString();
            this.dep_name = this.SpecialStudentService.dep_name;
            
            this.sub_dep_id = this.SpecialStudentService.sub_dep_id.toString();
            this.sub_dep_name = this.SpecialStudentService.sub_dep_name;

            this.excellence_manifestations = this.SpecialStudentService.excellence_manifestations;
            this.suggested_development = this.SpecialStudentService.suggested_development;
            this.result = this.SpecialStudentService.result; 

            
            console.log("class id ", this.class_id);
            console.log("student id ", this.student_id);
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
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }
}