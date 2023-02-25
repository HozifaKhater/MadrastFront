import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class teacher_opinion_visitDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    ser:string;
    takeem_id:string;
    emp_id:string;
    is_agree:string;
    notes:string;
    constructor(private http: HttpClient) { }

    get_teacher_opinion_visit(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/teacher_opinion_visit/get_teacher_opinion_visit/');
    }
    get_teacher_opinion_visit_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/teacher_opinion_visit/get_teacher_opinion_visit_with_id?id=' + val);
    }
    save_in_teacher_opinion_visit(val: any) {
        return this.http.post(this.APIUrl + '/teacher_opinion_visit/save_in_teacher_opinion_visit', val);
    }
    update_teacher_opinion_visit(val: any) {
        return this.http.put(this.APIUrl + '/update_teacher_opinion_visit/update_teacher_opinion_visit', val);
    }
    delete_from_teacher_opinion_visit(id: any) {
        return this.http.delete(this.APIUrl + '/teacher_opinion_visit/delete_from_teacher_opinion_visit/' + id);
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