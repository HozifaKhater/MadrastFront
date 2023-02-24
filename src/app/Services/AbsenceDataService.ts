import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AbsenceDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public absence_id: number;
    public absence_lev: string;
    public absence_class: string;
    public absence_date: string;
    public absence_student_id: number;
    public absence_student_name: string;
    public grade_id: number;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllAbsence(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/absence');
    }
    GetAllAbsence_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/absence/id?id=' + val);
    }
    get_absence_with_date(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/absence/get_absence_with_date?date=' + val);
    }
    get_absence_with_date_and_level(val: any) {
        return this.http.post<any>(this.APIUrl + '/absence/get_absence_with_date_and_level',  val);
    }
    addAbsence(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/absence', val);
    }
    updateAbsence(val: any) {
        return this.http.put(this.APIUrl + '/absence', val);
    }
    deleteAbsence(id: any) {
        return this.http.delete(this.APIUrl + '/absence/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(AbsenceDataService);
    }

    @Output()bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log("clicked in data service");
    }

    @Output()cClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    CClicked(msg: string) {
        this.cClickedEvent.emit(msg);
        console.log("clicked in data service");
    }

}