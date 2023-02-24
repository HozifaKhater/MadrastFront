import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ObservationsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public observer_id: number;
    public observ_ftra: string;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public emp_id: number;
    public emp_name: string;
    public observ_loc: string;
    public observe_date: string;

    constructor(private http: HttpClient) { }

    GetAllObservations(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/observations');
    }
    GetAllObservations_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/observations/id?id=' + val);
    }
    addObservations(val: any) {
        return this.http.post(this.APIUrl + '/observations', val);
    }
    updateObservations(val: any) {
        return this.http.put(this.APIUrl + '/observations', val);
    }
    deleteObservations(id: any) {
        return this.http.delete(this.APIUrl + '/observations/' + id);
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