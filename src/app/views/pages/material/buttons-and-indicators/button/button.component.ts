import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SubjectDataService } from '../../../../../Services/SubjectDataService';
import { SubjectMaster, Subjects } from '../../../../../SubjectMaster.Model';
import {ta7dier_masterDataService  } from '../../../../../Services/Ta7dier_masterDataService';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee,EmployeeMaster } from '../../../../../EmployeeMaster.Model';
@Component({
	selector: 'kt-button',
	templateUrl: './button.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	.example-button-row {
		display: flex;
		align-items: center;
		justify-content: space-around;
	  }
	`]
})


export class ButtonComponent implements OnInit {

	Employee: Employee[];
   
	bind_ta7diers(event) {
		this.ta7dier_masterDataService.subject_id = event.subject_id;
        this.ta7dier_masterDataService.BClicked(event.subject_id);
    }
	
    subject: any;
	decoded:any;
	subjects: Subjects[];
	constructor(private EmployeeDataService: EmployeeDataService,
		private SubjectDataService: SubjectDataService, private ta7dier_masterDataService: ta7dier_masterDataService) {
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);

		this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id)
		.subscribe(data => this.Employee = data,
			error => console.log(),
            () => { 

				this.SubjectDataService.get_subject_def_with_dep_id(this.Employee[0].emp_dep_id)
				.subscribe(data => this.subjects = data,
					error => console.log());

			});
		
	}

	ngOnInit() {

	}
}
