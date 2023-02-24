import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Speaking_disorderDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public speech_dis_id: number;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public nationality_id: number;
    public nationality_name: string;
    public phone_no: string;
    public birth_date: string;
    public work_start_date: string;
    public behavioral_notes: string;
    public dis_type: string;

    public speaking_details_id: number;
    public other_situations: string;
    public date: string;
    public effort_results: string;
    public end_year_state: string;

    public psychol_visit_id: number;
    public visit_date: string;
    public visit_results: string;


    constructor(private http: HttpClient) { }

    GetAllSpeaking_disorder(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Speaking_disorder/get_speaking_disorder');
    }
    GetAllSpeaking_disorder_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Speaking_disorder/get_speaking_disorder_with_id?id=' + val);
    }
    addSpeaking_disorder(val: any) {
        return this.http.post(this.APIUrl + '/Speaking_disorder/save_in_speaking_disorder', val);
    }
    addSpeaking_disorderDetailsFirst(val: any) {
        return this.http.post(this.APIUrl + '/Speaking_disorder/save_in_speaking_details_first', val);
    }
    addSpeaking_disorderDetailsSecond(val: any) {
        return this.http.post(this.APIUrl + '/Speaking_disorder/save_in_speaking_details_second', val);
    }
    updateSpeaking_disorder(val: any) {
        return this.http.put(this.APIUrl + '/Speaking_disorder/update_speaking_disorder', val);
    }

    deleteSpeaking_disorder(id: any) {
        return this.http.delete(this.APIUrl + '/Speaking_disorder/delete_from_speaking_disorder/' + id);
    }
    deleteSpeaking_disorderDetailsFirst(id: any) {
        return this.http.delete(this.APIUrl + '/Speaking_disorder/delete_from_speaking_details_second/' + id);
    }

    delete_from_speaking_details_first_with_speech_dis_id(id: any) {
        return this.http.delete(this.APIUrl + '/Speaking_disorder/delete_from_speaking_details_first_with_speech_dis_id/' + id);
    }

    deleteSpeaking_disorderDetailsSecond(id: any) {
        return this.http.delete(this.APIUrl + '/Speaking_disorder/delete_from_speaking_details_second/' + id);
    }

    delete_from_speaking_details_second_with_speech_dis_id(id: any) {
        return this.http.delete(this.APIUrl + '/Speaking_disorder/delete_from_speaking_details_second_with_speech_dis_id/' + id);
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