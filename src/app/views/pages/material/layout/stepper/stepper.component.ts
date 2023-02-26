import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input  } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { corridorsDataService } from '../../../../../Services/CorridorsDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { CorridorsMaster, corridor } from '../../../../../CorridorsMaster.Model';
import { EmployeeMaster, Employee } from '../../../../../EmployeeMaster.Model';
import { Corridor_supervisionDataService } from '../../../../../Services/Corridor_supervisionDataService';
import { FormArray, FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-stepper',
	templateUrl: './stepper.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [Corridor_supervisionDataService]
})
export class StepperComponent implements OnInit {
	@Input() corridor_supervision_data: any;
	selectedcorridor: any =[];
	selectedemployee: any =[];
	supervision_id: number;
	corridor_id: string = "";
	basic_emp_id: string = "";
	basic_emp_name: string = "";
	spare_emp_id: string = "";
	spare_emp_name: string = "";
	from_date: string = "";
	to_date: string = "";
	corridor_name: string = "";
	dep_id: string = "";
	dep_name: string = "";
	emp_id: string = "";
	emp_name: string = "";

	selecteddepartment: any =[];
	departments: Departments[] =[];
	corridors: corridor[] =[];
	employees: Employee[] =[];

	myControlDept = new FormControl('');
    myControlCorr = new FormControl('');
	is_edit:boolean=false;
	isLinear = false;
	firstFormGroup: FormGroup;
	secondFormGroup: FormGroup;

	form1: FormGroup;
	myControl = new FormControl('');;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, private _formBuilder: FormBuilder,
		private EmployeeDataService: EmployeeDataService,
		private DepartmentDataService: DepartmentDataService,
		private corridorsDataService: corridorsDataService, 
		private Corridor_supervisionDataService: Corridor_supervisionDataService) {

		this.form1 = this._fb.group({
		
			selectedcorridor: ['', [Validators.required]],
			selecteddepartment: ['', [Validators.required]],
			selectedemployee: ['', [Validators.required]]

		});

		this.DepartmentDataService.GetAllMasterdepartment()
		.subscribe(data => this.departments = data,
			error => console.log());

		this.corridorsDataService.GetAllCorridors()
		.subscribe(data => this.corridors = data,
			error => console.log());

	}
    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	add_corridor_supervision() {
		

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {

				corridor_id: Number(this.selectedcorridor.corridor_id),
				basic_emp_id: Number(this.selectedemployee.emp_id),
				basic_emp_name: this.selectedemployee.emp_name,
				spare_emp_id: Number(this.spare_emp_id),
				spare_emp_name: this.spare_emp_name,
				from_date: this.from_date,
				to_date: this.to_date,
				corridor_name: this.selectedcorridor.corridor_name,
				dep_id: Number(this.selecteddepartment.dep_id),
				dep_name: this.selecteddepartment.dep_name,
				emp_id: Number(this.selectedemployee.emp_id),
				emp_name: this.selectedemployee.emp_name
			};

			this.Corridor_supervisionDataService.addCorridor_supervision(val).subscribe(res => {
				alert(res.toString());
				this.Corridor_supervisionDataService.BClicked("b2");
				this.form1.reset();
				this.selectedcorridor = [];
				this.selecteddepartment = [];
				this.selectedemployee = [];
				
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
	}

	update_corridor_supervision() {

		if (this.form1.invalid) {
			this.form1.markAllAsTouched();
		} else {

			var val = {

				supervision_id: Number(this.Corridor_supervisionDataService.supervision_id),
				corridor_id: Number(this.selectedcorridor.corridor_id),
				basic_emp_id: Number(this.selectedemployee.emp_id),
				basic_emp_name: this.selectedemployee.emp_name,
				spare_emp_id: Number(this.spare_emp_id),
				spare_emp_name: this.spare_emp_name,
				from_date: this.from_date,
				to_date: this.to_date,
				corridor_name: this.selectedcorridor.corridor_name,
				dep_id: Number(this.selecteddepartment.dep_id),
				dep_name: this.selecteddepartment.dep_name,
				emp_id: Number(this.selectedemployee.emp_id),
				emp_name: this.selectedemployee.emp_name

			};

			this.Corridor_supervisionDataService.updateCorridor_supervision(val).subscribe(res => {
				alert(res.toString());
				this.Corridor_supervisionDataService.BClicked("b2");
				this.is_edit=false;
				this.form1.reset();
				this.selectedcorridor = [];
				this.selecteddepartment = [];
				this.selectedemployee = [];
				this.is_edit=false;
			},error => {console.log();
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
	

	filteredOptionCorr: Observable<any[]>;

    private _filterCorr(value: string) {
        const filterValue = value.toLowerCase();
        return this.corridors.filter(option => option.corridor_name.toLowerCase().includes(filterValue));
    }

    displayFnCorr(selectedoption) {
        return selectedoption ? selectedoption.corridor_name : undefined;
    }


    filteredOptionDept: Observable<any[]>;

    private _filterDept(value: string) {
        const filterValue = value.toLowerCase();
        return this.departments.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }

    displayFnDept(selectedoption) {
        return selectedoption ? selectedoption.dep_name : undefined;
    }

	
    change_dept(event) {
		if(event !== null && event !== undefined && event.length !== 0){
			this.EmployeeDataService.GetAllEmployee_of_department(event.dep_id)
			.subscribe(data => this.employees = data,
			error => console.log(),
			() => {
				this.filteredOptions = this.myControl.valueChanges
					.pipe(
						startWith(''),
						map(value => value ? typeof value === 'string' ? value : value.emp_name : ''),
						map(emp_name => emp_name ? this._filter(emp_name) : this.employees.slice())
					);
			});
		}
		
    }

	
	change_Corr(){
		this.corridorsDataService.GetAllCorridors()
			.subscribe(data => this.corridors = data,
			error => console.log(), 
			() => {
				this.filteredOptionCorr = this.myControlCorr.valueChanges
					.pipe(
						startWith(''),
						map(value => value ? typeof value === 'string' ? value : value.corridor_name : ''),
						map(corridor_name => corridor_name ? this._filterCorr(corridor_name) : this.corridors.slice())
					);
		});
	}


	filteredOptions: Observable<any[]>;
	private _filter(value: string) {
		const filterValue = value.toLowerCase();
		return this.employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
	}
	displayFn(selectedoption) {
		return selectedoption ? selectedoption.emp_name : undefined;
	}

	deptVar:any=[];
	corridorVar: any=[];
    anotherDeptArray:Departments[]=[];
    anotherEmpArray:Employee[]=[];
	anotherCorridorArray: corridor[] = [];

	priv_info:any=[];
	
is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

		this.corridorsDataService.GetAllCorridors()
			.subscribe(data => this.corridors = data,
			error => console.log(), 
			() => {
				this.filteredOptionCorr = this.myControlCorr.valueChanges
					.pipe(
						startWith(''),
						map(value => value ? typeof value === 'string' ? value : value.corridor_name : ''),
						map(corridor_name => corridor_name ? this._filterCorr(corridor_name) : this.corridors.slice())
					);
		});

		this.DepartmentDataService.GetAlldepartment()
		.subscribe(data => this.departments = data,
		error => console.log(), 
		() => {
			this.filteredOptionDept = this.myControlDept.valueChanges
				.pipe(
					startWith(''),
					map(value => value ? typeof value === 'string' ? value : value.dep_name : ''),
					map(dep_name => dep_name ? this._filterDept(dep_name) : this.departments.slice())
				);
		});

	
		this.Corridor_supervisionDataService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
				this.supervision_id = Number(this.Corridor_supervisionDataService.supervision_id);
				this.basic_emp_name = this.Corridor_supervisionDataService.basic_emp_name;
				this.spare_emp_id = this.Corridor_supervisionDataService.spare_emp_id;
				this.spare_emp_name = this.Corridor_supervisionDataService.spare_emp_name;
				this.from_date = this.Corridor_supervisionDataService.from_date;
				this.to_date = this.Corridor_supervisionDataService.to_date;
				this.corridor_name = this.Corridor_supervisionDataService.corridor_name;
				this.dep_name = this.Corridor_supervisionDataService.dep_name;
				this.emp_id = this.Corridor_supervisionDataService.emp_id;
				this.emp_name = this.Corridor_supervisionDataService.emp_name;

				this.corridorsDataService.GetAllCorridors_with_id
				(Number(this.Corridor_supervisionDataService.corridor_id))
				.subscribe(data => this.anotherCorridorArray = data,
					error => console.log(),
					() => {

						// Get Corridor Object 
						var corr_id = this.Corridor_supervisionDataService.corridor_id;
						this.corridorVar = this.anotherCorridorArray[this.anotherCorridorArray.findIndex(function (el) {
				
							return el.corridor_id == Number(corr_id);
						})];
						
						this.selectedcorridor = this.corridorVar;

						this.DepartmentDataService.GetAlldepartment()
						.subscribe(data => this.anotherDeptArray = data,
							error => console.log(),
							() => {
								// Get Department Object 
								var id = this.Corridor_supervisionDataService.dep_id;
								this.deptVar = this.anotherDeptArray[this.anotherDeptArray.findIndex(function (el) {
						
									return el.dep_id == id;
								})];
								
								this.selecteddepartment = this.deptVar;
								
								// Get Employee Object 
								var emp_id = this.Corridor_supervisionDataService.emp_id;

								this.EmployeeDataService.GetAllEmployee_with_id(emp_id)
								.subscribe(data => this.anotherEmpArray = data,
									error => console.log(),
								() => {
									this.selectedemployee = this.anotherEmpArray[0];
								});
								
						});
				});

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
		
	}
}

