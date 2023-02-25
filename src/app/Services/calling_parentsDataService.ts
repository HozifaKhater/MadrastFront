import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class calling_parentsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser	:	string;
    public	date	:	string;
    public	lev_name	:	string;
    public	lev_id	:	string;
    public	class_name	:	string;
    public	class_id	:	string;
    public	meeting_date	:	string;
    public	student_name	:	string;
    public	student_id	:	string;
    public	meeting_side_name	:	string;
    public	meeting_side_id	:	string;
    
    
    constructor(private http: HttpClient) { }

    get_calling_parents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/calling_parents/get_calling_parents/');
    }
    get_calling_parents_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/calling_parents/get_calling_parents_with_id?id=' + val);
    }
    save_in_calling_parents(val: any) {
        return this.http.post(this.APIUrl + '/calling_parents/save_in_calling_parents', val);
    }
    update_calling_parents(val: any) {
        return this.http.put(this.APIUrl + '/calling_parents/update_calling_parents', val);
    }
    delete_from_calling_parents(id: any) {
        return this.http.delete(this.APIUrl + '/calling_parents/delete_from_calling_parents/' + id);
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