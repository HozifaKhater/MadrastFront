import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EzonDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    ezn_id: number;
    absent_ezn_id: string;
    premit_id: string = "";
    emp_id: string = "";
    ezn_date: string = "";
    ezn_reason: string = "";
    time_from: string = "";
    time_to: string = "";
    ezn_state: string = "";
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    GetAllEzon(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ezon');
    }
    GetAllEzon_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ezon/id?id=' + val);
    }
    GetAllEzon_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ezon/emp_id?emp_id=' + val);
    }
    addEzon(val: any) {
        return this.http.post(this.APIUrl + '/ezon', val);
    }
    updateEzon(val: any) {
        return this.http.put(this.APIUrl + '/ezon', val);
    }
    updateEzon_for_state(val: any) {
        return this.http.post(this.APIUrl + '/ezon_state', val);
    }
    deleteEzon(id: any) {
        return this.http.delete(this.APIUrl + '/ezon/' + id);
    }
    get_absent_premit_ezoon_with_dep_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/ezon/get_absent_premit_ezoon_with_dep_id?dep_id=' + val);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bindClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BindClicked(msg: string) {
        console.log("das3laedit")
        this.bindClickedEvent.emit(msg);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}  