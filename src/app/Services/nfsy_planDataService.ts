import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class nfsy_planDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public ser: number;
    public day: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllnfsy_plan(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/nfsy_plan');
    }
    GetAllnfsy_plan_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/nfsy_plan/id?id=' + val);
    }
    addnfsy_plan(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/nfsy_plan', val);
    }
    updatenfsy_plan(val: any) {
        return this.http.put(this.APIUrl + '/nfsy_plan', val);
    }
    deletenfsy_plan(id: any) {
        return this.http.delete(this.APIUrl + '/nfsy_plan/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
}