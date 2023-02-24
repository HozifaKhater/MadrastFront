import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MasterJobsDataService {
    public job_id: number;
    public job_name: string;
    public job_desc: string;
    public in_class_priv: string;
    public dep_work: string;


    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllActivity(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/master_jobs');
    }
    GetAllprivs(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/job_details_def/privs');
    }
    GetAlljobs_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/master_jobs/id?id=' + val);
    }
    GetAllemps_with_job_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/master_jobs/job_id?job_id=' + val);
    }
    GetAllprivs_with_job_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/job_details_def/job_id_priv?job_id_priv=' + val);
    }
    addjobs(val: any) {
        return this.http.post(this.APIUrl + '/master_jobs', val);
    }
    adddetails_job(val: any) {
        return this.http.post(this.APIUrl + '/job_details_def', val);
    }
    updatejobs(val: any) {
        return this.http.put(this.APIUrl + '/master_jobs', val);
    }
    deletejobs(id: any) {
        return this.http.delete(this.APIUrl + '/master_jobs/' + id);
    }
    deletedetails_jobs(id: any) {
        return this.http.delete(this.APIUrl + '/job_details_def/' + id);
    }
    get_emp_user_privliges_menus_route(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/login/get_emp_user_privliges_menus_route?id=' + val);
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