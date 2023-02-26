import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { EmployeeMaster, Employee } from '../../../../EmployeeMaster.Model';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { DepartmentMaster, Departments } from '../../../../DepartmentMaster.Model';
import { DepartmentDataService } from '../../../../Services/DepartmentDataService';
import { ClassesMaster, Classes } from '../../../../ClassesMaster.Model';
import { ClassesDataService } from '../../../../Services/ClassesDataService';
import { StudentMaster, Student } from '../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../Services/StudentDataService';
import { LevelsDataService } from '../../../../Services/LevelsDataService';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LevelsMaster, Levels } from '../../../../LevelsMaster.Model';
import { TripsDataService } from '../../../../Services/TripsDataService';

import { TripsMaster, trips } from '../../../../TripsMaster.Model';
import moment from 'moment';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-collapse',
	templateUrl: './collapse.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapseComponent implements OnInit {
	@Input() trip_data: any;
	trip_id: number;
	dep_id: string = "";
	dep_name: string = "";
	emp_id: string = "";
	emp_name: string = "";
	trip_loc: string = "";
    is_edit:boolean=false;
	trip_date: string = "";
	trip_time: string = "";
	trip_duration: string = "";
	trip_goals: string = "";
	trip_notes: string = "";
	student_number: string = "0";
	trip_type: string = "1";
	transportation_type: string = "1";
	disabled_emp: any;
	nchra_topic: any;
	handleChange: any;

	Employees: Employee[];
	employeedepartment: any;
	Departments: Departments[];
	selecteddepartment: any;
	students: Student[];
	selectedstudent: any=[];
	selectedstudent: any[] = [];
	level: Levels[];
	selectedlevel: any;
	class: Classes[];
	selectedclass: any;

	exampleDemo: any;
	isCollapsed = false;
	form1: FormGroup;
	constructor(
		private cdRef: ChangeDetectorRef,

		private modalService: NgbModal,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,
		private TripsDataService: TripsDataService,
		private LevelsDataService: LevelsDataService,
		private StudentDataService: StudentDataService,
		private ClassesDataService: ClassesDataService,
		private DepartmentDataService: DepartmentDataService,
		private EmployeeDataService: EmployeeDataService) {
			this.prog_check=true;
			this.bus_check=true;
			this.form1 = this._fb.group({
				selecteddepartment: ['', [Validators.required]],
				employeedepartment: ['', [Validators.required]]
			

			});
			
		this.prog_check = true;
		this.bus_check = true;
		this.form1 = this._fb.group({
			selecteddepartment: ['', [Validators.required]],
			employeedepartment: ['', [Validators.required]],
			selectedstudent: ['', [Validators.required]],
		});

		this.EmployeeDataService.GetAllEmployee().subscribe(data => this.Employees = data,
			error => console.log());

		this.DepartmentDataService.GetAlldepartment().subscribe(data => this.Departments = data,
			error => console.log());
	}
	myControllev = new FormControl('');
	myControlclass = new FormControl('');
	myControlstudent = new FormControl('');

	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
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
	returned_trip_id: string = "";
	prog_check: any;
	nonprog_check: any;
	bus_check: any;
	other_check: any;
	change_trip(event) {
		this.trip_type = event.target.value
	}
	change_trans(event) {
		this.transportation_type = event.target.value
	}
	non: any;

	add_trip() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {

				dep_id: Number(this.selecteddepartment.dep_id),
				dep_name: this.selecteddepartment.dep_name,
				emp_id: this.employeedepartment.emp_id,
				emp_name: this.employeedepartment.emp_name,
				trip_loc: this.trip_loc,
				trip_date: this.trip_date,
				trip_time: this.trip_time,
				trip_duration: String(this.trip_duration),
				trip_goals: this.trip_goals,
				trip_notes: this.trip_notes,
				student_number: this.student_number,
				trip_type: this.trip_type,
				transportation_type: this.transportation_type,
				class_id: this.selectedclass.class_id,
				level_id: this.selectedlevel.lev_id

			};
			this.TripsDataService.addtrips(val).subscribe(res => {
				this.returned_trip_id = res.toString();
				if(this.selectedstudent){
					console.log("val this.selectedstudent",this.selectedstudent)

				this.selectedstudent = this.form1.value.selectedstudent;
				console.log(this.selectedstudent)
				if (this.selectedstudent !== null) {

					for (let i = 0; i < this.selectedstudent.length; i++) {
						var val2 = {
							trip_id: this.returned_trip_id,
							student_id: this.selectedstudent[i].student_id,
							student_name: this.selectedstudent[i].student_name
						}
						//console.log("val details",val)
						this.TripsDataService.addtrips_details(val).subscribe(res => {
						},error=>console.log(error))
						console.log(val2)
						this.TripsDataService.addtrips_details(val2).subscribe(res => {
						})
					}
				}



			}, error => {
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
			alert("Saved Successfully");
			this.TripsDataService.BClicked("");
			// this.form1.reset();
			// this.myControllev.reset();
			// this.myControlclass.reset();
			// this.myControlstudent.reset();
			// this.selectedstudent = [];
			// this.selectedclass = [];
			// this.selectedlevel = [];

		}
	}
	//corridorsDataService: corridorsDataService;
	trip_type_select: any;

	update_trip() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {
				trip_id: this.TripsDataService.trip_id,
				dep_id: Number(this.selecteddepartment.dep_id),
				dep_name: this.selecteddepartment.dep_name,
				emp_id: this.employeedepartment.emp_id,
				emp_name: this.employeedepartment.emp_name,
				trip_loc: this.trip_loc,
				trip_date: this.trip_date,
				trip_time: this.trip_time,
				trip_duration: String(this.trip_duration),
				trip_goals: this.trip_goals,
				trip_notes: this.trip_notes,
				student_number: this.student_number,
				trip_type: this.trip_type,
				transportation_type: this.transportation_type,
				class_id: this.selectedclass.class_id,
				level_id: this.selectedlevel.lev_id
			};


			var tripId = this.TripsDataService.trip_id;
			console.log(tripId);
			this.TripsDataService.updatetrips(val).subscribe(res => {

				this.TripsDataService.deletetrips_details(tripId)

					.subscribe(res => {

						if (this.selectedstudent != null) {

							console.log("inside")
							for (let i = 0; i < this.selectedstudent.length; i++) {
								var val = {
									trip_id: this.TripsDataService.trip_id,
									student_id: this.selectedstudent[i].student_id,
									student_name: this.selectedstudent[i].student_name
								}
								this.TripsDataService.addtrips_details(val).subscribe(res => {
								})
							}
						}
					})

				alert("Updated Successfully");
				this.TripsDataService.BClicked("test");
				
this.is_edit=false;
				// this.form1.reset();
				// this.myControllev.reset();
				// this.myControlclass.reset();
				// this.myControlstudent.reset();
				
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
				this.myControllev.reset();
				this.myControlclass.reset();
				this.myControlstudent.reset();
				this.is_edit=false;
			}, error => {
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


	change_level(event) {
		if (event !== null && event !== undefined && event.length !== 0) {

			this.ClassesDataService.GetAllClasses_with_level_id(event.lev_id).subscribe(data => this.class = data,
				error => console.log(),
				() => {
					if (this.TripsDataService.class_id) {
						var selected_class = String(this.TripsDataService.class_id);
						this.selectedclass = this.class[this.class.findIndex(function (el) {
							return String(el.class_id) == selected_class;
						})];
					}
					this.filteredOptionsclass = this.myControlclass.valueChanges
						.pipe(
							startWith(''),
							map(value => value ? typeof value === 'string' ? value : value.class_name : ''),
							map(class_name => class_name ? this._filterclass(class_name) : this.class.slice())
						);
				});
		}
	}
	change_class(event) {
		if (event !== null && event !== undefined && event.length !== 0) {

			this.StudentDataService.GetAllStudent_of_class(event.class_id).subscribe(data => this.students = data,
				error => console.log(),
				() => {

					this.TripsDataService.GetAlldetails_trips_with_trip_id(this.TripsDataService.trip_id).subscribe(data => this.trip_details = data,
						error => console.log(),
						() => {
			this.StudentDataService.GetAllStudent_of_class(event.class_id)
				.subscribe(data => this.students = data,
					error => console.log(),
					() => {
						this.TripsDataService.GetAlldetails_trips_with_trip_id(12)
							.subscribe(data => this.trip_details = data,
								error => console.log(),
								() => {

							//console.log("this.trip_details",this.trip_details)
							this.selectedstudent = this.students.filter((x) =>
							this.trip_details.some((member) => member.student_id === x.student_id)
						  );
						})
					this.filteredOptionsstudent = this.myControlstudent.valueChanges
						.pipe(
							startWith(''),
							map(value => value? typeof value === 'string' ? value : value.student_name : ''),
							map(student_name => student_name ? this._filterstudent(student_name) : this.students.slice())
						);
						
				});
									console.log("this.trip_details", this.trip_details)

									this.selectedstudent = this.students.filter((x) =>
										this.trip_details.some((member) => member.student_id === x.student_id)
									);

									console.log("this.selectedstudent", this.selectedstudent)

								})

						console.log("this.selectedstudent", this.selectedstudent)

					});
		}
	}



	priv_info:any=[];
	trip_details:any[]=[]
	is_edit:boolean=false;
	priv_info: any = [];
	trip_details: any[] = []
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
			.subscribe(data => this.priv_info = data,
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
						map(value => value ? typeof value === 'string' ? value : value.lev_name : ''),
						map(lev_name => lev_name ? this._filterlev(lev_name) : this.level.slice())
					);
			});




		this.TripsDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.trip_id = Number(this.TripsDataService.trip_id);
				this.trip_loc = this.TripsDataService.trip_loc;
				this.trip_date = this.TripsDataService.trip_date;
				this.trip_time = this.TripsDataService.trip_time;
				this.trip_duration = this.TripsDataService.trip_duration;
				this.trip_goals = this.TripsDataService.trip_goals;
				this.trip_notes = this.TripsDataService.trip_notes;


				var selected_level = String(this.TripsDataService.level_id);
				this.selectedlevel = this.level[this.level.findIndex(function (el) {
					return String(el.lev_id) == selected_level;
				})];

				var selected_dep = String(this.TripsDataService.dep_id);
				this.selecteddepartment = this.Departments[this.Departments.findIndex(function (el) {
					return String(el.dep_id) == selected_dep;
				})];


				var selected_emp = String(this.TripsDataService.emp_id);
				this.employeedepartment = this.Employees[this.Employees.findIndex(function (el) {
					return String(el.emp_id) == selected_emp;
				})];

				this.student_number = this.TripsDataService.student_number;
				// this.trip_type	=	this.TripsDataService.trip_type	;
				// this.transportation_type	=	this.TripsDataService.transportation_type	;
				if (this.TripsDataService.trip_type = "1") {
					this.prog_check = true;
				}
				else { this.nonprog_check = true; }
				if (this.TripsDataService.transportation_type = "1") {
					this.bus_check = true;
				}
				else { this.other_check = true; }

				// open modal

				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }



			});


	}
}

