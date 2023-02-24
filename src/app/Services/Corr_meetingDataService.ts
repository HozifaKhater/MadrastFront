import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Corr_meetingDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public corr_meet_id: number;
    public corr_meet_date: string;
    public corr_meet_time: string;
    public corr_meet_loc: string;


    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllCorr_meeting(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/corr_meeting');
    }
    GetAllCorr_meeting_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/corr_meeting/id?id=' + val);
    }
    addCorr_meeting(val: any) {
        return this.http.post(this.APIUrl + '/corr_meeting', val);
    }
    updateCorr_meeting(val: any) {
        return this.http.put(this.APIUrl + '/corr_meeting', val);
    }
    deleteCorr_meeting(id: any) {
        return this.http.delete(this.APIUrl + '/corr_meeting/' + id);
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