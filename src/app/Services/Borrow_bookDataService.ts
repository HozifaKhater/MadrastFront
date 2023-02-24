import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Borrow_bookDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public borr_id: number;
    public borr_date: string;
    public lib_book_name: string;
    public borr_name: string;


    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllBorrow_book(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/borrow_book');
    }
    GetAllBorrow_book_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/borrow_book/id?id=' + val);
    }
    addBorrow_book(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/borrow_book', val);
    }
    updateBorrow_book(val: any) {
        return this.http.put(this.APIUrl + '/borrow_book', val);
    }
    deleteBorrow_book(id: any) {
        return this.http.delete(this.APIUrl + '/borrow_book/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Borrow_bookDataService);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log(Borrow_bookDataService);
    }
}