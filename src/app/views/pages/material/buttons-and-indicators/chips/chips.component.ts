import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Student_premDataService } from '../../../../../Services/Student_premDataService';
import { Student_premMaster, Student_prem } from '../../../../../Student_premMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import moment from 'moment';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { Levels, LevelsMaster } from '../../../../../LevelsMaster.Model';
import { Classes, ClassesMaster } from '../../../../../ClassesMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-chips',
	templateUrl: './chips.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.demo-chip-list {
		width: 100%;
	}
	mat-chip {
		max-width: 200px;
	}
	`]
})
export class ChipsComponent implements OnInit {
	@Input() student_prem_data: any;
	student_prem_id: number;
	prem_date: string = "";
	prem_leave_time: string = "";
	prem_arrive_time: string = "";
	prem_level: string = "";
	prem_class: string = "";
	prem_stu_id: number;
	prem_stu_name: string = "";
	prem_state: number;
	prem_parent_type: string = "";

	class_id:number=0;

	level: Levels[]=[];
    selectedlevel: any=[];

    class: Classes[]=[];
    selectedclass: any=[];

	student: Student[]=[];
    selectedStudent : any=[];

    myControllev = new FormControl('');
    myControlclass = new FormControl('');
    myControlStudent = new FormControl('');

	StudentNameValue:any;
	classNameValue: string;
	LevelNameValue:string;

	form1: FormGroup;
	form2: FormGroup;

	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		private ActivityDataService: ActivityDataService,
		private ClassesDataService: ClassesDataService, 
		private LevelsDataService: LevelsDataService, 
		public _fb: FormBuilder, 
		private StudentDataService: StudentDataService, 
		private Student_premDataService: Student_premDataService) {
			this.form1 = this._fb.group({
				prem_arrive_time: ['', [Validators.required]],
				prem_leave_time: ['', [Validators.required]],
				prem_date: ['', [Validators.required]]
	
			});
			this.form2 = this._fb.group({
				selectedStudent: ['', [Validators.required]],
				selectedclass: ['', [Validators.required]],
				selectedlevel: ['', [Validators.required]]
			});

		
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_student_prem() {

		var val = {
			prem_date: this.prem_date,
			prem_leave_time: this.prem_leave_time,
			prem_arrive_time: this.prem_arrive_time,
			prem_level: this.selectedlevel.lev_id.toString(),
			prem_class: this.selectedclass.class_id.toString(),
			prem_stu_id: this.prem_stu_id,
			prem_stu_name: this.prem_stu_name,
			prem_state: this.prem_state,
			prem_parent_type: this.prem_parent_type,
		};

		this.Student_premDataService.addStudent_prem(val).subscribe(res => {
			alert("Added Succesfully");
			this.Student_premDataService.BClicked("b2");
			this.form1.reset();
			this.selectedStudent = [];
			this.selectedclass = [];
			this.selectedlevel = [];
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlStudent.reset();
		})
		
	}

	update_student_prem() {
		
			var val = {
				student_prem_id: this.student_prem_id,
				prem_date: this.prem_date,
				prem_leave_time: this.prem_leave_time,
				prem_arrive_time: this.prem_arrive_time,
				prem_level: this.prem_level,
				prem_class: this.prem_class,
				prem_stu_id: Number(this.prem_stu_id),
				prem_stu_name: this.prem_stu_name,
				prem_state: this.prem_state,
				prem_parent_type: this.prem_parent_type
			};



			this.Student_premDataService.updateStudent_prem(val).subscribe(res => {
				alert("Updated Succesfully");
				this.Student_premDataService.BClicked("b2");
				this.is_edit=false;
				this.form1.reset();
				this.myControllev.reset();
				this.myControlclass.reset();
				this.myControlStudent.reset();
				this.selectedStudent =[];
				this.selectedclass =[];
				this.selectedlevel =[];
			})
	}


	cancel_student_prem() {
		this.form1.reset();
		this.myControllev.reset();
		this.myControlclass.reset();
		this.myControlStudent.reset();
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
		
		if(event !== null){
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
		if(event !== null){
			this.ActivityDataService.activity_id = event.class_id;
			this.ActivityDataService.BClicked("test");
			this.class_id = event.class_id;
			this.Change_Student();
		}
    }

    Change_Student(){
		if(this.class_id !== undefined){
			this.StudentDataService.GetAllStudent_of_class(this.class_id).subscribe(data => this.student = data,
				error => console.log(),
				() => {
					this.filteredOptionsStudents = this.myControlStudent.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.student_name :''),
							map(student_name => student_name ? this._filterStudent(student_name) : this.student.slice())
						);
						if(this.selectedStudent !== null){
							this.setData();
						}
						
				});

		}
    }
	setData(){
		this.prem_stu_id = this.selectedStudent.student_id;
        this.prem_stu_name = this.selectedStudent.student_name;
	}

	
    studentVar:any=[];
    classVar:any=[];
    anotherStuArray:Student[]=[];
    anotherClassArray:Classes[]=[];
    anotherLevelArray: Levels[]=[];

	priv_info:any=[];
	is_edit:boolean=false;
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

		

		this.Student_premDataService.aClickedEvent
			.subscribe((data: string) => {

				this.is_edit=true;
				this.student_prem_id = Number(this.Student_premDataService.student_prem_id);
				this.prem_date = this.Student_premDataService.prem_date;
				this.prem_leave_time = this.Student_premDataService.prem_leave_time;
				this.prem_arrive_time = this.Student_premDataService.prem_arrive_time;
				this.prem_level = this.Student_premDataService.prem_level;
				this.prem_class = this.Student_premDataService.prem_class;
				this.prem_stu_id = Number(this.Student_premDataService.prem_stu_id);
				this.prem_stu_name = this.Student_premDataService.prem_stu_name;
				this.prem_state = this.Student_premDataService.prem_state;
				this.prem_parent_type = this.Student_premDataService.prem_parent_type;
				
				this.StudentDataService.GetAllStudent_of_class(this.prem_class)
				.subscribe(data => this.student = data);

				this.StudentDataService.GetAlldepartment()
					.subscribe(data => this.anotherStuArray = data,
						error => console.log(),
						() => {
							// Get Student Object 
							var id = this.Student_premDataService.prem_stu_id;
							this.studentVar = this.anotherStuArray[this.anotherStuArray.findIndex(function (el) {
					
								return el.student_id == id;
							})];
                            
                            this.selectedStudent = this.studentVar;
							
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
			
				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }
			});
			
		
	}


}
