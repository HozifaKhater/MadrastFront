import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { Ta7dierJoinEmployee } from '../Ta7dierJoinEmpoyee.Model';

@Injectable({
    providedIn: 'root'
})
export class Ta7dierJoinEmployeeDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    //public ta7dierJoinEmployee: Ta7dierJoinEmployee;

    ta7dier_week: number;
    ta7dier_day : number;
    ta7dier_date:  string;
    ta7dier_name: string;
    ta7dier_notes:string ;
    className: string;
    lev_name: string;
    emp_name: string;
    emp_dep :string;
    subject_name: string;
    
    constructor(private http: HttpClient) { }

    GetTa7dierTable(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Ta7dierJoinEmployee/ta7dier?ta7dier=' + val);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }
}