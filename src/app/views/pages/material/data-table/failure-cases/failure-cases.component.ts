import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { Failure_casesDataService } from '../../../../../Services/Failure_casesDataService';

import { Failure_casesMaster, Failure_cases } from '../../../../../Failure_casesMaster.Model';
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-failure-students',
	templateUrl: './failure-cases.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailurestudentsComponent implements OnInit {
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
	fail_end_year: string = "";
	fail_sit: string = "";
	fail_eff_date: string = "";
	fail_eff_results: string = "";
	fail_recomm: string = "";
    selectednation: any;
    butDisabled: any;
 
	subjects: Subjects[];
	students: Student[];
	selectedstudent: any;
	Levels: Levels[];
	selectedlevel: any;
	classes: Classes[];
	selectedclass: any;
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

	form1: FormGroup;
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		private SubjectDataService: SubjectDataService,
		private Failure_casesDataService: Failure_casesDataService, 
		private LevelsDataService: LevelsDataService, 
		private StudentDataService: StudentDataService, 
		private ClassesDataService: ClassesDataService, 
		private EmployeeService: EmployeeDataService, 
		public _fb: FormBuilder) {

			this.LevelsDataService.GetAllLevels().subscribe(data => this.Levels = data,
				error => console.log(error),
				() => console.log("emp dropdown", this.Levels));
			this.ClassesDataService.GetAllClasses().subscribe(data => this.classes = data,
				error => console.log(error),
				() => console.log("emp dropdown", this.classes));
			this.StudentDataService.GetAlldepartment().subscribe(data => this.students = data,
				error => console.log(error),
				() => console.log("emp dropdown", this.students));
			this.SubjectDataService.GetAllSubject().subscribe(data => this.subjects = data,
				error => console.log(error),
				() => { console.log("department dropdown") });

			this.form1 = this._fb.group({
			
				selectednation: ['', [Validators.required]],
				fail_mob: ['', [Validators.required]],
				fail_birth: [{ value: '', disabled: false }, [Validators.required]],
				fail_date: [{ value: '', disabled: false }, [Validators.required]],
				fail_desc: ['', [Validators.required]],
				fail_reason: ['', [Validators.required]],
				selectedsubject: ['', [Validators.required]],
				fail_1: ['', [Validators.required]],
				fail_2: ['', [Validators.required]],
				fail_3: ['', [Validators.required]],
				fail_4: ['', [Validators.required]],
				fail_end_year: ['', [Validators.required]],
				fail_sit: ['', [Validators.required]],
				fail_eff_date:[{ value: '', disabled: false }, [Validators.required]],
				fail_eff_results: ['', [Validators.required]],
				fail_recomm: ['', [Validators.required]]
			});

			EmployeeService.Getdefinations_with_scode("nat").subscribe(data => this.nat = data,
				error => console.log(error),
				() => console.log("ok"));
		}

	add_failure() {
		if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
			
			for (let i = 0; i < this.selectedsubject.length; i++) {
				var val = {

					fail_lev: String(this.selectedlevel.lev_id),
					fail_class:  String(this.selectedclass.class_id),
					fail_student:  String(this.selectedstudent.student_id),
					fail_nation:  String(this.selectednation.def_id),
					fail_mob: Number(this.fail_mob), 
					fail_birth: this.fail_birth,
					fail_date: this.fail_date,
					fail_desc: this.fail_desc,
					fail_reason: this.fail_reason,
					fail_sub: this.selectedsubject[i].subject_name,
					fail_1: Number(this.fail_1), 
					fail_2: Number(this.fail_2), 
					fail_3: Number(this.fail_3), 
					fail_4: Number(this.fail_4), 
					fail_end_year: Number(this.fail_end_year),
					fail_sit: this.fail_sit,
					fail_eff_date: this.fail_eff_date,
					fail_eff_results: this.fail_eff_results,
					fail_recomm: this.fail_recomm
				};
				console.log("new vlaue", val)
				this.Failure_casesDataService.addFailure_cases(val).subscribe(res => {
					
					this.form1.reset();
					this.Failure_casesDataService.BClicked("");
				})
            }
		
			alert("Added Succesfully");
			
		}
}
	
	

	//corridorsDataService: corridorsDataService;
	update_failure() {
		if (this.form1.invalid) {
            console.log('Form invalid...');
            this.form1.markAllAsTouched();
        } else {
			for (let i = 0; i < this.selectedsubject.length; i++) {
				
				var val = {
					fail_id: Number(this.fail_id),
					fail_lev: String(this.selectedlevel.lev_id),
					fail_class:  String(this.selectedclass.class_id),
					fail_student:  String(this.selectedstudent.student_id),
					fail_nation:  String(this.selectednation.def_id),
					fail_mob: Number(this.fail_mob), 
					fail_birth: this.fail_birth,
					fail_date: this.fail_date,
					fail_desc: this.fail_desc,
					fail_reason: this.fail_reason,
					fail_sub: this.selectedsubject[i].subject_name,
					fail_1: Number(this.fail_1), 
					fail_2: Number(this.fail_2), 
					fail_3: Number(this.fail_3), 
					fail_4: Number(this.fail_4), 
					fail_end_year: Number(this.fail_end_year),
					fail_sit: this.fail_sit,
					fail_eff_date: this.fail_eff_date,
					fail_eff_results: this.fail_eff_results,
					fail_recomm: this.fail_recomm
				};

				console.log("val", val);


				this.Failure_casesDataService.updateFailure_cases(val).subscribe(res => {
					this.form1.reset();
					this.Failure_casesDataService.BClicked("");
					
this.is_edit=false;
				})
			}
			alert("Updated Succesfully");
		}
	}
	cancel_failure() {
		this.form1.reset();

		this.is_edit=false;
	}
	level: Levels[];
	class: Classes[];
	
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
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
				var selected_class_status = String(this.Failure_casesDataService.fail_class);
				this.selectedclass = this.class[this.class.findIndex(function (el) {
					
					return String(el.class_id) == selected_class_status;
				})];
                console.log("emp dropdown", this.class);
                this.filteredOptionsclass = this.myControlclass.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.class_name),
                        map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
                    );
            });
			
		
    }
    change_class(event) {
        this.StudentDataService.GetAllStudent_of_class(event.class_id).subscribe(data => this.students = data,
            error => console.log(error),
            () => {
				var selected_student_status = String(this.Failure_casesDataService.fail_student);
				this.selectedstudent = this.students[this.students.findIndex(function (el) {
					
					return String(el.student_id) == selected_student_status;
				})];
                console.log("emp dropdown", this.students);
                this.filteredOptionsstudent = this.myControlstudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.student_name),
                        map(student_name => student_name ? this._filterstudent(student_name) : this.students.slice())
                    );
            });
    }
	priv_info:any;
	is_edit:boolean=false;
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
		

		this.Failure_casesDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				this.is_edit=true;
				//(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				//(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;


				this.fail_id = Number(this.Failure_casesDataService.fail_id);

				this.fail_nation = this.Failure_casesDataService.fail_nation;
				this.fail_mob = this.Failure_casesDataService.fail_mob;
				this.fail_birth = this.Failure_casesDataService.fail_birth;
				this.fail_date = this.Failure_casesDataService.fail_date;
				this.fail_desc = this.Failure_casesDataService.fail_desc;
				this.fail_reason = this.Failure_casesDataService.fail_reason;
				this.fail_sub = this.Failure_casesDataService.fail_sub;
				this.fail_1 = this.Failure_casesDataService.fail_1;
				this.fail_2 = this.Failure_casesDataService.fail_2;
				this.fail_3 = this.Failure_casesDataService.fail_3;
				this.fail_4 = this.Failure_casesDataService.fail_4;
				this.fail_end_year = this.Failure_casesDataService.fail_end_year;
				this.fail_sit = this.Failure_casesDataService.fail_sit;
				this.fail_eff_date = this.Failure_casesDataService.fail_eff_date;
				this.fail_eff_results = this.Failure_casesDataService.fail_eff_results;
				this.fail_recomm = this.Failure_casesDataService.fail_recomm;
				//this.fail_student = this.Failure_casesDataService.fail_student;

				var selected_level_status = String(this.Failure_casesDataService.fail_lev);
                this.selectedlevel = this.level[this.level.findIndex(function (el) {
					
                    return String(el.lev_id) == selected_level_status;
                })];

				
				var selected_nat_var = String(this.Failure_casesDataService.fail_nation);
                this.selectednation = this.nat[this.nat.findIndex(function (el) {
					
                    return String(el.def_id) == selected_nat_var;
                })];

			/*	var selected_student_value = String(this.Failure_casesDataService.fail_student);
                this.selectedstudent = this.students[this.students.findIndex(function (el) {
					
                    return String(el.student_name) == selected_student_value;
                })];
*/

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }
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
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}
}
