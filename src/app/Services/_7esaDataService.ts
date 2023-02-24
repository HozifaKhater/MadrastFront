import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class _7esa_defDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser	:	string;
    public	start_time	:	string;
    public	end_time	:	string;
    public	duration	:	string;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_7esa_def(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/_7sa_def/get_7sa_def/');
    }
    get_7esa_def_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/_7sa_def/get_7sa_def_with_id?id=' + val);
    }
    save_in_7esa_def(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/_7sa_def/save_in_7sa_def', val);
    }
    update_7esa_def(val: any) {
        return this.http.put(this.APIUrl + '/_7sa_def/update_7sa_def', val);
    }
    delete_from_7esa_def(id: any) {
        return this.http.delete(this.APIUrl + '/_7sa_def/delete_from_7sa_def/' + id);
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