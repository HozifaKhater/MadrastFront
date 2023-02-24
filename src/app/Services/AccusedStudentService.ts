import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class AccusedStudentService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public level_id: number;
    public level_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public def_id: number;
    public s_code: string;
    public date_of_file_opening: string;
    public guilt_id: number;
    public results: string;

    constructor(private http: HttpClient) { }

    GetAccusedStudents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/AccusedStudentInGuilt/GetAccusedStudentsInGuilt');
    }
   
    GetAccusedStudentWithId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/AccusedStudentInGuilt/GetAccusedStudentInGuiltById/id?id=' + val);
    }

    SaveAccusedStudent(val: any) {
        return this.http.post(this.APIUrl + '/AccusedStudentInGuilt/SaveAccusedStudentInGuilt', val);
    }

    UpdateAccusedStudent(val: any) {
        return this.http.put(this.APIUrl + '/AccusedStudentInGuilt/UpdateAccusedStudentInGuilt', val);
    }

    DeleteAccusedStudent(id: any) {
        return this.http.delete(this.APIUrl + '/AccusedStudentInGuilt/DeleteAccusedStudentInGuilt/' + id);
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