import { Component,ChangeDetectorRef, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MasterJobsDataService } from '../../../../../Services/MasterJobsDataService';
import { MasterJobMaster, MasterJob } from '../../../../../MasterJobMaster.Model';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Takeem_masterDataService } from '../../../../../Services/Takeem_masterDataService';
import { Takeem_master } from '../../../../../Takeem_masterMaster.Model';

import { teams_and_groupsDataService } from '../../../../../Services/teams_and_groupsDataService';
import { teams_and_groups,teams_and_groupsMaster } from '../../../../../teams_and_groupsMaster.Model';

import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee,EmployeeMaster } from '../../../../../EmployeeMaster.Model';

import { DepartmentDataService } from '../../../../../Services/DepartmentDataService';
import { DepartmentMaster,Departments } from '../../../../../DepartmentMaster.Model';
import * as def from '../../../../../definationsMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
	selector: 'kt-toolbar',
	templateUrl: './toolbar.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-icon {
		padding: 0 14px;
	}
	.example-spacer {
		flex: 1 1 auto;
	}
	`]
})
export class ToolbarComponent implements OnInit {
	
	jobs: MasterJob[];
	departments: Departments[];
	takeem_master: Takeem_master[];
	label_name:any;
	ghat: def.gha[];

	form1: FormGroup;
	constructor(
		private modalService: NgbModal,
		private cdRef:ChangeDetectorRef,
		private router: Router, public _fb: FormBuilder, private user_privDataService: user_privDataService,
		private DepartmentDataService:DepartmentDataService,
		private EmployeeDataService:EmployeeDataService,
		private teams_and_groupsDataService:teams_and_groupsDataService,
		private Takeem_masterDataService: Takeem_masterDataService) {

			this.form1 = this._fb.group({
			selectedghat: ['', [Validators.required]]

		});

			this.EmployeeDataService.Getdefinations_with_scode("gha")
			.subscribe(data => this.ghat = data,
				error => console.log());

		this.label_name=" قسم "
	}

    openModal(content: any, event: any){

        this.modalService.open(content,{backdrop:true,size:"xl",});
    }
	
	department: Departments[];
	emp: Employee[];
	teams: teams_and_groups[];
	show:any;
	selecteddepartment:any =[];
	selectedemp:any =[];
	selectedteam:any =[];
	selectedghat:any =[];
	evaluation_date:any =[];

	def_change(event){
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.def_id== 56)
			{
				this.show = 3
				
				this.teams_and_groupsDataService.GetAllteams_and_groups()
				.subscribe(data => this.teams = data,
					error => console.log(),
					() => {
						var selected_team = String(this.Takeem_masterDataService.evaluation_subject_id);
						
						this.selectedteam = this.teams[this.teams.findIndex(function (el) {	
							return String(el.id) == selected_team;
						})];

					});

			}
			else if (event.def_id== 57)
			{
				this.show = 2
			
				this.EmployeeDataService.GetAllEmployee().subscribe(data => this.emp = data,
					error => console.log(),
					() =>
					{
						console.log();
						var selected_emp = String(this.Takeem_masterDataService.evaluation_subject_id);
							this.selectedteam = this.emp[this.emp.findIndex(function (el) {	
								return String(el.emp_id) == selected_emp;
							})];
					});
			}
			else if (event.def_id== 58)
			{
				this.show = 1
				
				this.DepartmentDataService.GetAlldepartment().subscribe(data => this.department = data,
				error => console.log(),
				() => 
				{
					var selected_dep = String(this.Takeem_masterDataService.evaluation_subject_id);
					this.selecteddepartment = this.department[this.department.findIndex(function (el) {	
						return String(el.dep_id) == selected_dep;
					})];
				});
			}
		}

	}
	add_takeem_master() {
		
		if (this.show === 1)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selecteddepartment.dep_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selecteddepartment.dep_id;

		}
		else if (this.show === 2)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selectedemp.emp_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedemp.emp_id;

		}
		else if (this.show === 3)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selectedteam.name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedteam.id;
		}

		this.Takeem_masterDataService.evaluation_object_name=this.selectedghat.def_name;
		this.Takeem_masterDataService.evaluation_object_id=this.selectedghat.def_id;
		this.Takeem_masterDataService.evaluation_date=this.evaluation_date;

		this.Takeem_masterDataService.CClicked("");
		this.Takeem_masterDataService.AFTERsaveClicked("");
		this.form1.reset();
		this.selecteddepartment =[];
		this.selectedemp =[];
		this.selectedghat =[];
		this.selectedteam =[];
	}

	update_takeem_master() {

		if (this.show === 1)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selecteddepartment.dep_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selecteddepartment.dep_id;
		}
		else if (this.show === 2)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selectedemp.emp_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedemp.emp_id;
		}
		else if (this.show === 3)
		{
			this.Takeem_masterDataService.evaluation_subject=this.selectedteam.name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedteam.id;
		}

		this.Takeem_masterDataService.evaluation_object_name=this.selectedghat.def_name;
		this.Takeem_masterDataService.evaluation_object_id=this.selectedghat.def_id;
		this.Takeem_masterDataService.evaluation_date=this.evaluation_date;

		this.Takeem_masterDataService.EClicked("");
		this.Takeem_masterDataService.AFTERsaveClicked("");
		this.form1.reset();
		this.selecteddepartment =[];
		this.selectedemp =[];
		this.selectedghat =[];
		this.selectedteam =[];
		
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
		
		this.Takeem_masterDataService.aClickedEvent
		.subscribe((data: string) => {
			this.is_edit=true;			
			this.evaluation_date = this.Takeem_masterDataService.evaluation_date;
			
			var selected_object = String(this.Takeem_masterDataService.evaluation_object_id);
			this.selectedghat = this.ghat[this.ghat.findIndex(function (el) {	
				return String(el.def_id) == selected_object;
			})];


			this.EmployeeDataService.GetAllEmployee().subscribe(data => this.emp = data,
				error => console.log(),
				() =>{
					var selected_emp = String(this.Takeem_masterDataService.evaluation_subject_id);
					this.selectedemp = this.emp[this.emp.findIndex(function (el) {	
						return String(el.emp_id) == selected_emp;
					})];

				});

			if (Number(this.Takeem_masterDataService.evaluation_object_id)== 56)
			{
				this.show = 3
				
			}
			else if (Number(this.Takeem_masterDataService.evaluation_object_id)== 57)
			{
				this.show = 2
				
			
			}
			else if (Number(this.Takeem_masterDataService.evaluation_object_id)== 58)
			{
				this.show = 1
				
			}
		
				
			// open modal
			var ele = document.getElementById('modalOpener');
			if (ele) { ele.click() }
	 	});

		

	}
}
