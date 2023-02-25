import { Component, OnInit, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
import { swotDataService } from '../../../../../Services/swotDataService';
import { swot,swotMaster } from '../../../../../swotMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-swot',
	templateUrl: './swot.component.html',
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
export class swotComponent implements OnInit {

	@Input() department_data: any;
	ser	:string="";
	dep_id	:string="";
	dep_name	:string="";
	strength	:string="";
	weakness	:string="";
	chances	:string="";
	risks	:string="";

	dep_nameSelected: string;
	
	Employees: Employee[];
	departments: Departments[];
	selecteddepartment: any;
	
	checked = false;
	indeterminate = false;
	align = 'start';
	disabled = false;
	labelPosition: string = 'before';
	myValue: boolean = true;
    myControl = new FormControl('');
    form1: FormGroup;

	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder,private DepartmentService: DepartmentDataService, private swotDataService: swotDataService) {
        this.form1 = this._fb.group({
			myControl: [[Validators.required]]
		      
        });
	}
 
	add_department() {

        if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
		var val = {
			dep_id: this.selecteddepartment.dep_id,
			dep_name: this.selecteddepartment.dep_name,
			strength: this.strength	,
			weakness: this.weakness	,
			chances: this.chances	,
			risks: this.risks	,
			
		};

		this.swotDataService.save_in_swot(val).subscribe(res => {
			alert("Added Successfully");
			this.swotDataService.BClicked('Component B is clicked!!');
			this.form1.reset();
			})
			
            this.form1.reset();

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
            
            var val = {
				ser:this.ser,
				dep_id: this.selecteddepartment.dep_id,
				dep_name: this.selecteddepartment.dep_name,
				strength: this.strength	,
				weakness: this.weakness	,
				chances: this.chances	,
				risks: this.risks	,
				
            };

            this.swotDataService.update_swot(val).subscribe(res => {
                alert("Updated Succesfully");
                this.swotDataService.BClicked('Component B is clicked!!');
                this.form1.reset();
                
                this.selecteddepartment = '';
                
            })
        }
	}
    

    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.departments.filter(option => option.dep_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
        return this.selecteddepartment ? this.selecteddepartment.dep_name : undefined;
    }

	anotherDepArray:Departments[];
   	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});

        this.DepartmentService.GetAlldepartment().subscribe(data => this.departments = data,
            error => console.log(),
            () => {
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => value? typeof value === 'string' ? value : value.dep_name : ''),
                        map(dep_name => dep_name ? this._filter(dep_name) : this.departments.slice())
                    );
            });
				
		this.swotDataService.aClickedEvent
			.subscribe((data: string) => {

				this.ser	=	this.swotDataService.ser	;
				this.dep_id = this.swotDataService.dep_id;
				this.dep_name = this.swotDataService.dep_name;
				this.strength	=	this.swotDataService.strength	;
				this.weakness	=	this.swotDataService.weakness	;
				this.chances	=	this.swotDataService.chances	;
				this.risks	=	this.swotDataService.risks	;
				this.dep_nameSelected = this.swotDataService.dep_name;


				var dep_id = this.swotDataService.dep_id;
				//this.selecteddepartment = this.departments[this.departments.findIndex(x => x.dep_id === selected_value_emp )];//Number(this.DepartmentService.dep_supervisor_id)
				
				this.DepartmentService.GetAlldepartment_with_id(Number(dep_id))
				.subscribe(data => this.anotherDepArray = data,
					error => console.log(),
					() => {
						
						this.selecteddepartment = this.anotherDepArray[0];
					});

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }
				
		});
	
	}

	changeLablesPositions() {
		this.labelPosition = this.labelPosition === 'before' ? 'after' : 'before';
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
