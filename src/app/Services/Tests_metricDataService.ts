import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Tests_metricDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public tests_id : number;
    public tests_type: string;
    public tests_date: string;
    public tests_stu_no: number;
 
    constructor(private http: HttpClient) { }

    GetAllTests_metric(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/tests_metric');
    }
    GetAllTests_metric_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/tests_metric/id?id=' + val);
    }
    addTests_metric(val: any) {
        return this.http.post(this.APIUrl + '/tests_metric', val);
    }
    updateTests_metric(val: any) {
        return this.http.put(this.APIUrl + '/tests_metric', val);
    }
    deleteTests_metric(id: any) {
        return this.http.delete(this.APIUrl + '/tests_metric/' + id);
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