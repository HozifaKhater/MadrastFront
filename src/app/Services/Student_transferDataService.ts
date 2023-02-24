import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Student_transferDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public student_trans_id: number;
    public lev_id: number;
    public lev_name: string;
    public class_id: string;
    public class_name: string;
    public student_id: string;
    public student_name: string;
    public student_civilian_id: string;
    public student_branch: string;
    public educational_area: string;
    public school_trans: string;
    public new_branch: string;
    public trans_date: string;
    public student_branch_id: number;
    public educational_area_id: number;
    public school_trans_id: number;

    constructor(private http: HttpClient) { }

    GetAllStudentrans(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_transfer/get_student_transfer');
    }
    GetAllStudentrans_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student_transfer/get_student_transfer_with_id?id=' + val);
    }
    addStudentrans(val: any) {
        return this.http.post(this.APIUrl + '/Student_transfer/save_in_student_transfer', val);
    }
    updateStudentrans(val: any) {
        return this.http.put(this.APIUrl + '/Student_transfer/update_student_transfer', val);
    }

    deleteStudentrans(id: any) {
        return this.http.delete(this.APIUrl + '/Student_transfer/delete_from_student_transfer/' + id);
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