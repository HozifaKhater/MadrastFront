import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { AbsenceDataService } from '../../../../../Services/AbsenceDataService';

import { AbsenceMaster, Absence } from '../../../../../AbsenceMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import * as def from '../../../../../definationsMaster.Model';
import { PageEvent } from '@angular/material';
import moment from 'moment';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
@Component({
	selector: 'kt-changebranch',
	templateUrl: './change-branch.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class chnagebranchComponent implements OnInit {
	@Input() absence_data: any;
	student_id: number;
	student_branch: any;

	level_name: string = "";
	level_id: string = "";
	class_name: string = "";
	class_id: string = "";
	selectedlevel:any;
	selectedclass:any;
	selectedstudent:any;
	student_name: string = "";

	level: Levels[];
	class: Classes[];
	students: Student[];
	students_data: Student[];

	branch: def.branch[];

	form1: FormGroup;
	selected_level: any;
	selected_class: any;
	selected_student: any;
	myControl = new FormControl('');
	exampleBasic;
	exampleConfig;

	length = 100;
	pageSize = 10;
	pageSizeOptions = [5, 10, 25, 100];

	// MatPaginator Output
	pageEvent: PageEvent;

	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private LevelsDataService: LevelsDataService,
		private ClassesDataService: ClassesDataService,
		private StudentDataService: StudentDataService,
		private EmployeeService: EmployeeDataService
) {
		this.form1 = this._fb.group({
			selected_level: ['', [Validators.required]],
			selected_class: ['', [Validators.required]],
			selected_student: ['', [Validators.required]],
			student_branch: ['', [Validators.required]]
		});

		this.EmployeeService.Getdefinations_with_scode("branch").subscribe(data => this.branch = data,
			error => console.log(error),
			() => console.log("ok"));

	}

	update_branch() {

		var val = {
			student_id: Number(this.student_id),
			student_branch: String(this.student_branch.def_id),
		};

		console.log("val", val);


		this.StudentDataService.update_student_branch(val).subscribe(res => {

			alert(res.toString());
	
		})

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
        this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
            error => console.log(error),
            () => {
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
                console.log("emp dropdown", this.students);
                this.filteredOptionsstudent = this.myControlstudent.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.student_name),
                        map(student_name => student_name ? this._filterstudent(student_name) : this.students.slice())
                    );
            });
    }

	
	change_student(event) {
		this.StudentDataService.GetAllstudents_with_id(event.student_id).subscribe(data => this.students_data = data,
			error => console.log(error),
			() => {console.log("ok",  String(this.students_data[0].student_branch));
			var selected_value2 = String(this.students_data[0].student_branch);
			this.student_branch = this.branch[this.branch.findIndex(function (el) {

				return String(el.def_id) === selected_value2;

			})];
		});
		this.student_id = event.student_id
		this.student_name = event.student_name
	}
	priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 

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

	

		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.StudentDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				


				this.student_id = Number(this.StudentDataService.student_id);

				this.student_branch = this.StudentDataService.student_branch;


			});
		var test1

		this.student_id = this.student_id;
		this.student_branch = this.student_branch;

	}

	setPageSizeOptions(setPageSizeOptionsInput: string) {
		this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
	}
}
