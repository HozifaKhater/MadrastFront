import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class board_typeDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public board_type_id: string;
    public board_type_name: string;
    public is_student: string;
    public label_student: string;
    public is_rank: string;
    public label_rank: string;
    public is_parent_name: string;
    public label_parent_name: string;
    public is_parent_job: string;
    public label_parent_job: string;
    public is_address: string;
    public label_address: string;
    public is_mobile: string;
    public label_mobile: string;
    public is_mobile2: string;
    public label_mobile2: string;
    public is_dep: string;
    public dep_name: string;
    public is_job: string;
    public label_job: string;
    public is_emp: string;
    public label_emp: string;

    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_board_type(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/board_type/get_board_type/');
    }
    get_board_type_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/board_type/get_board_type_with_id?id=' + val);
    }
    save_in_board_type(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/board_type/save_in_board_type', val);
    }
    update_board_type(val: any) {
        return this.http.put(this.APIUrl + '/update_board_type/update_board_type', val);
    }
    delete_from_board_type(id: any) {
        return this.http.delete(this.APIUrl + '/board_type/delete_from_board_type/' + id);
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