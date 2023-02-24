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
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { IndividualCasesService } from '../../../../../Services/IndividualCasesService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-IndividualCases',
    templateUrl: './IndividualCasesComponent.html',
    changeDetection: ChangeDetectionStrategy.Default,

})
export class IndividualCasesComponent implements OnInit, AfterViewInit {
    public id: number;
    public level_id: string = "";
    public level_name: string = "";
    public class_id: string = "";
    public class_name: string = "";
    public student_id: string = "";
    public student_name: string = "";
    public def_id: string = "";
    public s_code: string = "";
    public case_type: string="";
    public date_of_file_opening: string = "";
    public transfer_procedures: string = "";
    public results: string = "";

    date_of_birth:string="";
    nationality:string="";
    
    
    level: Levels[];
    selectedlevel: any=[];

    class: Classes[];
    selectedclass: any=[];

    student: Student[];
    selectedStudent : any=[];

    slides:Definition[];
    selectedSlide:any=[];

    selected_student_id: any;
	selected_student_name: any;
    
    
    myControl = new FormControl('');
    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');
    form1: FormGroup;
    butDisabled: boolean;

    constructor(private modalService: NgbModal,
        private cdRef: ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
        public _fb: FormBuilder,
        private StudentDataService: StudentDataService,
        private LevelsDataService: LevelsDataService, 
        private ClassesDataService: ClassesDataService,
        private IndividualCasesService: IndividualCasesService,
        private DefinitionDataService: DefinitionDataService) {

            this.form1 = this._fb.group({
               
                date_of_birth:[[Validators.required]],
                nationality : [[Validators.required]],
                case_type : [[Validators.required]],
                date_of_file_opening : ['', [Validators.required]],
                transfer_procedures	: ['', [Validators.required]],
                results	: ['', [Validators.required]],
            });

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



    filteredOptions:  Observable<any[]>;

    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.slides.filter(option => option.def_name.toLowerCase().includes(filterValue));
    }

    displayFn(selectedoption) {
        return selectedoption ? selectedoption.def_name : undefined;
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
            this.class_id = event.class_id;
            this.Change_Student();
        }
    }

    Change_Student(){
        if(this.class_id !== null && this.class_id !== undefined && this.class_id !== ""){

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
        this.date_of_birth = this.selectedStudent.student_dob; 
    }

    ngAfterViewInit() {

    }

    AddIndividualCase(){
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        }else {

            var newIndividulCase= {
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id: Number(this.selectedStudent.student_id),
                student_name: this.selectedStudent.student_name,
                
                def_id:Number(this.selectedSlide.def_id),
                s_code:this.selectedSlide.def_name,

                case_type: this.case_type,

                date_of_file_opening : this.date_of_file_opening,

                transfer_procedures: this.transfer_procedures,
                results: this.results
            }

            this.IndividualCasesService.SaveIndividualCase(newIndividulCase).subscribe(res => {
                alert("Added Sucesfully");
                this.form1.reset();
                this.IndividualCasesService.BClicked("");
                this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
            })

        }
    }

    UpdateIndividualCase(){

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {

            var updatedIndividualCase = {
                id: Number(this.IndividualCasesService.id),
                level_id: Number(this.selectedlevel.lev_id),
                level_name: this.selectedlevel.lev_name,

                class_id : Number(this.selectedclass.class_id),
                class_name: this.selectedclass.class_name,

                student_id : Number(this.selectedStudent.student_id),
                student_name : this.selectedStudent.student_name,
                    
                def_id:Number(this.selectedSlide.def_id),
                s_code:this.selectedSlide.def_name,

                case_type: this.case_type,

                date_of_file_opening :this.date_of_file_opening,

                transfer_procedures: this.transfer_procedures,
                results: this.results
                
            }

            this.IndividualCasesService.UpdateIndividualCase(updatedIndividualCase)
            .subscribe(res => {
                    alert("Updated Sucessfully");
                    this.IndividualCasesService.BClicked("");
                    this.form1.reset();
                    this.myControlStudent.reset();
                    this.myControlclass.reset();
                    this.myControllev.reset();
            });
        }
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
   anotherDefArray: Definition[];

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

        this.DefinitionDataService.Getdefinations_with_scode("followUpSlides")
        .subscribe(data => this.slides = data,
            error => console.log(),
            () => {
                this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => value? typeof value === 'string' ? value : value.def_name : ''),
                    map(def_name => def_name ? this._filter(def_name) : this.slides.slice())
                );

        });

        this.IndividualCasesService.aClickedEvent
        .subscribe((data: string) => {
            if (Number(this.IndividualCasesService.id) != 0) {
                this.butDisabled = false;         
            }
    
            this.id = this.IndividualCasesService.id;
            this.level_name = this.IndividualCasesService.level_name;
            this.class_id = this.IndividualCasesService.class_id.toString();
            this.class_name = this.IndividualCasesService.class_name;
            this.student_id = this.IndividualCasesService.student_id.toString();
            this.student_name  = this.IndividualCasesService.student_name;
            this.def_id = this.IndividualCasesService.def_id.toString();
            this.s_code = this.IndividualCasesService.s_code;
            this.case_type = this.IndividualCasesService.case_type;
            this.date_of_file_opening = this.IndividualCasesService.date_of_file_opening;
            this.transfer_procedures = this.IndividualCasesService.transfer_procedures;
            this.results = this.IndividualCasesService.results;

            this.selectedSlide = this.IndividualCasesService.s_code;
            
            this.selected_student_id = this.IndividualCasesService.student_id;
			this.selected_student_name = this.IndividualCasesService.student_name;
        
            this.studentValue = this.IndividualCasesService.student_name;

					this.StudentDataService.GetAlldepartment()
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Student Object 
							var id = this.IndividualCasesService.student_id;
							this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
					
								return el.student_id == id;
							})];
                           
                            this.selectedStudent = this.studentVar;

							this.nationality = this.studentVar.student_nationality;
							this.date_of_birth =  this.studentVar.student_dob;


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
                                        
                                        // Get Slide Type Object
                                        this.DefinitionDataService.Getdefinations_with_scode("followUpSlides")
                                        .subscribe(data => this.anotherDefArray = data,
                                            error => console.log(),
                                            () => {
                                                var def_id =  this.IndividualCasesService.def_id
                                                this.selectedSlide = this.anotherDefArray[this.anotherDefArray.findIndex(function (el) {
                                                    return el.def_id == def_id;
                                                })];
                                            });

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
        this.cdRef.detectChanges();
    }
    onCloseHandled() {
        this.display = "";
    }

}