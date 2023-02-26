import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { statusDataService } from '../../../../../Services/StatusDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { status, statusMaster } from '../../../../../statusMaster.Model';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { AbsenceDataService } from '../../../../../Services/AbsenceDataService';

import { AbsenceMaster, Absence } from '../../../../../AbsenceMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import * as def from '../../../../../definationsMaster.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'kt-status',
    templateUrl: './status.component.html',
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
	`],

})
export class statusComponent implements OnInit {
	@Input() activity_data: any;
    id: string = "";
    status_name: string = "";
    status_id: string = "";
    level_id: string = "";
    level_name: string = "";
    class_id: string = "";
    class_name: string = "";
    student_name: string = "";
    student_id: string = "";
    dob: string = "";
    notes: string = "";
    status_type: def.status_type[];
    is_edit:boolean=false;
	selecteddepartment: any;
	exampleBasicRadios;
	exampleRadiosWithNgModel;
	exampleDisabledRadios;
	exmapleLabelPosition;
	exampleChangeEvent;
	departments: Departments[];
	status: statusMaster[];
	level: Levels[];
	class: Classes[];
	students: Student[];

	selected_level: any;
	selected_class: any;
	selected_student: any;
	myControl = new FormControl('');
    favoriteSeason: string;
    
	
	state: string = '';
	selectedState: string = '';

	labelPosition: string = 'before';
	dep_name: any;
	dep_desc: any;

	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}
    form1: FormGroup;
    constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
        private router: Router, private user_privDataService: user_privDataService,
		private LevelsDataService: LevelsDataService,
		private ClassesDataService: ClassesDataService,
		private StudentDataService: StudentDataService,
		private EmployeeService: EmployeeDataService,
		public _fb: FormBuilder, private DepartmentService: DepartmentDataService, 
		private statusDataService: statusDataService) {

			this.form1 = this._fb.group({
            status: ['', [Validators.required]],
            level: ['', [Validators.required]],
            class: ['', [Validators.required]],
            student: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            notes: ['', [Validators.required]],
			status_concerns: ['', [Validators.required]],
			selectedstatus: ['', [Validators.required]]
        });

        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
			error => console.log());

		this.EmployeeService.Getdefinations_with_scode("status_types")
			.subscribe(data => this.status_type = data,
            error => console.log());

	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	selectedstatus:any;
	selectedlevel:any;
	selectedclass:any;
	selectedstudent:any;
	status_concerns:string="";
	status_concerns_label:string="نوع المشكله";
	add() {
		
		var val = {
            status_name: this.selectedstatus.def_name,
            status_id: Number(this.selectedstatus.def_id),
            level_id:  Number(this.selectedlevel.lev_id),
            level_name: this.selectedlevel.lev_name,
            class_id:Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            student_name: this.selectedstudent.student_name,
            student_id: Number(this.selectedstudent.student_id),
            dob: this.dob,
            notes: this.notes,
			status_concerns:this.status_concerns

		};
		this.statusDataService.addstatus(val).subscribe(res => {
			alert("Saved Successfuly");
			this.statusDataService.BClicked("")
			this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();
		})
	}
    statusmodel: status[];
	update() {
	
		var val = {
            id: Number(this.id),
			status_name: this.selectedstatus.def_name,
            status_id: Number(this.selectedstatus.def_id),
            level_id:  Number(this.selectedlevel.lev_id),
            level_name: this.selectedlevel.lev_name,
            class_id:Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            student_name: this.selectedstudent.student_name,
            student_id: Number(this.selectedstudent.student_id),
            dob: this.dob,
            notes: this.notes,
			status_concerns:this.status_concerns
		};

		this.statusDataService.updatestatus(val).subscribe(res => {
			alert(res.toString());
		
			this.statusDataService.BClicked("");
			this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();
			this.is_edit=false;
		})

	}
	cancel() {
		this.form1.reset();
		this.myControllev.reset();
		this.myControlclass.reset();
		this.myControlstudent.reset();
		
	}
	
	myControllev = new FormControl('');
	myControlclass = new FormControl('');
 	myControlstudent = new FormControl('');

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


 	change_level(event) {
		if(event !== null && event !== undefined && event.length !== 0){

			this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id)
			.subscribe(data => this.class = data,
				error => console.log(),
				() => {
					var selected_class_status = String(this.statusDataService.class_id);
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
        	this.StudentDataService.GetAllStudent_of_class(event.class_id)
			.subscribe(data => this.students = data,
            error => console.log(),
            () => {
				
				var selected_student_status = String(this.statusDataService.student_id);
				this.selectedstudent = this.students[this.students.findIndex(function (el) {
					
					return String(el.student_id) == selected_student_status;
				})];
                this.filteredOptionsstudent = this.myControlstudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.student_name : ''),
                        map(student_name => student_name ? this._filterstudent(student_name) : this.students.slice())
                    );
            });
		}
    }
	change_status(event){
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.def_id==47)
			{
				this.status_concerns_label="الحاله الصحيه"
			}
			else if (event.def_id==48)
			{
				this.status_concerns_label="النتيجه"
			}
			else{
				this.status_concerns_label="نوع المشكله";
			}
		}
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

		

		this.statusDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
                this.id = String(this.statusDataService.id);
                this.dob = this.statusDataService.dob;
                this.notes = this.statusDataService.notes;
				this.status_concerns = this.statusDataService.status_concerns;
				
				var selected_status_status = String(this.statusDataService.status_id);
                this.selectedstatus = this.status_type[this.status_type.findIndex(function (el) {
                    return String(el.def_id) == selected_status_status;
                })];
				
				var selected_level_status = String(this.statusDataService.level_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
					
                    return String(el.lev_id) == selected_level_status;
                })];
				
				
				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
			
	}

	changeState() {
		this.state = this.selectedState;
	}
}
