import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class student_status_behaviour_reportDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser:	string;
    public	dep_id:	string;
    public	dep_name:	string;
    public	strength:	string;
    public	weakness:	string;
    public	chances:	string;
    public	risks:		string;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_student_status_behaviour_report(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_status_behaviour_report/get_student_status_behaviour_report/');
    }
    get_student_status_behaviour_report_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_status_behaviour_report/get_student_status_behaviour_report_with_id?id=' + val);
    }
    save_in_student_status_behaviour_report(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_status_behaviour_report/save_in_student_status_behaviour_report', val);
    }
    update_student_status_behaviour_report(val: any) {
        return this.http.put(this.APIUrl + '/update_student_status_behaviour_report/update_student_status_behaviour_report', val);
    }
    delete_from_student_status_behaviour_report(id: any) {
        return this.http.delete(this.APIUrl + '/student_status_behaviour_report/delete_from_student_status_behaviour_report/' + id);
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