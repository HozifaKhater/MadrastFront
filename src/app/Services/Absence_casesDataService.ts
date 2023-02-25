import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Absence_casesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public absence_cases_id: number;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public nationality_id: number;
    public nationality_name: string;
    public phone_no: string;
    public birth_date: string;
    public work_start_date: string;
    public behavioral_notes: string;
    public self_reasons: string;

    public absence_details_id: number;
    public other_situations: string;
    public date: string;
    public effort_results: string;
    public end_year_state: string;
    public _7ssa_id: string;
    public _7ssa_info: any;

    constructor(private http: HttpClient) { }

    GetAllAbsenceCases(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_absence_cases');
    }
    GetAllAbsenceCases_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_absence_cases_with_id?id=' + val);
    }
    get_absence_cases_details_with_absence_cases_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_absence_cases_details_with_absence_cases_id?id=' + val);
    }
    addAbsenceCases(val: any) {
        return this.http.post(this.APIUrl + '/Absence_cases/save_in_absence_cases', val);
    }
    addAbsenceCasesDetails(val: any) {
        return this.http.post(this.APIUrl + '/Absence_cases/save_in_absence_cases_details', val);
    }
    updateAbsenceCases(val: any) {
        return this.http.put(this.APIUrl + '/Absence_cases/update_absence_cases', val);
    }

    deleteAbsenceCases(id: any) {
        return this.http.delete(this.APIUrl + '/Absence_cases/delete_from_absence_cases/' + id);
    }
    deleteAbsenceCasesDetails(id: any) {
        return this.http.delete(this.APIUrl + '/Absence_cases/delete_from_absence_cases_details/' + id);
    }
    delete_from_absence_cases_details_with_absence_cases_id(id: any) {
        return this.http.delete(this.APIUrl + '/Absence_cases/delete_from_absence_cases_details_with_absence_cases_id/' + id);
    }
    
    get_gdwel_7ss_with_emp_id_current_7sa(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_gdwel_7ss_with_emp_id_current_7sa?id=' + val);
    }
    save_in_absence_student(val: any) {
        return this.http.post(this.APIUrl + '/Absence_cases/save_in_absence_student', val);
    }
    get_statistics_absenec_for_dashboard_all_abs(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_statistics_absenec_for_dashboard_all_abs');
    }
    get_statistics_absenec_for_dashboard_all_att(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_statistics_absenec_for_dashboard_all_att');
    }
    get_statistics_absenec_for_dashboard_att(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_statistics_absenec_for_dashboard_att?id=' + val);
    }
    get_statistics_absenec_for_dashboard_abs(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Absence_cases/get_statistics_absenec_for_dashboard_att?id=' + val);
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