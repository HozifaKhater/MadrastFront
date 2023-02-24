import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Takeem_masterDataService } from '../../../../../Services/Takeem_masterDataService';
import { Takeem_master } from '../../../../../Takeem_masterMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
@Component({
	selector: 'kt-branch_stat',
	templateUrl: './branch_stat.component.html',
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
export class branchComponent implements OnInit {
	@Input() takeem_master_data: any;
	selectedteam: any;
	
	takeem_id: number;
	evaluation_id: string = "";
	evaluation_object: string = "";
	evaluation_object_name: string = "";
	evaluation_subject: string = "";
	evaluation_subject_id: string = "";
	the_object_id: string = "";
	evaluation_date: string = "";

	takeem_master: Takeem_master[];

	constructor(
		private router: Router, private user_privDataService: user_privDataService,
		private Takeem_masterDataService: Takeem_masterDataService) {}

	

	exampleBasicSidenav;
	exampleBasicDrawer;
	exampleAutosizeSidenav;

	

	add_takeem_master() {
		//var test1
		//test1 = this.departments[this.selecteddepartment]
		//var schoolterm
		//schoolterm = this.activities[this.activity_school_term]
		var val = {
	
			evaluation_id: Number(this.evaluation_id),
			evaluation_object: Number(this.evaluation_object),
			evaluation_object_name: this.selectedteam.evaluation_object_name,
			evaluation_subject: this.evaluation_subject,
			evaluation_subject_id: Number(this.evaluation_subject_id),
			the_object_id: Number(this.the_object_id),
			evaluation_date: this.evaluation_date

		};
		console.log("asd", val)
		this.Takeem_masterDataService.addTakeem_master(val).subscribe(res => {
			alert(res.toString());
		})
		console.log(val)
	}

	update_takeem_master() {

		/*console.log("emp", emp, this.employeedepartment );*/
		var val = {


			takeem_id: Number(this.takeem_id),
			evaluation_id: Number(this.evaluation_id),
			evaluation_object: Number(this.evaluation_object),
			evaluation_object_name: this.evaluation_object_name,
			evaluation_subject: this.evaluation_subject,
			evaluation_subject_id: Number(this.evaluation_subject_id),
			the_object_id: Number(this.the_object_id),
			evaluation_date: this.evaluation_date


		};

		console.log("val", val);


		this.Takeem_masterDataService.updateTakeem_master(val).subscribe(res => {
			alert(res.toString());
			(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
			(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
			(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
			(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		})

	}
	cancel_takeem_master() {
		(<HTMLInputElement>document.getElementById("save_btn")).disabled = false;
		(<HTMLInputElement>document.getElementById("save_btn")).hidden = false;
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
	}

	priv_info:any;
	ngOnInit() {
		
 this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
	error => console.log(error),
	() => {console.log("privvv",this.priv_info);
	}
); 
		(<HTMLInputElement>document.getElementById("update_btn")).hidden = true;
		(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = true;
		/*		(<HTMLInputElement>document.getElementById("departmentsdropdown") as ).setv*/

		this.Takeem_masterDataService.aClickedEvent
			.subscribe((data: string) => {
				console.log("edited");
				(<HTMLInputElement>document.getElementById("save_btn")).disabled = true;
				(<HTMLInputElement>document.getElementById("save_btn")).hidden = true;
				(<HTMLInputElement>document.getElementById("update_btn")).hidden = false;
				(<HTMLInputElement>document.getElementById("cancel_btn")).hidden = false;


				this.takeem_id = Number(this.Takeem_masterDataService.takeem_id);

				this.evaluation_id = this.Takeem_masterDataService.evaluation_id;
				this.evaluation_object = this.Takeem_masterDataService.evaluation_object;
				this.evaluation_object_name = this.Takeem_masterDataService.evaluation_object_name;
				this.evaluation_subject = this.Takeem_masterDataService.evaluation_subject;
				this.evaluation_subject_id = this.Takeem_masterDataService.evaluation_subject_id;
				this.the_object_id = this.Takeem_masterDataService.the_object_id;

				this.evaluation_date = this.Takeem_masterDataService.evaluation_date;


				var selected_value_team = this.Takeem_masterDataService.takeem_id;
				this.selectedteam = this.takeem_master[this.takeem_master.findIndex(x => x.takeem_id === selected_value_team)];

			});
		var test1

		this.takeem_id = this.takeem_id;
		this.evaluation_id = this.evaluation_id;
		this.evaluation_object = this.evaluation_object;
		this.evaluation_object_name = this.evaluation_object_name;
		this.evaluation_subject = this.evaluation_subject;
		this.evaluation_subject_id = this.evaluation_subject_id;
		this.the_object_id = this.the_object_id;
		this.evaluation_date = this.evaluation_date;

	}
}
