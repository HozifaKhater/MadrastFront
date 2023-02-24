import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class PaymentRecieptService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public serial_number: string;
    public title: string;
    public date_of_reciept : string;
    public region: string;
    public school_name: string;
    public center_number : string;
    public dinar_value: string;
    public fels_value: string;
    public client_name: string;
    public total_in_arabic: string;
    public cash_or_check: string;
    public bank_name:string;
    public details: string;
    public identity_number: string;
    public emp_id: string;

    constructor(private http: HttpClient) { }

    GetPaymentReciepts(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/PaymentReciept/GetPaymentReciept');
    }
   
    GetPaymentRecieptWithId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/PaymentReciept/GetPaymentRecieptById/id?id=' + val);
    }

    SavePaymentReciept(val: any) {
        return this.http.post(this.APIUrl + '/PaymentReciept/SavePaymentReciept', val);
    }

    UpdatePaymentReciept(val: any) {
        return this.http.put(this.APIUrl + '/PaymentReciept/UpdatePaymentReciept', val);
    }

    DeletePaymentReciept(id: any) {
        return this.http.delete(this.APIUrl + '/PaymentReciept/DeletePaymentReciept/' + id);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}