import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Add_libDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public lib_id: number;
    public lib_book: number;
    public lib_ref: number;
    public lib_book_name: string;
    public lib_author_name: string;
    public lib_date: string;
    public lib_page_no: number;
    public lib_rec_no: number;
    public lib_classification: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllAdd_lib(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/add_lib');
    }
    GetAllAdd_lib_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/add_lib/id?id=' + val);
    }
    addAdd_lib(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/add_lib', val);
    }
    updateAdd_lib(val: any) {
        return this.http.put(this.APIUrl + '/add_lib', val);
    }
    deleteAdd_lib(id: any) {
        return this.http.delete(this.APIUrl + '/add_lib/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Add_libDataService);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }
}