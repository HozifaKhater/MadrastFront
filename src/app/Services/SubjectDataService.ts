import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SubjectDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public subject_id: number;
    public subject_name: string;
    public subject_desc: string;
    public dep_id: number;
    public dep_name: string;
    public  parent_id: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllSubjectWithClassId(classId,dateDay): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/subject/get_subject_def_with_class_id?id='+classId+'&date='+dateDay);
    }
    GetAllSubject(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/subject');
    }
    GetAllSubject_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/subject/id?id=' + val);
    }
    addSubject(val: any) {
        return this.http.post(this.APIUrl + '/subject', val);
    }
    updateSubject(val: any) {
        return this.http.put(this.APIUrl + '/subject', val);
    }
    deleteSubject(id: any) {
        return this.http.delete(this.APIUrl + '/subject/' + id);
    }
    get_subject_def_with_dep_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/subject/get_subject_def_with_dep_id?id=' + val);
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