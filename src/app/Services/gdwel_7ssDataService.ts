import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class gdwel_7ssDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public ser: number;
    public day: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllgdwel_7ss(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss');
    }
    GetAllgdwel_7ss_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/id?id=' + val);
    }
    addgdwel_7ss(val: any) {
        return this.http.post(this.APIUrl + '/gdwel_7ss', val);
    }
    updategdwel_7ss(val: any) {
        return this.http.put(this.APIUrl + '/gdwel_7ss', val);
    }
    deletegdwel_7ss(id: any) {
        return this.http.delete(this.APIUrl + '/gdwel_7ss/' + id);
    }
    get_gdwel_replacements_with_gdwel_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/gdwel_id?id=' + val);
    }
    save_in_gdwel_replacements(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/gdwel_7ss/save_in_gdwel_replacements', val);
    }
    delete_from_gdwel_replacements_with_gdwel_id(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/gdwel_7ss/delete_from_gdwel_replacements_with_gdwel_id', val);
    }
    get_gdwel_7ss_with_subject_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/get_gdwel_7ss_with_subject_id?id=' + val);
    }
    get_gdwel_7ss_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/get_gdwel_7ss_with_emp_id?id=' + val);
    }
    get_gdwel_7ss_with_class_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/get_gdwel_7ss_with_class_id?id=' + val);
    }
    get_gdwel_7ss_with_dep_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/gdwel_7ss/get_gdwel_7ss_with_dep_id?id=' + val);
    }
    update_gdwel_7ss_is_late(val: any) {
       
        return this.http.post(this.APIUrl + '/gdwel_7ss/update_gdwel_7ss_is_late', val);
    }
    update_gdwel_7ss_is_block(val: any) {
       
        return this.http.post(this.APIUrl + '/gdwel_7ss/update_gdwel_7ss_is_block', val);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
}