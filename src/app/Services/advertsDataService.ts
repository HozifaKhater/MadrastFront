import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class advertsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser	:	string;
    public	title	:	string;
    public	body	:	string;
    public	from_emp_id	:	string;
    public	submit_date	:	string;
    public	state	:	string;
    public	start_date	:	string;
    public	end_date	:	string;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_adverts(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/adverts/get_adverts/');
    }
    get_adverts_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/adverts/get_adverts_with_id?id=' + val);
    }
    save_in_adverts(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/adverts/save_in_adverts', val);
    }
    update_adverts(val: any) {
        return this.http.put(this.APIUrl + '/adverts/update_adverts', val);
    }
    delete_from_adverts(id: any) {
        return this.http.delete(this.APIUrl + '/adverts/delete_from_adverts/' + id);
    }
    update_adverts_state(val: any) {
        return this.http.put(this.APIUrl + '/adverts/update_adverts_tate', val);
    }
    get_adverts_for_dashboard(val :any, val2:any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/adverts/get_adverts_for_dashboard?is_public='+ val + '&dep_id=' + val2);
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