import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
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
	selector: 'kt-sidenav',
	templateUrl: './sidenav.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-container {
		width: 400px;
		height: 200px;
		margin: 10px;
		border: 1px solid #555;
	  }
	  .example-container {
		width: 500px;
		height: 300px;
		border: 1px solid rgba(0, 0, 0, 0.5);
	  }
	  .example-sidenav-content {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
	  }
	  .example-sidenav {
		padding: 20px;
	  }
	`]
})
export class SidenavComponent implements OnInit {
	@Input() takeem_master_data: any;
	// selectedteam: any;
	
	takeem_id: number;
	evaluation_id: string = "";
	evaluation_object: string = "";
	evaluation_object_name: string = "";
	evaluation_subject: string = "";
	evaluation_subject_id: string = "";
	the_object_id: string = "";
	evaluation_date: string = "";

	takeem_master: Takeem_master[];
label_name:any;
ghat: def.gha[];
	constructor(private modalService: NgbModal,
		private cdRef: ChangeDetectorRef,
		private router: Router, private user_privDataService: user_privDataService,
		private DepartmentDataService:DepartmentDataService,
		private EmployeeDataService:EmployeeDataService,
		private teams_and_groupsDataService:teams_and_groupsDataService,
		private Takeem_masterDataService: Takeem_masterDataService) {
			this.EmployeeDataService.Getdefinations_with_scode("gha").subscribe(data => this.ghat = data,
				error => console.log(error),
				() => console.log("ok"));
		this.label_name=" قسم "
	}

	foods = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];

	// teams = [
	// 	{ value: '1', viewValue: 'فريق1' },
	// 	{ value: '2', viewValue: 'فريق2' },
	// 	{ value: '3', viewValue: 'فريق3' }
	// ];

	gehat = [
		{ value: '1', viewValue: 'قسم' },
		{ value: '2', viewValue: 'موظف' },
		{ value: '3', viewValue: 'مدرس' }
	];

	exampleBasicSidenav;
	exampleBasicDrawer;
	exampleAutosizeSidenav;
department: Departments[];
emp: Employee[];
teams: teams_and_groups[];
show:any;
selecteddepartment:any;
selectedemp:any;
selectedteam:any;
selectedghat:any;
	shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
	showFiller = false;
	def_change(event){
	
		console.log(event.def_id);
		if (event.def_id== 56)
		{
			this.show = 3
			
			console.log(event.def_id,"hm");
		this.teams_and_groupsDataService.GetAllteams_and_groups().subscribe(data => this.teams = data,
			error => console.log(error),
			() => console.log("ok"));
			var selected_team = String(this.Takeem_masterDataService.evaluation_subject_id);
                this.selectedteam = this.teams[this.teams.findIndex(function (el) {	
                    return String(el.id) == selected_team;
                })];
		}
		else if (event.def_id== 57)
		{
			this.show = 2
		
			console.log(event.def_id,"hm1");
		this.EmployeeDataService.GetAllEmployee().subscribe(data => this.emp = data,
			error => console.log(error),
			() => console.log("ok"));
			var selected_emp = String(this.Takeem_masterDataService.evaluation_subject_id);
                this.selectedteam = this.emp[this.emp.findIndex(function (el) {	
                    return String(el.emp_id) == selected_emp;
                })];
		}
		else if (event.def_id== 58)
		{
			this.show = 1
			
			console.log(event.def_id,"hm1");
		this.DepartmentDataService.GetAlldepartment().subscribe(data => this.department = data,
			error => console.log(error),
			() => console.log("ok"));
			var selected_dep = String(this.Takeem_masterDataService.evaluation_subject_id);
			this.selecteddepartment = this.department[this.department.findIndex(function (el) {	
				return String(el.dep_id) == selected_dep;
			})];
		}

	}
	add_takeem_master() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		// var val = {
	
		// 	evaluation_id: Number(this.evaluation_id),
		// 	evaluation_object: Number(this.evaluation_object),
		// 	evaluation_object_name: this.selectedteam.evaluation_object_name,
		// 	evaluation_subject: this.evaluation_subject,
		// 	evaluation_subject_id: Number(this.evaluation_subject_id),
		// 	the_object_id: Number(this.the_object_id),
		// 	evaluation_date: this.evaluation_date

		// };
		// console.log("asd", val)
		// this.Takeem_masterDataService.addTakeem_master(val).subscribe(res => {
		// 	alert(res.toString());
		// })
		// console.log(val)
		console.log(this.show)
		if (this.show === 1)
		{
			console.log("1");
			this.Takeem_masterDataService.evaluation_subject=this.selecteddepartment.dep_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selecteddepartment.dep_id;
		}
		else if (this.show === 2)
		{
			console.log("2");
			this.Takeem_masterDataService.evaluation_subject=this.selectedemp.emp_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedemp.emp_id;
		}
		else if (this.show === 3)
		{
			console.log("3");
			this.Takeem_masterDataService.evaluation_subject=this.selectedteam.name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedteam.id;
		}
		this.Takeem_masterDataService.evaluation_object_name=this.selectedghat.def_name;
		this.Takeem_masterDataService.evaluation_object_id=this.selectedghat.def_id;
		this.Takeem_masterDataService.evaluation_date=this.evaluation_date;
		console.log("dataservice", this.Takeem_masterDataService)
		this.Takeem_masterDataService.CClicked("");
		this.Takeem_masterDataService.AFTERsaveClicked("");
	}

	update_takeem_master() {

		console.log(this.show)
		if (this.show === 1)
		{
			console.log("1");
			this.Takeem_masterDataService.evaluation_subject=this.selecteddepartment.dep_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selecteddepartment.dep_id;
		}
		else if (this.show === 2)
		{
			console.log("2");
			this.Takeem_masterDataService.evaluation_subject=this.selectedemp.emp_name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedemp.emp_id;
		}
		else if (this.show === 3)
		{
			console.log("3");
			this.Takeem_masterDataService.evaluation_subject=this.selectedteam.name;
			this.Takeem_masterDataService.evaluation_subject_id=this.selectedteam.id;
		}
		this.Takeem_masterDataService.evaluation_object_name=this.selectedghat.def_name;
		this.Takeem_masterDataService.evaluation_object_id=this.selectedghat.def_id;
		this.Takeem_masterDataService.evaluation_date=this.evaluation_date;
		console.log("dataservice", this.Takeem_masterDataService)
		this.Takeem_masterDataService.EClicked("");
		this.Takeem_masterDataService.AFTERsaveClicked("");
		this.is_edit=false;
	}
	cancel_takeem_master() {
		this.is_edit=false;
	}

	priv_info:any;
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 
		this.Takeem_masterDataService.aClickedEvent
		.subscribe((data: string) => {
				//	(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				//(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
		 	//	(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				//(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;
		console.log("testdclick1111",this.Takeem_masterDataService);
		this.evaluation_date = this.Takeem_masterDataService.evaluation_date;
		var selected_object = String(this.Takeem_masterDataService.evaluation_object_id);
		this.selectedghat = this.ghat[this.ghat.findIndex(function (el) {	
			return String(el.def_id) == selected_object;
		})];
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

	
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		// this.Takeem_masterDataService.aClickedEvent
		// 	.subscribe((data: string) => {
		// 		console.log("edited");
		// 		(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
		// 		(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
		// 		(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
		// 		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;


		// 		this.takeem_id = Number(this.Takeem_masterDataService.takeem_id);

		// 		this.evaluation_id = this.Takeem_masterDataService.evaluation_id;
		// 		this.evaluation_object = this.Takeem_masterDataService.evaluation_object;
		// 		this.evaluation_object_name = this.Takeem_masterDataService.evaluation_object_name;
		// 		this.evaluation_subject = this.Takeem_masterDataService.evaluation_subject;
		// 		this.evaluation_subject_id = this.Takeem_masterDataService.evaluation_subject_id;
		// 		this.the_object_id = this.Takeem_masterDataService.the_object_id;

		// 		this.evaluation_date = this.Takeem_masterDataService.evaluation_date;


		// 		var selected_value_team = this.Takeem_masterDataService.takeem_id;
		// 		this.selectedteam = this.takeem_master[this.takeem_master.findIndex(x => x.takeem_id === selected_value_team)];

		// 	});
		var test1

		

	}

	display = "";
	openModal(content: any, event: any) {

		this.modalService.open(content, { backdrop: true, size: "xl", });
	}
	openModal1() {
		this.display = "show";
		console.log("clicked")
		this.cdRef.detectChanges();
	}
	onCloseHandled() {
		this.display = "";
	}
}
