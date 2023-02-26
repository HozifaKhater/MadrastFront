import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { teams_and_groupsDataService } from '../../../../Services/teams_and_groupsDataService';
import { teams_and_groupsMaster, teams_and_groups } from '../../../../teams_and_groupsMaster.Model';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { Employee } from '../../../../EmployeeMaster.Model';
import * as def from '../../../../definationsMaster.Model';
import { DepartmentDataService } from '../../../../Services/DepartmentDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../Services/user_privDataService ';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['dropdown.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [NgbDropdownConfig] // add NgbDropdownConfig to the component providers
})
export class DropdownComponent implements OnInit {
	@Input() team_data: any;
	id: number;
	type_id: string = "";
	type_name: string = "";
	name: string = "";
	goals: string = "";
	is_edit:boolean=false;
    selecteddepartment: any =[];
    departments: any =[];
    disabled_emp: any;
    employeedepartment: any=[];
	exampleDropdown;
	exampleManualTriggers;
	exampleButtonGroupsAndSplitButtons;
	exampleGlobalConfigurationOfDropdowns;
    Employees: Employee[];
	form1: FormGroup;
	teams_type:def.teams[];
    constructor(
		private cdRef:ChangeDetectorRef,
		private modalService: NgbModal,
		private router: Router, private user_privDataService: user_privDataService,
		public _fb: FormBuilder, 
		private DepartmentService: DepartmentDataService,
		private EmployeeService: EmployeeDataService,
		config: NgbDropdownConfig, 
		private teams_and_groupsDataService: teams_and_groupsDataService) {
		
	
		this.form1 = this._fb.group({
			selecteddepartment: ['', [Validators.required]],
            name: ['', [Validators.required]],
            employeedepartment: ['', [Validators.required]],
			employeedepartment1: ['']
       
        });
		
		config.autoClose = true;
		this.DepartmentService.GetAllMasterdepartment().subscribe(data => this.departments = data,
			error => console.log());

        this.EmployeeService.GetAllEmployee().subscribe(data => this.Employees = data,
            error => console.log());

			this.EmployeeService.Getdefinations_with_scode("teams_type").subscribe(data => this.teams_type = data,
				error => console.log());
	}

	openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }

	employeedepartment1:any;
	selectedteam:any;

	add_team() {
		
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
		var val = {

			type_id: Number(this.selectedteam.def_id),
			type_name: this.selectedteam.def_name,
			name: this.name,
			goals: this.goals,
			emp_name: this.employeedepartment.emp_name	,
			emp_id:Number(this.employeedepartment.emp_id)	,
			dep_id: Number(this.selecteddepartment.dep_id)	,
			dep_name	: this.selecteddepartment.dep_name	

		};
		this.teams_and_groupsDataService.addteams_and_groups(val).subscribe(res => {
			var returned_id=res.toString();
			for (let i = 0; i < this.employeedepartment1.length; i++) {
			var val2 = {
				team_id	: Number(returned_id)	,
				team_name	: this.name,
				emp_name	: this.employeedepartment1[i].emp_name	,
				emp_id	: Number(this.employeedepartment1[i].emp_id)	,


			};
			this.teams_and_groupsDataService.addteams_and_groups_details(val2).subscribe(res => {
			
			})
		}
		alert("Saved Successfully");
		this.teams_and_groupsDataService.BClicked("");
		this.form1.reset();
		},error => {console.log(error);
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
	//corridorsDataService: corridorsDataService;
	update_team() {
		if (this.form1.invalid) {
            this.form1.markAllAsTouched();
        } else {
		var val = {
			id: Number(this.id),

			type_id: Number(this.selectedteam.def_id),
			type_name: this.selectedteam.def_name,
			name: this.name,
			goals: this.goals,
			emp_name	: this.employeedepartment.emp_name	,
			emp_id	:Number(this.employeedepartment.emp_id)	,
			dep_id	: Number(this.selecteddepartment.dep_id)	,
			dep_name	: this.selecteddepartment.dep_name
		};


		this.teams_and_groupsDataService.updateteams_and_groups(val).subscribe(res => {
		
			this.teams_and_groupsDataService.deleteteams_and_groups_details({ id: this.teams_and_groupsDataService.id }).subscribe(res => {
			
				if(this.employeedepartment1 !== null && this.employeedepartment1 !== undefined){

					for (let i = 0; i < this.employeedepartment1.length; i++) {
						var val = {
							team_id	: Number(this.teams_and_groupsDataService.id)	,
							team_name	:  " ",
							emp_name	: this.employeedepartment1[i].emp_name	,
							emp_id	: Number(this.employeedepartment1[i].emp_id)	,
			
						};
						this.teams_and_groupsDataService.addteams_and_groups_details(val).subscribe(res => {
						})
					}
				}
            });
			alert("Updated Successfully");
			this.teams_and_groupsDataService.BClicked("");
			this.is_edit=false;
			this.form1.reset();
			
			this.is_edit=false;
		},error => {console.log(error);
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


	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});
		

		this.teams_and_groupsDataService.aClickedEvent
			.subscribe((data: string) => {

				this.is_edit=true;
				this.id = Number(this.teams_and_groupsDataService.id);
				this.type_id = this.teams_and_groupsDataService.type_id;
				this.type_name = this.teams_and_groupsDataService.type_name;
				this.name = this.teams_and_groupsDataService.name;
				this.goals = this.teams_and_groupsDataService.goals;

				var selected_dep = this.teams_and_groupsDataService.dep_id
                this.selecteddepartment = this.departments[this.departments.findIndex(function (el) {
                    return String(el.dep_id) == selected_dep
                })];

				var selected_emp = this.teams_and_groupsDataService.emp_id
                this.employeedepartment = this.Employees[this.Employees.findIndex(function (el) {
                    return String(el.emp_id) == selected_emp
                })];

				var selected_type = this.teams_and_groupsDataService.type_id
                this.selectedteam = this.teams_type[this.teams_type.findIndex(function (el) {
                    return String(el.def_id) == selected_type
				})];

				// open modal
				var ele = document.getElementById('modalOpener');
				if (ele) { ele.click() }

			});
	
	}
}
