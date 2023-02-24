import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Good_bad_students_cardDataService {
    public student_card_id: number;
    public good_card_id: string;
    public bad_card_id: string;
    public grade_id: string;
    public garde_name: string;
    public class_id: string;
    public class_name: string;
    public subject_id: string;
    public subject_name: string;
    public student_id: string;
    public student_name: string;
    public good_ebda3: string;
    public good_tahfeez: string;
    public good_result: string;
    public bad_da3f: string;
    public bad_da3f_reasons: string;
    public bad_cure_ways: string;
    public bad_result: string;


    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllGood_bad_students_card(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Good_bad_students_card');
    }
    GetAllgoodbadstudents_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Good_bad_students_card/id?id=' + val);
    }
    addGood_bad_students_card(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/Good_bad_students_card', val);
    }
    updateGood_bad_students_card(val: any) {
        return this.http.put(this.APIUrl + '/Good_bad_students_card', val);
    }

    updateBad_students_card(val: any) {
        return this.http.put(this.APIUrl + '/Good_bad_students_card/bad', val);
    }

    deleteGood_bad_students_card(id: any) {
        return this.http.delete(this.APIUrl + '/Good_bad_students_card/' + id);
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