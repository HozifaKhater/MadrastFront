import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class student_trackingDataService {
    private actionUrl: string;
    public	ser:string;
    public	term_id:string;
    public	subject_id:string;
    public	level_id:string;
    public	class_id:string;
    public	date:string;
    public	student_id:string;
    public	behavior:string;
    public	book:string;
    public	practice:string;
    readonly APIUrl = "https://localhost:44337/api";

    constructor(private http: HttpClient) { }

    save_update_student_tracking(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_tracking/save_update_student_tracking', val);
    }   
    get_student_tracking(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_tracking/get_student_tracking', val);
    }
    get_student_tracking_with_date_and_classid(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/student_tracking/get_student_tracking_with_date_and_classid', val);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(msg);
    }

    @Output()bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log("clicked in data service");
    }
    @Output()cClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    CClicked(msg: string) {
        this.cClickedEvent.emit(msg);
        console.log("clicked in data service");
    }
}