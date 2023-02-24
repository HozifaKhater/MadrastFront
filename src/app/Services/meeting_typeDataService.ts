import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class meeting_typeDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	meeting_type_id	:	string;
    public	meeting_type_name	:	string;
    public	is_meeting_date	:	string;
    public	meeting_date	:	string;
    public	is_group_name	:	string;
    public	group_name	:	string;
    public	is_start_time	:	string;
    public	start_time_label	:	string;
    public	is_end_time	:	string;
    public	end_time_label	:	string;
    public	is_group_number	:	string;
    public	group_number_label	:	string;
    public	is_meeting_mem_no	:	string;
    public	meeting_mem_no_label	:	string;
    public	is_meeting_loc	:	string;
    public	meeting_loc_label	:	string;
    public	is_work_plan	:	string;
    public	work_plan_label	:	string;
    public	is_recommendation	:	string;
    public	recommendation_label	:	string;
    public	is_dep	:	string;
    public	dep_label	:	string;
    public	is_subject	:	string;
    public	subject_label	:	string;
    public	is_abscence	:	string;
    public	abscence_label	:	string;
    public	is_course	:	string;
    public	course_label	:	string;
    public	is_content	:	string;
    public	content_label	:	string;
    
    constructor(private http: HttpClient) { }

   
    get_meeting_type(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/meeting_type/get_meeting_type/');
    }
    get_meeting_type_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/meeting_type/get_meeting_type_with_id?id=' + val);
    }
    save_in_meeting_type(val: any) {
        return this.http.post(this.APIUrl + '/meeting_type/save_in_meeting_type', val);
    }
    update_meeting_type(val: any) {
        return this.http.put(this.APIUrl + '/meeting_type/update_meeting_type', val);
    }
    delete_from_meeting_type(id: any) {
        return this.http.delete(this.APIUrl + '/meeting_type/delete_from_meeting_type/' + id);
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