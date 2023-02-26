import { Component, ChangeDetectorRef,OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { Excellent_studentsDataService } from '../../../../../Services/Excellent_studentsDataService';

import { Excellent_studentsMaster, Excellent_students } from '../../../../../Excellent_studentsModel.Master';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import * as def from '../../../../../definationsMaster.Model';
import { PageEvent } from '@angular/material';
import moment from 'moment';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Observable } from 'rxjs';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';

import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-excellent-students',
	templateUrl: './excellent-students.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcellentstudentsComponent implements OnInit {
	@Input() absence_data: any;
	exc_stu_id: number;
	exc_stu_lev: string = "";
	exc_stu_clas: string = "";
	exc_stu_name: string = "";
	exc_stu_nation: string = "";
	exc_stu_mob: number;
	exc_stu_birth: string = "";
	exc_stu_notes: string = "";
	exc_stu_eff: string = "";

	is_edit:boolean=false;
	selected_student_id: any;
	selected_student_name: any;
	nat: def.nat[];

	
    nationality:string="";
	phone:string="";
	student_dob:string="";
    
    allLevels: Levels[];
    level: Levels[];
    selectedlevel: any;

	allClasses: Classes[];
    class: Classes[];
    selectedclass: any;

    allStudents: Student[];
	student: Student[];
    selectedStudent : any;

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

	levelValue: string="";
	classValue: string="";
	studentValue: string="";


	exampleBasic;
	exampleConfig;

	length = 100;
	pageSize = 10;
	pageSizeOptions = [5, 10, 25, 100];

	// MatPaginator Output
	pageEvent: PageEvent;

	form1: FormGroup;
	constructor(
		private cdRef:ChangeDetectorRef,
		private modalService: NgbModal,
		private router: Router, private user_privDataService: user_privDataService,
		private Excellent_studentsDataService: Excellent_studentsDataService, 
		private LevelsDataService: LevelsDataService, 
		private StudentDataService: StudentDataService, 
		private ClassesDataService: ClassesDataService, 
		private EmployeeService: EmployeeDataService,
		private ActivityDataService: ActivityDataService, 
		public _fb: FormBuilder) {
		
		this.form1 = this._fb.group({
			exc_stu_nation : [[Validators.required]],
			exc_stu_mob: ['', [Validators.required]],
			exc_stu_birth: ['', [Validators.required]],
			exc_stu_notes: ['', [Validators.required]],
			exc_stu_eff: ['', [Validators.required]]

		});

		EmployeeService.Getdefinations_with_scode("nat").subscribe(data => this.nat = data,
			error => console.log());

			this.LevelsDataService.GetAllLevels().subscribe(data => this.allLevels = data,
				error => console.log());

			this.ClassesDataService.GetAllClasses().subscribe(data => this.allClasses = data,
				error => console.log());

		this.StudentDataService.GetAlldepartment().subscribe(data => this.allStudents = data,
			error => console.log());

	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
    selectedjob: any;
	add_excstu() {
		
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {
				exc_stu_lev:  this.selectedlevel.lev_name,
				exc_stu_clas: this.selectedclass.class_name,
				exc_stu_name: this.selectedStudent.student_name,
				exc_stu_nation: this.nationality,
				exc_stu_mob: Number(this.phone), 
				exc_stu_birth: this.student_dob,
				exc_stu_notes: this.exc_stu_notes,
				exc_stu_eff: this.exc_stu_eff

			};
			this.Excellent_studentsDataService.addExcellent_students(val).subscribe(res => {
				alert("Added Successfully");
				this.Excellent_studentsDataService.BClicked("b2");
				this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
				
			},error => {
                const errorMessages = [];
                for (const fieldName in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(fieldName)) {
                    const fieldErrors = error.error.errors[fieldName];
                    for (const fieldError of fieldErrors) {
                      errorMessages.push(fieldError);
                    }
                  }
                }
                alert(errorMessages)
            })

			this.form1.reset();
		}
	
	}
	
	
	update_excstu() {
		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {
			var val = {
				exc_stu_id:  this.exc_stu_id,
				exc_stu_lev:  this.selectedlevel.lev_name,
				exc_stu_clas: this.selectedclass.class_name,
				exc_stu_name: this.studentValue,
				exc_stu_nation: this.nationality,
				exc_stu_mob: Number(this.phone), 
				exc_stu_birth: this.student_dob,
				exc_stu_notes: this.exc_stu_notes,
				exc_stu_eff: this.exc_stu_eff
			};

			this.Excellent_studentsDataService.updateExcellent_students(val).subscribe(res => {
				alert("Updates Successfully");
				this.form1.reset();
				this.myControlStudent.reset();
				this.myControlclass.reset();
				this.myControllev.reset();
				this.Excellent_studentsDataService.BClicked("b2");
				this.is_edit=false;
			},error => {
                const errorMessages = [];
                for (const fieldName in error.error.errors) {
                  if (error.error.errors.hasOwnProperty(fieldName)) {
                    const fieldErrors = error.error.errors[fieldName];
                    for (const fieldError of fieldErrors) {
                      errorMessages.push(fieldError);
                    }
                  }
                }
                alert(errorMessages)
            })
		}
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
							map(value => value? typeof value === 'string' ? value : value.class_name: ''),
							map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
						);
				});
		}
    }
	class_id:any;
    change_class(event) {
		if(event !== null && event !== undefined && event.length !== 0){
			this.class_id = event.class_id;
			this.Change_Student();
		}
    }

    Change_Student(){
		if(this.class !== null && this.class !== undefined){

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

				
			if(this.selectedStudent !== undefined && this.selectedStudent !== null){
				this.setData();
			}
		}
    }
  
    setData(){
	//	console.log("asdasdasda",this.selectedStudent)
        this.nationality = this.selectedStudent.student_nationality;
		this.phone = this.selectedStudent.phone;
		this.student_dob =this.selectedStudent.student_dob;
    }

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

		this.Excellent_studentsDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.exc_stu_id = Number(this.Excellent_studentsDataService.exc_stu_id);
				this.exc_stu_lev = this.Excellent_studentsDataService.exc_stu_lev;
				this.exc_stu_clas = this.Excellent_studentsDataService.exc_stu_clas;
				this.exc_stu_name = this.Excellent_studentsDataService.exc_stu_name;
				this.exc_stu_nation = this.Excellent_studentsDataService.exc_stu_nation;
				this.exc_stu_mob = Number(this.Excellent_studentsDataService.exc_stu_mob);
				this.exc_stu_birth = this.Excellent_studentsDataService.exc_stu_birth;
				this.exc_stu_notes = this.Excellent_studentsDataService.exc_stu_notes;
				this.exc_stu_eff = this.Excellent_studentsDataService.exc_stu_eff;

				this.levelValue = this.Excellent_studentsDataService.exc_stu_lev;
				this.classValue = this.Excellent_studentsDataService.exc_stu_clas;
				this.studentValue = this.Excellent_studentsDataService.exc_stu_name;

				this.nationality = this.Excellent_studentsDataService.exc_stu_nation;
				this.phone = this.Excellent_studentsDataService.exc_stu_mob.toString();
				this.student_dob = this.Excellent_studentsDataService.exc_stu_birth;
				
				
				
				var selected_value2 =  this.Excellent_studentsDataService.exc_stu_lev;
				this.selectedlevel = this.level[this.allLevels.findIndex(function (el) {
					return el.lev_name == selected_value2
				})];


				this.ClassesDataService.GetAllClasses_with_level_id(this.selectedlevel.lev_id)
				.subscribe(data => this.allClasses = data,
					error => console.log());
						

				var selected_value3 =  this.Excellent_studentsDataService.exc_stu_clas;
				this.selectedclass = this.allClasses[this.allClasses.findIndex(function (el) {
					return el.class_name == selected_value3
				})];

				this.class_id = this.selectedclass.class_id;

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

				


				this.selectedStudent = this.allStudents.find(e => e.student_name == this.studentValue)

								

			});

	}

	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
	}
}
