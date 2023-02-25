import { Component,ChangeDetectorRef ,OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster, Departments } from '../../../../../DepartmentMaster.Model';
import { Http, Response, Headers } from '@angular/http';
import { Input } from '@angular/core';
import { ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { CustomerModel } from '../../../../../core/e-commerce';
import { CustomersListComponent } from '../../../apps/e-commerce/customers/customers-list/customers-list.component';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { EmployeeMaster, Employee } from '../../../../../EmployeeMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-checkbox',
	templateUrl: './checkbox.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
		.example-h2 {
			margin: 10px;
		}
		.example-section {
			display: flex;
			align-content: center;
			align-items: center;
			height: 60px;
		}
		.example-margin {
			margin: 0 10px;
		}
	`
	]
	/*,providers: [DepartmentDataService]*/
})
export class CheckboxComponent implements OnInit {

	@Input() department_data: any;
	dep_id: string = "";
	dep_name: string = "";

	dep_desc: string = "";
	dep_supervisor_id: string = "";
	dep_supervisor_name: string = "";


	Employees: Employee[]=[];
	departments: Departments[]=[];
	selecteddepartment: any=[];
	employeedepartment: any=[];
	
	
	checked = false;
	indeterminate = false;
	align = 'start';
	disabled = false;
	labelPosition: string = 'before';
	myValue: boolean = true;
    myControl = new FormControl('');
    form1: FormGroup;

	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,private DepartmentService: DepartmentDataService, 
		private EmployeeService: EmployeeDataService) {

        this.form1 = this._fb.group({

        });

		this.DepartmentService.GetAllMasterdepartment()
		.subscribe(data => this.departments = data,
			error => console.log());
	
	}
	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	employeeSearch = '';
	filterEmployees(srchTxt){
		
		if(srchTxt && srchTxt != ''){
			this.filteredEmployees = this.Employees.filter(employee=> employee.emp_name.toLowerCase().indexOf(srchTxt) > -1);
		}


	}

	butDisabled: boolean;

	onChange(): void {
		this.dep_name = "adasd";
		
	}

	add_department() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
           	var chck: number;

			if (this.butDisabled == true) {
				chck = 0
			}
			if (this.butDisabled == false)
			{
				chck = Number(this.selecteddepartment.dep_id);
			};

			var val = {

				dep_name: this.dep_name,
				dep_desc: this.dep_desc,
				dep_supervisor_id: this.employeedepartment.emp_id,
				dep_supervisor_name: this.employeedepartment.emp_name,
				parent_id: Number(chck)
			};



			this.DepartmentService.addDepartment(val).subscribe(res => {
				alert("Added Successfully");
				this.DepartmentService.BClicked('Component B is clicked!!');
				
				this.DepartmentService.GetAllMasterdepartment()
				.subscribe(data => this.departments = data,
					error => console.log());

				this.butDisabled = true;
				this.selecteddepartment = '';
				this.myControl.reset();
				this.employeedepartment = [];

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

    isControlHasError(controlName: string, validationType: string): boolean {
        const control = this.form1.controls[controlName];
        if (!control) {
            return false;
        }

        const result = control.hasError(validationType) && (control.dirty || control.touched);
        return result;
    }

	initModelForm(): FormGroup {
		return this._fb.group({
			otherControls: [''],
			// The formArray, empty 
			myChoices: new FormArray([]),
		})
	}

	myForm: FormGroup = this.initModelForm();

	onCheckChange(event) {
		const formArray: FormArray = this.myForm.get('myChoices') as FormArray;

		/* Selected */
		if (event.target.checked) {
			// Add a new control in the arrayForm
			formArray.push(new FormControl(event.target.value));
		}
		/* unselected */
		else {
			// find the unselected element
			let i: number = 0;

			formArray.controls.forEach((ctrl: FormControl) => {
				if (ctrl.value == event.target.value) {
					// Remove the unselected element from the arrayForm
					formArray.removeAt(i);
					return;
				}

				i++;
			});
		}
    }

    update_department() {
        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
            var department;
            department = this.departments[this.selecteddepartment];
            var emp;
            emp = this.Employees[this.employeedepartment];
            var chck;

			if (this.butDisabled == true) {
                chck = 0
            }
            if (this.butDisabled == false) {
                chck = Number(this.selecteddepartment.dep_id);
            };

            var val = {
                dep_id: Number(this.DepartmentService.dep_id),
                dep_name: this.dep_name,
                dep_desc: this.dep_desc,
                dep_supervisor_id: Number(this.employeedepartment.emp_id),
                dep_supervisor_name: this.employeedepartment.emp_name,
                parent_id: Number(chck)
            };

            this.DepartmentService.updateDepartment(val).subscribe(res => {
                alert(res.toString());
                this.DepartmentService.BClicked('Component B is clicked!!');
				this.is_edit=false;
				this.DepartmentService.GetAllMasterdepartment().subscribe(data => this.departments = data,
					error => console.log());

                this.butDisabled = true;
                this.selecteddepartment = '';
                this.myControl.reset();

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
				}
			)
        }
	}
	
    
	side_dep_chck_change(event) {
		
		if (event.checked == true) {
			this.butDisabled = false;
		}
		if (event.checked === false) {
			this.butDisabled = true;
		}
	}

    dep_check: any;
    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
    
    priv_info:any=[];
	filteredEmployees : Employee[] = [];
	is_edit:boolean=false;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			}); 

        this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
            error => console.log(),
            () => {
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.emp_name),
                        map(emp_name => emp_name ? this._filter(emp_name) : this.Employees.slice())
                    );

					this.filteredEmployees = this.Employees;
            });
		
		this.butDisabled = true;
				
		this.DepartmentService.aClickedEvent
			.subscribe((data: string) => {
				this.is_edit=true;
                this.dep_check = false;
                this.butDisabled = true
				if (Number(this.DepartmentService.parent_id) != 0) {
					this.dep_check = true;
					var selected_value = this.DepartmentService.parent_id
					this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
						return el.dep_id == selected_value
					})]
                    this.butDisabled=false
                }
				
				this.dep_id = this.DepartmentService.dep_id;
				this.dep_name = this.DepartmentService.dep_name;
				this.dep_desc = this.DepartmentService.dep_desc;
				this.departments[this.DepartmentService.dep_id];

				var selected_value_emp = this.DepartmentService.dep_supervisor_id;
				this.employeedepartment = this.Employees[this.Employees.findIndex(x => x.emp_id === selected_value_emp )];//Number(this.DepartmentService.dep_supervisor_id)

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});

	}

	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
	}

	
}
