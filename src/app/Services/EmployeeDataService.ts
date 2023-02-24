import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EmployeeDataService {
	readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
	emp_id: number;
	emp_civilian_id: string = "";
	emp_sex: string = "";
	emp_sex_id: string = "";
	emp_name: string = "";
	emp_nationality: string = "";
	emp_nationality_id: string = "";
	emp_marital_status: string = "";
	emp_marital_status_id: string = "";
	emp_file_ser: string = "";
	emp_dob: string = "";
	emp_age_year: string = "";
	emp_age_month: string = "";
	emp_age_day: string = "";
	emp_pos_type: string = "";
	emp_pos_type_id: string = "";
	emp_pos: string = "";
	emp_pos_id: string = "";
	emp_dep: string = "";
	emp_dep_id: string = "";
	emp_subject: string = "";
	emp_subject_id: string = "";
	emp_div: string = "";
	emp_div_id: string = "";
	emp_contract: string = "";
	emp_contract_id: string = "";
	emp_employment_date: string = "";
	emp_educationa_qualification: string = "";
	emp_educationa_qualification_id: string = "";
	emp_educationa_qualification_date: string = "";
	emp_educationa_qualification_country: string = "";
	emp_educationa_qualification_country_id: string = "";
	emp_exp_out_country: string = "";
	emp_exp_in_country_same_grade: string = "";
	emp_exp_in_country_another_grade: string = "";
	emp_exp_in_country_same_school: string = "";
	emp_address: string = "";
	emp_email: string = "";
	emp_mob: string = "";
	emp_mob1: string = "";
	emp_tel: string = "";
	emp_username: string = "";
	emp_password: string = "";
	in_class_priv: string = "";
	dep_work: string = "";
	emp_dep_parent:string="";
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
	
	GetGoodStudents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/employee/GetGoodStudents');
	}

	GetNumberOfStudent(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/employee/GetNumberOfStudent');
	}

    GetAllEmployee(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/employee');
	}
	GetAllEmployee_with_id(val): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/employee/id?id=' + val);
    }
    Getdefinations_with_scode(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/scode?scode=' + val);
    }
    Getcountries(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/countries');
    }
    addEmployee(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/employee', val);
    }
	updateEmployee(val: any) {
		
        return this.http.put(this.APIUrl + '/employee', val);
    }
    deleteEmployee(id: any) {
        return this.http.delete(this.APIUrl + '/employee/' + id);
	}

	GetAllEmployee_of_department(val) {
		if(val){
			return this.http.get<any>(this.APIUrl + '/employee/dep_id?dep_id=' + val);
		}
	}
	GetAllEmployee_of_job(val) {
		return this.http.get<any>(this.APIUrl + '/job_details_def/job_id?job_id=' + val);
	}
	get_subject_with_emp_id(val): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/subject/emp_id?id=' + val);
    }
	update_emp_def_connection_id(val: any) {
		
        return this.http.post(this.APIUrl + '/employee/update_emp_def_connection_id', val);
    }
	get_emp_def_with_subject_id(val): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/employee/get_emp_def_with_subject_id?id=' + val);
    }

	get_emp_def_with_subject_id_with_validation(val, val2): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/employee/get_emp_def_with_subject_id_with_validation?id=' + val + '&date=' + val2);
    }
	@Output() aClickedEvent = new EventEmitter<string>();
	/*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
	AClicked(msg: string) {
		this.aClickedEvent.emit(msg);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }
}