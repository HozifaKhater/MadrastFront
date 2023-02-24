import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Daily_absence_statDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string; 
    public absence_stat_id: number;
    public lev_id: number;
    public lev_name: string;
    public tch3eb: string;
    public total_num: number;
    public attendance_num: number;
    public absence_num: number;
    public stu_att_score: number;
    public teach_total_num: number;
    public teach_attend: number;
    public teach_absence: number;
    public teach_att_score: number;
    public tch3eb_id: number;

    constructor(private http: HttpClient) { }

    GetAllDailystat(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/daily_absence_stat/get_daily_absence_stat');
    }
    GetAllDailystat_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/daily_absence_stat/get_daily_absence_stat_with_id?id=' + val);
    }

    get_levels_stats(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/levels/get_levels_stats');
    }

    addDailystat(val: any) {
        return this.http.post(this.APIUrl + '/daily_absence_stat/save_in_daily_absence_stat', val);
    }
    updateDailystat(val: any) {
        return this.http.put(this.APIUrl + '/daily_absence_stat/update_daily_absence_stat', val);
    }

    deleteDailystat(id: any) {
        return this.http.delete(this.APIUrl + '/daily_absence_stat/delete_from_daily_absence_stat/' + id);
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