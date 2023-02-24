import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class enzratDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    ser	:string="";
    level_id	:string="";
    class_id	:string="";
    alert_type	:string="";
    student_id	:string="";
    is_sent	:string="";
    
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_enzrat(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/enzrat/get_enzrat/');
    }
    get_enzrat_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/enzrat/get_enzrat_with_id?id=' + val);
    }
    save_in_enzrat(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/enzrat/save_in_enzrat', val);
    }
    update_enzrat(val: any) {
        return this.http.put(this.APIUrl + '/enzrat/update_enzrat', val);
    }
    delete_from_enzrat(id: any) {
        return this.http.delete(this.APIUrl + '/enzrat/delete_from_enzrat/' + id);
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