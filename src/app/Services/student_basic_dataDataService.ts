import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class student_basic_dataDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public ser: number;
    public student_id: string;
    public student_name: string;
    public previous_school: string;
    public address: string;
    public transition_between_schools: string;
    public foreign_schools: string;
    public student_history_notes: string;
    public health_status: string;
    public mr7la_name: string;
    public mr7la_id: string;
    public level_id: string;
    public level_name: string;
    public good_subject_id: string;
    public good_subject_name: string;
    public bad_subject_id: string;
    public bad_subject_name: string;



    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllstudent_basic_data(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_basic_data');
    }
    GetAll_student_basic_data_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_basic_data/id?id=' + val);
    }
    addstudent_basic_data(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_basic_data', val);
    }
    updatestudent_basic_data(val: any) {
        return this.http.put(this.APIUrl + '/student_basic_data', val);
    }
    deletestudent_basic_data(id: any) {
        return this.http.delete(this.APIUrl + '/student_basic_data/' + id);
    }

    GetAllstudent_basic_data_details(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_basic_data/details');
    }
    GetAll_student_basic_data_details_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_basic_data/details_id?details_id=' + val);
    }
    addstudent_basic_data_details(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_basic_data/details', val);
    }
    updatestudent_basic_data_details(val: any) {
        return this.http.put(this.APIUrl + '/student_basic_data/details', val);
    }
    deletestudent_basic_data_details(id: any) {
        return this.http.delete(this.APIUrl + '/student_basic_data/details_id/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log(msg);
    }
}