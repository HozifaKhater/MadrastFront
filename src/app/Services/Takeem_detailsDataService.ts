import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Takeem_detailsDataService {

    public takeem_detail_id: number;
    public takeem_id: string;
    public evaluation_item_id: string;
    public evaluation_item_name: string;
    public evaluation_appreciation: string;
    public evaluation_score: string;
    public evaluation_result: string;




    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllTakeem_details(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Takeem_details');
    }
    GetAllTakeem_details_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Takeem_details/id?id=' + val);
    }
    addTakeem_details(val: any) {
        return this.http.post(this.APIUrl + '/Takeem_details', val);
    }
    updateTakeem_details(val: any) {
        return this.http.put(this.APIUrl + '/Takeem_details', val);
    }

    deleteTakeem_details(id: any) {
        return this.http.delete(this.APIUrl + '/Takeem_details/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
}