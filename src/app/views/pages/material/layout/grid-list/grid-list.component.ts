import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { EmployeeDataService } from '../../../../../Services/EmployeeDataService';
import { Employee,EmployeeMaster} from '../../../../../EmployeeMaster.Model';
import { EzonDataService } from '../../../../../Services/EzonDataService';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { user_privDataService } from '../../../../../Services/user_privDataService ';
import { environment } from '../../../../../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Component({
	selector: 'kt-grid-list',
	templateUrl: './grid-list.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [`
	mat-grid-tile {
		background: lightblue;
	  }
	`]
})
export class GridListComponent implements OnInit {
    filteredOptions: Observable<any[]>;
    private _filter(value: string) {
        const filterValue = value.toLowerCase();
        return this.Employees.filter(option => option.emp_name.toLowerCase().includes(filterValue));
    }
    displayFn(selectedoption) {
        return selectedoption ? selectedoption.emp_name : undefined;
    }
    employeedepartment: any;
    Employees: Employee[];
	exampleBasicGrid;
	exampleDynamicGrid;
    Employee: Employee[];
    Employeedata: Employee[];
	constructor(private router: Router, private user_privDataService: user_privDataService,
        private EmployeeDataService: EmployeeDataService, private EzonDataService: EzonDataService) {
		
	}
	bind_ezons(event) {
		this.EzonDataService.emp_id = event.source.value.emp_id;
		this.EzonDataService.BindClicked("test");
    }
    myControl = new FormControl('');
    change_emp(event) {
        this.EmployeeDataService.GetAllEmployee_with_id(event.emp_id).subscribe(data => this.Employeedata = data,
            error => console.log(error),
            () => {
                this.civil_id = this.Employeedata[0].emp_civilian_id;
                this.file_id = this.Employeedata[0].emp_file_ser;
            });
        this.EzonDataService.emp_id = event.emp_id
        this.EzonDataService.BClicked("test")
    }
    civil_id: any;
    file_id: any;
    priv_info:any;
    emp_info_prem: Employee[]
    decoded:any;
	ngOnInit() {
        this.user_privDataService.get_emp_user_privliges_menus_route_with_route(this.router.url as string).subscribe(data =>this.priv_info = data,
			error => console.log(error),
            () => {console.log("privvv",this.priv_info);
			}
	); 
    const userToken = localStorage.getItem(environment.authTokenKey);
    this.decoded = jwt_decode(userToken);
    this.EmployeeDataService.GetAllEmployee_with_id(this.decoded.id).subscribe((data) =>{ 
       
        this.emp_info_prem = data;
        console.log("asdasd",this.decoded.id,this.emp_info_prem)
        if( (this.emp_info_prem[0].emp_pos_id == '37') || (this.emp_info_prem[0].emp_pos_id == '38') || (this.emp_info_prem[0].emp_pos_id == '41'))
        {
            this.EmployeeDataService.GetAllEmployee_of_department(this.emp_info_prem[0].emp_dep_id).subscribe(data => this.Employees = data,
                error => console.log(error),
                () => {
                    console.log("emp dropdown", this.Employees);
                    this.filteredOptions = this.myControl.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => typeof value === 'string' ? value : value.emp_name),
                            map(emp_name => emp_name ? this._filter(emp_name) : this.Employees.slice())
                        );
                });
        }
        else
        {
            this.EmployeeDataService.GetAllEmployee().subscribe(data => this.Employees = data,
                error => console.log(error),
                () => {
                    console.log("emp dropdown", this.Employees);
                    this.filteredOptions = this.myControl.valueChanges
                        .pipe(
                            startWith(''),
                            map(value => typeof value === 'string' ? value : value.emp_name),
                            map(emp_name => emp_name ? this._filter(emp_name) : this.Employees.slice())
                        );
                });
        }
    },
        error => console.log(error));
    
      
	}

}
