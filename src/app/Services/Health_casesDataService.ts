import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Health_casesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public health_id: number;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public nationality_id: number;
    public nationality: string;
    public phone_no: string;
    public birth_date: string;
    public work_start_date: string;
    public dis_status: string;
    public health_recomm: string;
    public year_end_state: string;

    public health_det_id: number;
    public other_situations: string;
    public date: string;
    public effort_results: string;
    public end_year_state: string;

    constructor(private http: HttpClient) { }

    GetAllHealthCases(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Health_cases/get_health_cases');
    }
    GetAllHealthCases_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Health_cases/get_health_cases_with_id?id=' + val);
    }
    addHealthCases(val: any) {
        return this.http.post(this.APIUrl + '/Health_cases/save_in_health_cases', val);
    }
    addHealthCasesDetails(val: any) {
        return this.http.post(this.APIUrl + '/Health_cases/save_in_health_cases_details', val);
    }
    updateHealthCases(val: any) {
        return this.http.put(this.APIUrl + '/Health_cases/update_health_cases', val);
    }

    deleteHealthCases(id: any) {
        return this.http.delete(this.APIUrl + '/Health_cases/delete_from_health_cases/' + id);
    }
    deleteHealthCasesDetails(id: any) {
        return this.http.delete(this.APIUrl + '/Health_cases/delete_from_health_cases_details/' + id);
    }

    delete_from_health_cases_details_with_health_id(id: any) {
        return this.http.delete(this.APIUrl + '/Health_cases/delete_from_health_cases_details_with_health_id/' + id);
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