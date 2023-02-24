import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Group_meetingDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public group_id: number;
    public group_name: string;
    public meeting_no: number;
    public meeting_date: string;
    public meeting_mem_no: number;
    public meeting_loc: string;
    public impor_recomm: string;
    public bus_table: string;
    public	meeting_type_id	:	string;
    public	meeting_type_name	:	string;
    public	dep_id	:	string;
    public	dep_name	:	string;
    public	subject_id	:	string;
    public	subject_name	:	string;
    public	course	:	string;
    public	content	:	string;
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllGroup_meeting(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/group_meeting');
    }
    GetAllGroup_meeting_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/group_meeting/id?id=' + val);
    }
    addGroup_meeting(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/group_meeting', val);
    }
    updateGroup_meeting(val: any) {
        return this.http.put(this.APIUrl + '/group_meeting', val);
    }
    deleteGroup_meeting(id: any) {
        return this.http.delete(this.APIUrl + '/group_meeting/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Group_meetingDataService);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}