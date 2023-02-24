import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class student_mattersDataService {
    readonly APIUrl = "https://localhost:44337/api";    
    private actionUrl: string;
    public id: number;
    public level_id: string;
    public level_name: string;
    public class_id: string;
    public class_name: string;
    public note_date: string;
    public topic: string;
    public ntoes: string;
    public student_id:number;
    public student_name:string;

    constructor(private http: HttpClient) { }

    GetAllstudent_matters(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_matters');
    }
    GetAllstudent_matters_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_matters/id?id=' + val);
    }
    addstudent_matters(val: any) {
        return this.http.post(this.APIUrl + '/student_matters', val);
    }
    updatestudent_matters(val: any) {
        return this.http.put(this.APIUrl + '/student_matters', val);
    }
    deletestudent_matters(id: any) {
        return this.http.delete(this.APIUrl + '/student_matters/' + id);
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