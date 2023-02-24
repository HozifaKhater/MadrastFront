import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Excellent_studentsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public exc_stu_id : number;
    public exc_stu_lev: string;
    public exc_stu_clas: string;
    public exc_stu_name: string;
    public exc_stu_nation: string;
    public exc_stu_mob: string;
    public exc_stu_birth: string;
    public exc_stu_notes: string;
    public exc_stu_eff: string;

    constructor(private http: HttpClient) { }

    GetAllExcellent_students(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/excellent_students');
    }
    GetAllExcellent_students_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/excellent_students/id?id=' + val);
    }
    addExcellent_students(val: any) {
        return this.http.post(this.APIUrl + '/excellent_students', val);
    }
    updateExcellent_students(val: any) {
        return this.http.put(this.APIUrl + '/excellent_students', val);
    }
    deleteExcellent_students(id: any) {
        return this.http.delete(this.APIUrl + '/excellent_students/' + id);
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