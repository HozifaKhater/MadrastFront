import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Visit_typesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public visit_type_id: number;
    public visit_type_name: string;
    public is_visit_date: string;
    public visit_date: string;
    public is_phone: string;
    public phone_label: string;
    public is_start_time: string;
    public start_time_label: string;
    public is_end_time: string;
    public end_time_label: string;
    public is_name: string;
    public name_label: string;
    public is_topic: string;
    public topic_label: string;
    public is_instructions: string;
    public instructions_label: string;
    public is_job: string;
    public job_label: string;
    public is_notes: string;
    public notes_label: string;
    public is_dep: string;
    public dep_label: string;
    public is_vnote: string;
    public vnote_label: string;
    public is_vpic: string;
    public vpic_label: string;
    public is_emp_from: string;
    public emp_from_label: string;
    public is_emp_to: string;
    public emp_to_label: string;
    public is_takeem: string;
    public takeem_label: string;
    constructor(private http: HttpClient) { }

    GetAllVisit_types(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/visit_types');
    }
    GetAllvisit_types_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/visit_types/id?id=' + val);
    }
    addvisit_types(val: any) {
        return this.http.post(this.APIUrl + '/visit_types', val);
    }
    updatevisit_types(val: any) {
        return this.http.put(this.APIUrl + '/visit_types', val);
    }
    deletevisit_types(id: any) {
        return this.http.delete(this.APIUrl + '/visit_types/' + id);
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