import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Takeem_masterDataService {
    public takeem_id: number;
    public evaluation_id: string;
    public evaluation_object: string;
    public evaluation_object_name: string;
    public evaluation_object_id: string;
    public evaluation_subject: string;
    public evaluation_subject_id: string;
    public the_object_id: string;
    public evaluation_date: string;
    public evaluation_result: string;


    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    GetAllTakeem_master(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Takeem_master');
    }
    GetAllTakeem_master_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Takeem_master/id?id=' + val);
    }
    get_takeem_details_with_takeem_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/takeem_details/get_takeem_details_with_takeem_id?id=' + val);
    }
    addTakeem_master(val: any) {
        return this.http.post(this.APIUrl + '/Takeem_master', val);
    }
    updateTakeem_master(val: any) {
        return this.http.put(this.APIUrl + '/Takeem_master', val);
    }

    deleteTakeem_master(id: any) {
        return this.http.delete(this.APIUrl + '/Takeem_master/' + id);
    }
    get_evaluation_with_evaluation_subject(val: any): Observable<any[]> {
        return this.http.post<any>(this.APIUrl + '/takeem_details/get_evaluation_with_evaluation_subject',val);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
    @Output() cClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    CClicked(msg: string) {
        this.cClickedEvent.emit(msg);
    }
    @Output() dClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    DClicked(msg: string) {
        this.dClickedEvent.emit(msg);
    }

    @Output() eClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    EClicked(msg: string) {
        this.eClickedEvent.emit(msg);
    }
    @Output() aftersaveClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AFTERsaveClicked(msg: string) {
        this.aftersaveClickedEvent.emit(msg);
    }
}