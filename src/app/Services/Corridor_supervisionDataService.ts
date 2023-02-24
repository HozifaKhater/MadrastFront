import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Corridor_supervisionDataService {
    public supervision_id: number;
    public corridor_id: string;
    public basic_emp_id: string;
    public basic_emp_name: string;
    public spare_emp_id: string;
    public spare_emp_name: string;
    public from_date: string;
    public to_date: string;
    public corridor_name: string;
    public dep_id: string;
    public dep_name: string;
    public emp_id: string;
    public emp_name: string;



    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllCorridor_supervision(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Corridor_supervision');
    }
    GetAllCorridor_supervision_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Corridor_supervision/id?id=' + val);
    }
    addCorridor_supervision(val: any) {
        return this.http.post(this.APIUrl + '/Corridor_supervision', val);
    }
    updateCorridor_supervision(val: any) {
        return this.http.put(this.APIUrl + '/Corridor_supervision', val);
    }

    deleteCorridor_supervision(id: any) {
        return this.http.delete(this.APIUrl + '/Corridor_supervision/' + id);
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