import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { LevelsDataService } from '../../../../../Services/LevelsDataService';

import { LevelsMaster, Levels } from '../../../../../LevelsMaster.Model';
import { AbsenceDataService } from '../../../../../Services/AbsenceDataService';

import { AbsenceMaster, Absence } from '../../../../../AbsenceMaster.Model';
import { ClassesDataService } from '../../../../../Services/ClassesDataService';

import { ClassesMaster, Classes } from '../../../../../ClassesMaster.Model';
import { StudentMaster, Student } from '../../../../../StudentMaster.Model';
import { StudentDataService } from '../../../../../Services/StudentDataService';
import { gdwel_7ssDataService } from '../../../../../Services/gdwel_7ssDataService';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { ActivityDataService } from '../../../../../Services/ActivityDataService';
import { Absence_casesDataService } from '../../../../../Services/Absence_casesDataService';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Component({
	selector: 'kt-paginator',
	templateUrl: './paginator.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
	_7essa_info:any[]=[]
	decoded:any;
constructor(
	private cdRef:ChangeDetectorRef,
	private router: Router, private user_privDataService: user_privDataService,
	private gdwel_7ssDataService : gdwel_7ssDataService,
	private Absence_casesDataService:Absence_casesDataService){
	const userToken = localStorage.getItem(environment.authTokenKey);
	this.decoded = jwt_decode(userToken);

}

priv_info:any=[];
ngOnInit() {
	this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string)
	.subscribe(data =>this.priv_info = data,
		error => console.log(),
		() => {
			this.cdRef.detectChanges();
		}); 

		// call api get current 7essa for current user
		this.Absence_casesDataService.get_gdwel_7ss_with_emp_id_current_7sa(this.decoded.id).subscribe((data:any) => this._7essa_info = data.data,
			error => console.log(),
			() => {
				
if (this._7essa_info.length > 0)
{
	this.Absence_casesDataService.class_id=this._7essa_info[0].class_id;
	this.Absence_casesDataService._7ssa_info=this._7essa_info;
	this.Absence_casesDataService.BClicked("");
	
	if (this._7essa_info[0].late == 1)
{
	
	var val = {
		id:this._7essa_info[0].id
		}
	this.gdwel_7ssDataService.update_gdwel_7ss_is_late(val).subscribe(res => {
	})
}
	 if (this._7essa_info[0].late_block == 1)
{
	this.gdwel_7ssDataService.update_gdwel_7ss_is_block({id:this._7essa_info[0].id}).subscribe(res => {
	})
	this.router.navigate(['/dashboard']);
}
}
else{
	this.router.navigate(['/dashboard']);
}


			});
	}
}