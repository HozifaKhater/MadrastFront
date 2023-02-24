import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Supervisor_opinionDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public supervisor_opin_id : number;
    public lev_id: number;
    public lev_name: string;
    public class_id: number;
    public class_name: string;
    public dep_id: number;
    public dep_name: string;
    public student_id: number;
    public student_name: string;
    public super_opin_date: string;
    public behave_stat_rep: string;
    public dep_mang_opin: string;
    public supervisor_opin: string;
 
 

    constructor(private http: HttpClient) { }

    GetAllSuperopin(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Supervisor_opinion/get_supervisor_opinion');
    }
    GetAllSuperopin_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Supervisor_opinion/get_supervisor_opinion_with_id?id=' + val);
    }
    addSuperopin(val: any) {
        return this.http.post(this.APIUrl + '/Supervisor_opinion/save_in_supervisor_opinion', val);
    }
    updateSuperopin(val: any) {
        return this.http.put(this.APIUrl + '/Supervisor_opinion/update_supervisor_opinion', val);
    }
    deleteSuperopin(id: any) {
        return this.http.delete(this.APIUrl + '/Supervisor_opinion/delete_from_supervisor_opinion/' + id);
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