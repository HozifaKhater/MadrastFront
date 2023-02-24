import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ta7dier_masterDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    ta7dier_id: number;
    emp_id: string;
    emp_name: string = "";
    subject_id: string = "";
    subject_name: string = "";
    grade_id: string;
    grade_name: string = "";
    ta7dier_date: string = "";
    ta7dier_week: string = "";
    ta7dier_day: string;
    ta7dier_state_id: string = "";
    state_name: string = "";
    ta7dier_name: string = "";
    ta7dier_body: string;
    ta7dier_notes: string = "";
    ta7dier_supervision_state_id: string = "";
    ta7dier_supervision_state_name: string = "";
    ta7dier_state_name: string = "";
    ta7dier_file:string="";
    ta7dier_file_type: any;
    is_file: any;
    constructor(private http: HttpClient) { }

    GetAllTa7dier_master(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master');
    }
    GetAllTa7dier_master_with_id(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master/id?id=' + val);
    }
    GetAllTa7dier_master_with_subject_id(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master/subject_id?subject_id=' + val);
    }
    addTa7dier_master(val: any) {
        return this.http.post(this.APIUrl + '/ta7dier_master', val);
    }
    updateTa7dier_master(val: any) {
        return this.http.put(this.APIUrl + '/ta7dier_master', val);
    }
    updateTa7dier_master_for_state(val: any) {
        return this.http.post(this.APIUrl + '/ta7dier_master_state', val);
    }
    deleteTa7dier_master(id: any) {
        return this.http.delete(this.APIUrl + '/ta7dier_master/' + id);
    }
    get_ta7dier_master_with_dep_id(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master/get_ta7dier_master_with_dep_id?dep_id=' + val);
    }
    get_ta7dier_master_for_dashboard_t1(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master/get_ta7dier_master_for_dashboard_t1?emp_id=' + val);
    }
    get_ta7dier_master_for_dashboard_t2(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ta7dier_master/get_ta7dier_master_for_dashboard_t2?emp_id=' + val);
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