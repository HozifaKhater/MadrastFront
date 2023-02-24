import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class IndividualCasesService {
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
    public case_type:string;
    public date_of_file_opening: string;
    public transfer_procedures: string;
    public results: string;

    constructor(private http: HttpClient) { }

    GetIndividualCases(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/IndividualCases/GetIndividualCases');
    }
   
    GetIndividualCaseById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/IndividualCases/GetIndividualCaseById/id?id=' + val);
    }

    SaveIndividualCase(val: any) {
        return this.http.post(this.APIUrl + '/IndividualCases/SaveIndividualCase', val);
    }

    UpdateIndividualCase(val: any) {
        return this.http.put(this.APIUrl + '/IndividualCases/UpdateIndividualCase', val);
    }

    DeleteIndividualCase(id: any) {
        return this.http.delete(this.APIUrl + '/IndividualCases/DeleteIndividualCase/' + id);
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