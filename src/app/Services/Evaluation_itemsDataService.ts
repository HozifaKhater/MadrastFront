import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Evaluation_itemsDataService {
    public evaluation_id: number;
    public evaluation_object: string;
    public evaluation_object_name: string;
    public evaluation_subject: string;
    public evaluation_subject_id: string;
    public evaluation_item_id: string;
    public evaluation_item_name: string;
    public evaluation_appreciation: string;
    public evaluation_score: string;


    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllEvaluation_items(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Evaluation_items');
    }
    GetAllEvaluation_items_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Evaluation_items/id?id=' + val);
    }
    addEvaluation_items(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/Evaluation_items', val);
    }
    updateEvaluation_items(val: any) {
        return this.http.put(this.APIUrl + '/Evaluation_items', val);
    }
    deleteEvaluation_items(id: any) {
        return this.http.delete(this.APIUrl + '/Evaluation_items/' + id);
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