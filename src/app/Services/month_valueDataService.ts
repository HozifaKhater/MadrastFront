import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class month_valueDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser	:	string;
    public	title	:	string;
    public	body	:	string;
    public	from_emp_id	:	string;
    public	submit_date	:	string;
    public	state	:	string;
    public	month	:	string;
    public	year	:	string;
    
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_month_value(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/month_value/get_month_value/');
    }
    get_month_value_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/month_value/get_month_value_with_id?id=' + val);
    }
    save_in_month_value(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/month_value/save_in_month_value', val);
    }
    update_month_value(val: any) {
        return this.http.put(this.APIUrl + '/month_value/update_month_value', val);
    }

    delete_from_month_value(id: any) {
        return this.http.delete(this.APIUrl + '/month_value/delete_from_month_value/' + id);
    }
    update_month_value_state(val: any) {
        return this.http.put(this.APIUrl + '/month_value/update_month_value_tate', val);
    }
    get_month_value_for_dashboard(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/month_value/get_month_value_for_dashboard/');
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