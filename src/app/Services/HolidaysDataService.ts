import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HolidaysDataService {
    readonly APIUrl = "https://localhost:44337/api";    
    private actionUrl: string;
    public ser: number;
    public day: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllholidays(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/holidays_and_feasts');
    }
    GetAllholidays_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/holidays_and_feasts/id?id=' + val);
    }
    addholidays(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/holidays_and_feasts', val);
    }
    updateholidays(val: any) {
        return this.http.put(this.APIUrl + '/holidays_and_feasts', val);
    }
    deleteholidays(id: any) {
        return this.http.delete(this.APIUrl + '/holidays_and_feasts/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
}