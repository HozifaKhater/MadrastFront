import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Social_workerDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public social_id: number;
    public social_level: string;
    public social_class: string;
    public social_dep: string;
    public social_students: string;
    public social_date: string;
    public social_report: string;
    public social_man_dep: string;
    public social_super: string;
    public social_worker_opin: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllSocial_worker(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/social_worker');
    }
    GetAllSocial_worker_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/social_worker/id?id=' + val);
    }
    addSocial_worker(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/social_worker', val);
    }
    updateSocial_worker(val: any) {
        return this.http.put(this.APIUrl + '/social_worker', val);
    }
    deleteSocial_worker(id: any) {
        return this.http.delete(this.APIUrl + '/social_worker/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Social_workerDataService);
    }
}