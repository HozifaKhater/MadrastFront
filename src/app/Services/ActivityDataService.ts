import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ActivityDataService
{
    //https://https://localhost:44337
    // readonly APIUrl = "https://localhost:44337/api";
      readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    activity_id: number;
    activity_name: string;
    activity_dep: string = "";
    activity_school_year: string = "";
    activity_school_year_id: string = "";
    activity_level: string = "";
    activity_date: string = "";
    activity_school_term: string = "";
    activity_notes: string = "";
    dep_id: string = "";
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    GetAllActivity(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/activity');
    }
    GetAllActivity_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/activity/id?id=' + val);
    }
    addActivity(val: any) {
        return this.http.post(this.APIUrl + '/activity', val);
    }
    updateActivity(val: any) {
        return this.http.put(this.APIUrl + '/activity', val);
    }
    deleteActivity(id: any) {
        return this.http.delete(this.APIUrl + '/activity/' + id);
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