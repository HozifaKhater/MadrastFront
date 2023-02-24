import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class behaviours_statusDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: string;
    public status_type: string;
    public notes: string;
    public reasons: string;
    public lev_id: string;
    public class_id: string;
    public student_id: string;
    public details: any;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_behaviours_status(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status/');
    }
    get_behaviours_status_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status_with_id?id=' + val);
    }
    save_in_behaviours_status(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/behaviours_status/save_in_behaviours_status', val);
    }
    update_behaviours_status(val: any) {
        return this.http.put(this.APIUrl + '/behaviours_status/update_behaviours_status', val);
    }
    delete_from_behaviours_status(id: any) {
        return this.http.delete(this.APIUrl + '/behaviours_status/delete_from_behaviours_status/' + id);
    }

    get_behaviours_status_details(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status_details/');
    }
    get_behaviours_status_details_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status_details_with_id?id=' + val);
    }
    save_in_behaviours_status_details(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/behaviours_status/save_in_behaviours_status_details', val);
    }
    update_behaviours_status_details(val: any) {
        return this.http.put(this.APIUrl + '/update_behaviours_status/update_behaviours_status_details', val);
    }
    delete_from_behaviours_status_details(id: any) {
        return this.http.delete(this.APIUrl + '/behaviours_status/delete_from_behaviours_status_details/' + id);
    }

    get_behaviours_status_details_with_behaviour_status_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status_details_with_behaviour_status_id?id=' + val);
    }

    get_behaviours_status_details_with_student_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/behaviours_status/get_behaviours_status_details_with_student_id?id=' + val);
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
    @Output() get_detailsClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    get_details_CClicked(msg: string) {
        this.get_detailsClickedEvent.emit(msg);
    }

}
