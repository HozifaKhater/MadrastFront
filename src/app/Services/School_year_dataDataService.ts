import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class School_year_dataDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public year_data_id: number;
    public year_date_from: string;
    public year_date_to: string;



    constructor(private http: HttpClient) { }


    GetAllSchool_year_data(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_year_data');
    }
    get_school_year_data_for_dropdown(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_year_data/year_data_dropdown');
    }
    GetAllSchool_year_data_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_year_data/id?id=' + val);
    }
    addSchool_year_data(val: any) {
        return this.http.post(this.APIUrl + '/school_year_data', val);
    }
    addSchool_year_details(val: any) {
        return this.http.post(this.APIUrl + '/school_year_details', val);
    }
    updateSchool_year_data(val: any) {
        return this.http.put(this.APIUrl + '/school_year_data', val);
    }
    deleteSchool_year_data(id: any) {
        return this.http.delete(this.APIUrl + '/school_year_data/' + id);
    }
    deleteSchool_year_details(id: any) {
        return this.http.delete(this.APIUrl + '/school_year_details/' + id);
    }
    GetAllSchool_year_data_details_with_year_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_year_details/year_data_id?id=' + val);
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