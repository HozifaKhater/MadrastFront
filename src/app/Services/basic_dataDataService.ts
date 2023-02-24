import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class basic_dataDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
     public	id	:	string;
public	name	:	string;
public	file_number	:	string;
public	identity_number	:	string;
public	qualification	:	string;
public	register_date	:	string;
public	civil_number	:	string;
public	exp_years	:	string;
public	emp_id	:	string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllbasic_data(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/basic_data');
    }
    GetAllbasic_data_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/basic_data/id?id=' + val);
    }
    addbasic_data(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/basic_data', val);
    }
    updatebasic_data(val: any) {
        return this.http.put(this.APIUrl + '/basic_data', val);
    }
    deletebasic_data(id: any) {
        return this.http.delete(this.APIUrl + '/basic_data/' + id);
    }

    GetAlldiv_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/basic_data/div?id=' + val);
    }
    GetAlltraining_course_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/basic_data/training?id=' + val);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(basic_dataDataService);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
        console.log(basic_dataDataService);
    }

    @Output() cClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    CClicked(msg: string) {
        this.cClickedEvent.emit(msg);
        console.log(basic_dataDataService);
    }
    @Output() dClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    DClicked(msg: string) {
        this.dClickedEvent.emit(msg);
        console.log(basic_dataDataService);
    }
}