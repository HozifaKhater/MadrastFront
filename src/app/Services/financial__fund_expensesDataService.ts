import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class financial__fund_expensesDataService {
    public id: number;
    public type_name: string;
    public date: string;
    public price: string;
    public notes: string;

    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    constructor(private http: HttpClient) { }

    GetAllfinancial__fund_expenses_supervision(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/financial__fund_expenses');
    }
    GetAllfinancial__fund_expenses_supervision_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/financial__fund_expenses/id?id=' + val);
    }
    addfinancial__fund_expenses(val: any) {
        return this.http.post(this.APIUrl + '/financial__fund_expenses', val);
    }
    updatefinancial__fund_expenses(val: any) {
        return this.http.put(this.APIUrl + '/financial__fund_expenses', val);
    }

    deletefinancial__fund_expenses(id: any) {
        return this.http.delete(this.APIUrl + '/financial__fund_expenses/' + id);
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