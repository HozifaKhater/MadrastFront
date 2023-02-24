import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class student_parent_meetingDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public date: string;
    public level_name: string;
    public level_id: string;
    public class_name: string;
    public class_id: string;
    public student_id: string;
    public student_name: string;
    public reason: string;
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    GetAllstudent_parent_meeting(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_parent_meeting');
    }
    GetAllstudent_parent_meeting_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student_parent_meeting/id?id=' + val);
    }
    addstudent_parent_meeting(val: any) {
        return this.http.post(this.APIUrl + '/student_parent_meeting', val);
    }
    updatestudent_parent_meeting(val: any) {
        return this.http.put(this.APIUrl + '/student_parent_meeting', val);
    }
    deletestudent_parent_meeting(id: any) {
        return this.http.delete(this.APIUrl + '/student_parent_meeting/' + id);
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