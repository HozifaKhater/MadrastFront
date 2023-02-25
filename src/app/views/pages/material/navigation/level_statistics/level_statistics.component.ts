import { Component, ChangeDetectorRef, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Takeem_masterDataService } from '../../../../../Services/Takeem_masterDataService';
import { Takeem_master } from '../../../../../Takeem_masterMaster.Model';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
@Component({
	selector: 'kt-level_statistics',
	templateUrl: './level_statistics.component.html',
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
export class level_statisticsComponent implements OnInit {

	takeem_master: Takeem_master[];

	constructor(
		private cdRef:ChangeDetectorRef,
		private router: Router, 
		private user_privDataService: user_privDataService,) {

	}


	priv_info:any=[];
	ngOnInit() {
		this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
		.subscribe(data =>this.priv_info = data,
			error => console.log(),
            () => {
				this.cdRef.detectChanges();
			});  

		
	}
}
