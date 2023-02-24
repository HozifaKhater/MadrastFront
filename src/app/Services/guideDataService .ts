import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class guideDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public type_id: string;
    public type_name: string;
    public level_id: string;
    public level_name: string;
    public class_id: string;
    public class_name: string;
    public student_id: string;
    public student_name: string;
    public services: string;
    public ntoes: string;
    constructor(private http: HttpClient) { }

    GetAllguide(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/guide');
    }
    GetAllguide_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/guide/id?id=' + val);
    }
    addguide(val: any) {
        return this.http.post(this.APIUrl + '/guide', val);
    }
    updateguide(val: any) {
        return this.http.put(this.APIUrl + '/guide', val);
    }
    deleteguide(id: any) {
        return this.http.delete(this.APIUrl + '/guide/' + id);
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