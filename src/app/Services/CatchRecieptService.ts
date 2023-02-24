import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class CatchRecieptService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public title: string;
    public serial_number: number;
    public region: string;
    public center_number : number;
    public school_name: string;
    public dinar_value: number;
    public fels_value: number;
    public date_of_reciept : string;
    public client_name: string;
    public emp_id: number;
    public total_in_arabic: string;
    public cache_or_check: string;
    public bank_name:string;
    public details: string;
    
    constructor(private http: HttpClient) { }

    GetCatchReciept(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/CatchReciept/GetCatchReciept');
    }
   
    GetCatchRecieptWithId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/CatchReciept/GetCatchRecieptById/id?id=' + val);
    }

    SaveCatchReciept(val: any) {
        return this.http.post(this.APIUrl + '/CatchReciept/SaveCatchReciept', val);
    }

    UpdateCatchReciept(val: any) {
        return this.http.put(this.APIUrl + '/CatchReciept/UpdateCatchReciept', val);
    }

    DeleteCatchReciept(id: any) {
        return this.http.delete(this.APIUrl + '/CatchReciept/DeleteCatchReciept/' + id);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}