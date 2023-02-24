import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class School_dataDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;

    public school_id: number;
    public school_man: string;
    public school_name: string;
    public school_assis1: string;
    public school_assis2: string;
    public school_assis3: string;
    public school_assis4: string;
    public school_bdala: string;
    public school_faks: string;
    public school_addr: string;
    public school_dir: string;
    public school_logo: string;
    public	school_assis1_id	:	string;
    public	school_assis2_id	:	string;
    public	school_assis3_id	:	string;
    public	school_assis4_id	:	string;
    public	school_man_id	:	string;
    constructor(private http: HttpClient) { }

    GetAllSchool_data(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/School/GetAllSchools');
    }
    get_school_year_data_for_dropdown(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_data/year_data_dropdown');
    }
    GetAllSchool_data_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/School/GetSchoolById/id?id=' + val);
    }
    addSchool_data(val: any) {
        return this.http.post(this.APIUrl + '/School/SaveSchool', val);
    }
    updateSchool_data(val: any) {
        return this.http.put(this.APIUrl + '/School/UpdateSchool', val);
    }
    deleteSchool_data(id: any) {
        return this.http.delete(this.APIUrl + '/School/DeleteSchool/' + id);
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