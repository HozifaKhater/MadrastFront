import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class boardDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public board_id: string;
    public board_name: string;
    public board_type_id: string;
    public lev_id: string;
    public lev_name: string;
    public student_name: string;
    public student_id: string;
    public rank_id: string;
    public rank_name: string;
    public parent_name: string;
    public parent_job: string;
    public address: string;
    public mobile: string;
    public mobile2: string;
    public dep_name: string;
    public dep_id: string;
    public job_name: string;
    public job_id: string;
    public emp_name: string;
    public emp_id: string;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_board(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/board/get_board/');
    }
    get_board_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/board/get_board_with_id?id=' + val);
    }
    save_in_board(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/board/save_in_board', val);
    }
    update_board(val: any) {
        return this.http.put(this.APIUrl + '/update_board/update_board', val);
    }
    delete_from_board(id: any) {
        return this.http.delete(this.APIUrl + '/board/delete_from_board/' + id);
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