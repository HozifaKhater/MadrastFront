// Angular
import { Component, OnInit } from '@angular/core';
import { EmployeeDataService } from '../../../../Services/EmployeeDataService';
import { environment } from '../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';

@Component({
	selector: 'kt-topbar',
	templateUrl: './topbar.component.html',
	styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit{ 

	constructor(private EmployeeDataService: EmployeeDataService) {
			const userToken = localStorage.getItem(environment.authTokenKey);
			//console.log("userinfo", userToken);

	}
	emp_name: string="";
	decoded:any;
	ngOnInit(): void {
		const userToken = localStorage.getItem(environment.authTokenKey);
		this.decoded = jwt_decode(userToken);
		//console.log("this.decoded",this.decoded.id);

		this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) => {
			this.emp_name = data[0].emp_name;
		});

	}
}
