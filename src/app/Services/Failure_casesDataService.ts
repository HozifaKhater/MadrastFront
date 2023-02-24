import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Failure_casesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public fail_id: number;
    public fail_lev: string;
    public fail_class: string;
    public fail_student: string;
    public fail_nation: string;
    public fail_mob: string;
    public fail_birth: string;
    public fail_date: string;
    public fail_desc: string;
    public fail_reason: string;
    public fail_sub: string;
    public fail_1: string;
    public fail_2: string;
    public fail_3: string;
    public fail_4: string;
    public fail_end_year: string;
    public fail_sit: string;
    public fail_eff_date: string;
    public fail_eff_results: string;
    public fail_recomm: string;



    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllFailure_cases(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/failure_cases');
    }
    GetAllFailure_cases_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/failure_cases/id?id=' + val);
    }

    addFailure_cases(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/failure_cases', val);
    }
    updateFailure_cases(val: any) {
        return this.http.put(this.APIUrl + '/failure_cases', val);
    }
    deleteFailure_cases(id: any) {
        return this.http.delete(this.APIUrl + '/failure_cases/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Failure_casesDataService);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log(Failure_casesDataService);
    }
}