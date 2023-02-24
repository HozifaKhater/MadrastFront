import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { Failure_casesDataService } from '../../../../../Services/Failure_casesDataService';

import { Failure_casesMaster, Failure_cases } from '../../../../../Failure_casesMaster.Model';

import { student_basic_dataDataService } from '../../../../../Services/student_basic_dataDataService';

import { student_basic_data,student_basic_dataMaster} from '../../../../../student_basic_dataMaster .Model';

import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import * as def from '../../../../../definationsMaster.Model';
import { PageEvent } from '@angular/material';
import moment from 'moment';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';

import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { Definition } from '../../../../../Definitions.Model';
import { DefinitionDataService } from '../../../../../Services/Definition';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'kt-student_basic_data',
    templateUrl: './student_basic_data.component.html'
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class student_basic_dataComponent implements OnInit {
	@Input() failure_data: any;

	fail_id: number;
	fail_lev: string = "";
	fail_class: string = "";
	fail_student: string = "";
	fail_nation: string = "";
	fail_mob: string = "";
	fail_birth: string = "";
	fail_date: string = "";
	fail_desc: string = "";
	fail_reason: string = "";
	fail_sub: string = "";
	fail_1: string = "";
	fail_2: string = "";
	fail_3: string = "";
    fail_4: string = "";
    selectednation: any;
    emp_age_day: any;
    emp_age_month: any;
    emp_age_year: any;
	fail_end_year: string = "";
	fail_sit: string = "";
	fail_eff_date: string = "";
	fail_eff_results: string = "";
	fail_recomm: string = "";
    ser: string = "";
    student_id: string = "";
    student_name: string = "";
    previous_school: string = "";
    address: string = "";
    //transition_between_schools: string = "";
    foreign_schools: string = "";
    student_history_notes: string = "";
    health_status: string = "";

    level: Levels[];
    selectedlevel: any;

    class: Classes[];
    selectedclass: any;

	student: Student[];
    selectedStudent : any;

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

	levelValue: string="";
	classValue: string="";
	studentValue: string="";

	nationality:string="";
    phone: string="";
	student_dob:any;

	selected: string;
    scodes: Definition[];
    selectedCode: any;

	subjects: Subjects[];
	selected_student_id: any;
	selected_student_name: any;
	nat: def.nat[];
	selectedsubject: any;

	exampleBasic;
	exampleConfig;

	length = 100;
	pageSize = 10;
	pageSizeOptions = [5, 10, 25, 100];

	// MatPaginator Output
	pageEvent: PageEvent;
	selectedsubject24:any;
	transition_between_schools1:any;
	transition_between_schools2:any;
	transition_between_schools3:any;
	transition_between_schools4:any;
	transition_between_schools5:any;
	transition_between_schools6:any;
	transition_between_schools7:any;
	transition_between_schools8:any;
	transition_between_schools9:any;
	transition_between_schools10:any;
	transition_between_schools11:any;
	transition_between_schools12:any;
	selectedsubject1:any;
	selectedsubject2:any;
	selectedsubject3:any;
	selectedsubject4:any;
	selectedsubject5:any;
	selectedsubject6:any;
	selectedsubject7:any;
	selectedsubject8:any;
	selectedsubject9:any;
	selectedsubject10:any;
	
	selectedsubject11:any;
	selectedsubject12:any;
	selectedsubject13:any;
	selectedsubject14:any;
	selectedsubject15:any;
	selectedsubject16:any;
	selectedsubject17:any;
	selectedsubject18:any;
	selectedsubject19:any;
	selectedsubject20:any;
	selectedsubject21:any;
	selectedsubject22:any;
	selectedsubject23:any;
	slectedsubject24:any;
	form1: FormGroup;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef, private router: Router, private user_privDataService: user_privDataService,
		private ActivityDataService: ActivityDataService, 
		private DefinitionService: DefinitionDataService,
		private student_basic_dataDataService:student_basic_dataDataService,private SubjectDataService: SubjectDataService, private Failure_casesDataService: Failure_casesDataService, private LevelsDataService: LevelsDataService, private StudentDataService: StudentDataService, private ClassesDataService: ClassesDataService, private EmployeeService: EmployeeDataService, public _fb: FormBuilder) {
		this.LevelsDataService.GetAllLevels().subscribe(data => this.level = data,
			error => console.log(error),
			() => console.log("emp dropdown", this.level));
		this.ClassesDataService.GetAllClasses().subscribe(data => this.class = data,
			error => console.log(error),
			() => console.log("emp dropdown", this.class));
		this.StudentDataService.GetAlldepartment().subscribe(data => this.student = data,
			error => console.log(error),
			() => console.log("emp dropdown", this.student));
		this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
			error => console.log(error),
			() => { console.log("department dropdown") });

		this.form1 = this._fb.group({
			fail_nation : [[Validators.required]],
			fail_mob: ['', [Validators.required]],
			fail_birth: ['', [Validators.required]],
			fail_date: ['', [Validators.required]],
            fail_desc: ['', [Validators.required]], 
            previous_school: ['', [Validators.required]],
            foreign_schools: ['', [Validators.required]],
            transition_between_schools: ['', [Validators.required]],
            student_history_notes: ['', [Validators.required]],
            address: ['', [Validators.required]],
			selectedsubject: ['', [Validators.required]]
			
		});

		EmployeeService.Getdefinations_with_scode("nat").subscribe(data => this.nat = data,
			error => console.log(error),
			() => console.log("ok"));

		this.DefinitionService.Getdefinations_with_scode("nat")
			.subscribe(data => this.scodes = data,
			error => console.log(error),
			() => { console.log("scodes dropdown", this.scodes) });
	}

	selects = [];
	transition_between_schools :string="";
	add_failure() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]

		var val = {
			student_id: Number(this.selectedStudent.student_id),
			student_name	: this.selectedStudent.student_name,
			previous_school	: this.previous_school,
			address	: this.address,
			transition_between_schools	: this.transition_between_schools,
			foreign_schools	: this.foreign_schools,
			student_history_notes	: this.student_history_notes,
			health_status	: this.health_status,
		};

		console.log("new value", val)
		this.student_basic_dataDataService.addstudent_basic_data(val).subscribe(res => {
			alert("Added Successfully");
			this.form1.reset();
			this.myControlStudent.reset();
			this.myControlclass.reset();
			this.myControllev.reset();
			this.student_basic_dataDataService.BClicked("");
		})		
	}
	
	update_failure() {

			
		var val = {
			ser: Number(this.ser),
			student_id	: Number(this.selected_student_id)	,
			student_name	: this.selected_student_name	,
			previous_school	: this.previous_school	,
			address	: this.address	,
			transition_between_schools	: this.transition_between_schools	,
			foreign_schools	: this.foreign_schools	,
			student_history_notes	: this.student_history_notes	,
			health_status	: this.health_status	,
		};

		console.log("updated value", val);


		this.student_basic_dataDataService.updatestudent_basic_data(val).subscribe(res => {
			alert("Updated Successfully");
			this.form1.reset();
			this.myControlStudent.reset();
			this.myControlclass.reset();
			this.myControllev.reset();
			this.student_basic_dataDataService.BClicked("");
			(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
			(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
			(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
			(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		})

	}
	cancel_failure() {
		this.form1.reset();
		(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
		(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
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
	class_id:any;
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
        this.setData();
    }
  
    setData(){
        this.nationality = this.selectedStudent.student_nationality;
		this.phone = this.selectedStudent.mother_phone;
    }


	
	
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
		
		this.student_basic_dataDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;

				this.ser	=	String(this.student_basic_dataDataService.ser)	;
				this.previous_school	=	this.student_basic_dataDataService.previous_school	;
				this.address	=	this.student_basic_dataDataService.address	;
				this.transition_between_schools	=	this.student_basic_dataDataService.transition_between_schools	;
				this.foreign_schools	=	this.student_basic_dataDataService.foreign_schools	;
				this.student_history_notes	=	this.student_basic_dataDataService.student_history_notes	;
				this.health_status	=	this.student_basic_dataDataService.health_status	;
				
				this.selected_student_id = this.student_basic_dataDataService.student_id;
				this.selected_student_name = this.student_basic_dataDataService.student_name;
				
				//this.levelValue = this.student_basic_dataDataService.level_name;
				this.studentValue = this.student_basic_dataDataService.student_name;

					this.StudentDataService.GetAlldepartment()
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(error),
						() => {
							// Get Student Object 
							console.log("stu dropdown", this.anotherStuArray)
							var id = this.student_basic_dataDataService.student_id;
							console.log("id",id);
							this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
					
								return String(el.student_id) == id;
							})];
							console.log("studentVar",this.studentVar)

							this.nationality = this.studentVar.student_nationality;
							this.phone = this.studentVar.mother_phone;
							this.student_dob =  this.studentVar.student_dob;
							
							// Get Class Object with Student Object 
							var class_id = this.studentVar.student_class_id;

							this.ClassesDataService.GetAllClasses_with_id(class_id)
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

							// open modal
							var ele = document.getElementById('modalOpener');
							if (ele) { ele.click() }
							
						});
						
				
				/*
				var selected_student_status = String(this.student_basic_dataDataService.student_id);
				this.selectedstudent = this.students[this.students.findIndex(function (el) {
					
					return String(el.student_id) == selected_student_status;
				})];

				var selected_level_status = String(this.student_basic_dataDataService.level_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
					
                    return String(el.lev_id) == selected_level_status;
                })];

				console.log("selectedstudent", this.selectedstudent);
				*/
				
			});

		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;


	}

	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
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
