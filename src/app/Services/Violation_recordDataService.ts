import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Violation_recordDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public viol_id : number;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public viol_date: string;
    public violation_id: number;
    public violation_name: string;
    public procedure_id: number;
    public procedure_name: string;
 

    constructor(private http: HttpClient) { }

    GetAllViolation(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Violation_record/get_violation_record');
    }
    GetAllViolation_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Violation_record/get_violation_record_with_id?id=' + val);
    }
    addViolation(val: any) {
        return this.http.post(this.APIUrl + '/Violation_record/save_in_violation_record', val);
    }
    updateViolation(val: any) {
        return this.http.put(this.APIUrl + '/Violation_record/update_violation_record', val);
    }
    deleteViolation(id: any) {
        return this.http.delete(this.APIUrl + '/Violation_record/delete_from_violation_record/' + id);
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