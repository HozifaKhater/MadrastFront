import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class SpecialStudentService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public level_id: number;
    public level_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public dep_id: number;
    public dep_name: string;
    public sub_dep_id: number;
    public sub_dep_name: string;
    public excellence_manifestations: string;
    public suggested_development: string;
    public result: string;

    constructor(private http: HttpClient) { }

    GetSpecialStudents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpecialStudent/GetSpecialStudents');
    }
   
    GetSpecialStudentById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpecialStudent/GetSpecialStudentById/id?id=' + val);
    }

    SaveSpecialStudent(val: any) {
        return this.http.post(this.APIUrl + '/SpecialStudent/SaveSpecialStudent', val);
    }

    UpdateSpecialStudent(val: any) {
        return this.http.put(this.APIUrl + '/SpecialStudent/UpdateSpecialStudent', val);
    }

    DeleteSpecialStudent(id: any) {
        return this.http.delete(this.APIUrl + '/SpecialStudent/DeleteSpecialStudent/' + id);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}