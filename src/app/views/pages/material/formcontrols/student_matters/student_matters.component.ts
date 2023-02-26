import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { ActivityMaster, activity } from '../../../../../ActivityMaster.Model';
import { Router } from '@angular/router';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { student_mattersDataService } from '../../../../../Services/student_mattersDataService';
import { student_mattersMaster, student_matters } from '../../../../../student_mattersMaster.Model';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators'; 
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'kt-student_matters',
    templateUrl: './student_matters.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	mat-radio-button {
		padding-right: 16px;
	}
	.example-radio-group {
		display: inline-flex;
		flex-direction: column;
	  } 
	  .example-radio-button {
		margin: 15px;
	  }
	.example-selected-value {
		margin: 15px 0;
	}
	`]
})
export class student_mattersComponent implements OnInit {
	@Input() activity_data: any;
	activity_id: string = "";
	activity_name: string;
	activity_dep: string = "";
	activity_school_year: string = "";
	activity_level: string = "";
	activity_date: string = "";
	activity_school_term: string = "";
	activity_notes: string = "";
    dep_id: string = "";
    id: number;
    level_id: string = "";
    level_name: string = "";
    class_id: string = "";
    class_name: string = "";
    note_date: string = "";
    topic: string = "";
    ntoes: string = "";
	student_id:number;
    student_name:string="";

    displayFn() { }
    filteredOptions: any;
    notes: any;
    form1: FormGroup;
	selecteddepartment: any;
	
	departments: Departments[];
	activities: ActivityMaster[];
    favoriteSeason: string;
   
	level: Levels[];
	class: Classes[];
	students: Student[];

	
	selectedlevel: any=[];
	selectedclass: any=[];
	selectedstudent: any=[];

	myControllev = new FormControl('');
	myControlclass = new FormControl('');
	myControlstudent = new FormControl('');

	state: string = '';
	selectedState: string = '';

	labelPosition: string = 'before';
	dep_name: any;
	dep_desc: any;

	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}

	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, 
		private DepartmentService: DepartmentDataService,
		private LevelsDataService: LevelsDataService,
		private ClassesDataService: ClassesDataService,
		private StudentDataService: StudentDataService, 
		private student_mattersDataService: student_mattersDataService) {
       
			this.form1 = this._fb.group({
	
			});

			this.DepartmentService.GetAlldepartment()
			.subscribe(data => this.departments = data,
				error => console.log());
	}
	
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_matter() {
		
		var val = {

			level_id: this.selectedlevel.lev_id,
			level_name: this.selectedlevel.lev_name,
			class_id: this.selectedclass.class_id,			
			class_name: this.selectedclass.class_name,
			note_date: this.note_date,
			topic: this.topic,
			ntoes: this.ntoes,
			student_id: this.selectedstudent.student_id,
			student_name:this.selectedstudent.student_name
		};
		this.student_mattersDataService.addstudent_matters(val).subscribe(res => {
			alert("Saved Successfuly");
			this.student_mattersDataService.BClicked("b2");
		},
		error => {console.log();
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
	activity: activity[];
	update_matter() {

			var val = {
				id: Number(this.id),
				level_id: this.selectedlevel.lev_id,
				level_name: this.selectedlevel.lev_name,
				class_id: this.selectedclass.class_id, 
				class_name: this.selectedclass.class_name,
				note_date: this.note_date,
				topic: this.topic,
				ntoes: this.ntoes,
				student_id: this.selectedstudent.student_id,
				student_name:this.selectedstudent.student_name
			};

			this.student_mattersDataService.updatestudent_matters(val)
			.subscribe(res => {
				alert("Updated Successfully");
				this.student_mattersDataService.BClicked("b2");
				this.is_edit=false;
			},
			error => {console.log();
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

	cancel_matter() {
		
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

	filteredOptionsstudent: Observable<any[]>;

	private _filterstudent(value: string) {
		const filterValue = value.toLowerCase();
		return this.students.filter(option => option.student_name.toLowerCase().includes(filterValue));
	}
	displayFnstudent(selectedoption) {
		return selectedoption ? selectedoption.student_name : undefined;
	}

	studentVar:any=[];
    classVar:any=[];
    anotherStuArray:Student[]=[];
    anotherClassArray:Classes[]=[];
    anotherLevelArray: Levels[]=[];
	anotherStdArray: Student[] = [];
	is_edit:boolean=false;
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
						map(value =>  value? typeof value === 'string' ? value : value.lev_name : ''),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
					);
			});

		this.ClassesDataService.GetAllClasses().subscribe(data => this.class = data,
			error => console.log(),
			() => {
				this.filteredOptionsclass = this.myControlclass.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.class_name : ''),
						map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
					);
			});

		this.StudentDataService.GetAlldepartment().subscribe(data => this.students = data,
			error => console.log(),
			() => {
				this.filteredOptionsstudent = this.myControlstudent.valueChanges
					.pipe(
						startWith(''),
						map(value => value? typeof value === 'string' ? value : value.student_name : ''),
						map(student_name => student_name ? this._filterstudent(student_name) : this.students.slice())
					);
			});

		
		this.student_mattersDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.id = Number(this.student_mattersDataService.id);
				this.level_id = this.student_mattersDataService.level_id;
				this.level_name = this.student_mattersDataService.level_name;
				this.class_id = this.student_mattersDataService.class_id;
				this.class_name = this.student_mattersDataService.class_name;
				this.note_date = this.student_mattersDataService.note_date;
				this.topic = this.student_mattersDataService.topic;
				this.ntoes = this.student_mattersDataService.ntoes;

				

				this.StudentDataService.GetAllStudent_of_class(this.class_id)
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Class Object with Student Object 
							var class_id2 = this.student_mattersDataService.class_id;

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

										var std_id = this.student_mattersDataService.student_id;
										this.StudentDataService.GetAllstudents_with_id(std_id)
										.subscribe(data => this.anotherStuArray = data,
											error => console.log(),
											() => {
												this.selectedstudent = this.anotherStuArray[0];
											});
											

									});
							});
							
					});

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	
	}

	changeState() {
		this.state = this.selectedState;
	}
}
