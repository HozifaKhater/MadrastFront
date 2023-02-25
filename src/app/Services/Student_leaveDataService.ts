import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Student_leaveDataService {
    readonly APIUrl = "https://astores.azurewebsites.net/api";
    private actionUrl: string;
    public leav_stu_id: number;
    public lev_id: number;
    public lev_name: string;
    public class_id: string;
    public class_name: string;
    public student_id: string;
    public student_name: string;
    public student_civilian_id: string;
    public student_branch_id: number;
    public student_branch: string;
    public leave_reason_id: number;
    public leave_reason: string;
    public leave_date: string;

    constructor(private http: HttpClient) { }

    GetAllStudentleave(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_leave/get_student_leave');
    }
    GetAllStudentleave_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_leave/get_student_leave_with_id?id=' + val);
    }
    addStudentleave(val: any) {
        return this.http.post(this.APIUrl + '/Student_leave/save_in_student_leave', val);
    }
    updateStudentleave(val: any) {
        return this.http.put(this.APIUrl + '/Student_leave/update_student_leave', val);
    }

    deleteStudentleave(id: any) {
        return this.http.delete(this.APIUrl + '/Student_leave/delete_from_student_leave/' + id);
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