import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class OtherStudentSlidesService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public level_id: number;
    public level_name: string;
    public class_id: number;
    public class_name: string;
    public student_id: number;
    public student_name: string;
    public def_id: number;
    public s_code: string;
    public slide_type:string;
    public date_of_file_opening: string;
    public details: string;
    public results: string;

    constructor(private http: HttpClient) { }

    GetOtherStudentSlides(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/OtherStudentSlides/GetOtherStudentSlides');
    }
   
    GetOtherStudentSlidesById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/OtherStudentSlides/GetOtherStudentSlidesById/id?id=' + val);
    }

    SaveOtherStudentSlides(val: any) {
        return this.http.post(this.APIUrl + '/OtherStudentSlides/SaveOtherStudentSlides', val);
    }

    UpdateOtherStudentSlides(val: any) {
        return this.http.put(this.APIUrl + '/OtherStudentSlides/UpdateOtherStudentSlides', val);
    }

    DeleteOtherStudentSlides(id: any) {
        return this.http.delete(this.APIUrl + '/OtherStudentSlides/DeleteOtherStudentSlides/' + id);
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