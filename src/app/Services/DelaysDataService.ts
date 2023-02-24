import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DelaysDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public delay_id: number;
    public delay_date: string;
    public delay_emp_name: string;
    public time_attend: string;
    public delay_state: number;
    public delay_emp_id: number;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllDelays(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/delays');
    }
    GetAllDelays_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/delays/id?id=' + val);
    }
    addDelays(val: any) {
        return this.http.post(this.APIUrl + '/delays', val);
    }
    updateDelays(val: any) {
        return this.http.put(this.APIUrl + '/delays', val);
    }
    deleteDelays(id: any) {
        return this.http.delete(this.APIUrl + '/delays/' + id);
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