import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Behavioral_statusDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public behave_stat_id: number; 
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public behave_date: string;
    public behave_stat_rep: string;


    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllBehave(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Behavioral_status/get_behavioral_status');
    }
    GetAllBehave_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Behavioral_status/get_behavioral_status_with_id?id=' + val);
    }
    addBehave(val: any) {
        return this.http.post(this.APIUrl + '/Behavioral_status/save_in_behavioral_status', val);
    }
    updateBehave(val: any) {
        return this.http.put(this.APIUrl + '/Behavioral_status/update_behavioral_status', val);
    }

    deleteBehave(id: any) {
        return this.http.delete(this.APIUrl + '/Behavioral_status/delete_from_behavioral_status/' + id);
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