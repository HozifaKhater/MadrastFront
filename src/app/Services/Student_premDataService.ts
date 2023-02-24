import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Student_premDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public student_prem_id: number;
    public prem_date: string;
    public prem_leave_time: string;
    public prem_arrive_time: string;
    public prem_level: string;
    public prem_class: string;
    public prem_stu_id: number;
    public prem_stu_name: string;
    public prem_state: number;
    public prem_parent_type: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllStudent_prem(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_prem');
    }
    GetAllStudent_prem_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_prem/id?id=' + val);
    }
    addStudent_prem(val: any) {
        return this.http.post(this.APIUrl + '/Student_prem', val);
    }
    updateStudent_prem(val: any) {
        return this.http.put(this.APIUrl + '/Student_prem', val);
    }
    deleteStudent_prem(id: any) {
        return this.http.delete(this.APIUrl + '/Student_prem/' + id);
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