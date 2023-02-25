import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { statusDataService } from '../../../../../Services/StatusDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { status, statusMaster } from '../../../../../statusMaster.Model';
import { guideDataService } from '../../../../../Services/guideDataService ';
import { guide,guideMaster } from '../../../../../guideMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { AbsenceDataService } from '../../../../../Services/AbsenceDataService';

import { AbsenceMaster, Absence } from '../../../../../AbsenceMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'kt-guide',
    templateUrl: './guide.component.html',
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
export class guideComponent implements OnInit {
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


	selecteddepartment: any;
	exampleBasicRadios;
	exampleRadiosWithNgModel;
	exampleDisabledRadios;
    exmapleLabelPosition;
    level: any;
    class: any;
	exampleChangeEvent;
	departments: Departments[];
	status: statusMaster[];
    favoriteSeason: string;

	students: Student[];

	selectedlevel: any;
	selectedclass: any;
	selectedstudent: any;
    
    student: any;
    displayFn: any;
    filteredOptions: any;
    service: any;
	

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
		private router: Router, private user_privDataService: user_privDataService,
		private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private LevelsDataService: LevelsDataService,
		private ClassesDataService: ClassesDataService,
		private StudentDataService: StudentDataService,
		private EmployeeService: EmployeeDataService,
		private guideDataService: guideDataService,
		public _fb: FormBuilder, private DepartmentService: DepartmentDataService, 
		private statusDataService: statusDataService) {
        //this.router.navigate(['/error/403']);
        this.form1 = this._fb.group({
            status: ['', [Validators.required]],
            level: ['', [Validators.required]],
            class: ['', [Validators.required]],
            student: ['', [Validators.required]],
            service: ['', [Validators.required]],
            notes: ['', [Validators.required]]
        });

        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
			error => console.log());

			this.EmployeeService.Getdefinations_with_scode("Guidance").subscribe(data => this.guide_type = data,
				error => console.log());
	}
	guide_type:any;
	selectedguide:any;
	add_activity() {
		
		var val = {
			type_id	: this.selectedguide.def_id	,
			type_name	: this.selectedguide.def_name	,
			level_id:  Number(this.selectedlevel.lev_id),
            level_name: this.selectedlevel.lev_name,
            class_id:Number(this.selectedclass.class_id),
            class_name: this.selectedclass.class_name,
            student_name: this.selectedstudent.student_name,
            student_id: Number(this.selectedstudent.student_id),
			services	: this.service	,
			ntoes	: this.notes	,
			
		};

		this.guideDataService.addguide(val).subscribe(res => {
			alert("Saved Successfuly");
			this.guideDataService.BClicked("");
			this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();
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

    statusmodel: status[];
	update_department() {
	
		var val = {
            id: this.id,
			type_id: this.selectedguide.def_id,
			type_name: this.selectedguide.def_name,
			level_id: Number(this.selectedlevel.lev_id),
			level_name: this.selectedlevel.lev_name,
			class_id: Number(this.selectedclass.class_id),
			class_name: this.selectedclass.class_name,
			student_name: this.selectedstudent.student_name,
			student_id: Number(this.selectedstudent.student_id),
			services: this.service,
			ntoes: this.notes,

		};

		this.guideDataService.updateguide(val).subscribe(res => {
			alert(res.toString());
			this.guideDataService.BClicked("");
			this.is_edit=false;
			this.form1.reset();
			this.myControllev.reset();
			this.myControlclass.reset();
			this.myControlstudent.reset();
			
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
	cancel_department() {
		this.form1.reset();
		this.is_edit=false;
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
			this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
				error => console.log(),
				() => {
					var selected_class_status = String(this.guideDataService.class_id);
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
			this.StudentDataService.GetAllStudent_of_class(event.class_id).subscribe(data => this.students = data,
				error => console.log(),
				() => {
					var selected_student_status = String(this.guideDataService.student_id);
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
						map(value => value? typeof value === 'string' ? value : value.lev_name : ''),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
					);
			});

		this.guideDataService.aClickedEvent
			.subscribe((data: string) => {
			
this.is_edit=true;
                this.id = String(this.guideDataService.id);
                this.service = this.guideDataService.services;
                this.notes = this.guideDataService.ntoes;

				var selected_status_status = String(this.guideDataService.type_id);
                this.selectedguide = this.guide_type[this.guide_type.findIndex(function (el) {
                    return String(el.def_id) == selected_status_status;
                })];
				
				var selected_level_status = String(this.guideDataService.level_id);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
					
                    return String(el.lev_id) == selected_level_status;
                })];
				
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
