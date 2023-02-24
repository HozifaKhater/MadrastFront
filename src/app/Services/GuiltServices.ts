import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class GuiltServices {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public guilt: string;
    public date_of_guilt: string;
    public details_of_guilt: string;
    public student_id: number;
    public student_name:string;

    constructor(private http: HttpClient) { }

    GetGuilts(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Guilt/GetGuilts');
    }
   
    GetGuiltById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Guilt/GetGuiltById/id?id=' + val);
    }

    GetGuiltByStudentId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Guilt/GetGuiltByStudentId/student_id?student_id=' + val);
    }

    SaveGuilt(val: any) {
        return this.http.post(this.APIUrl + '/Guilt/SaveGuilt', val);
    }

    UpdateGuilt(val: any) {
        return this.http.put(this.APIUrl + '/Guilt/UpdateGuilt', val);
    }

    DeleteGuilt(id: any) {
        return this.http.delete(this.APIUrl + '/Guilt/DeleteGuilt/' + id);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}