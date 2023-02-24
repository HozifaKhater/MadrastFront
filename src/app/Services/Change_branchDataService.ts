import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Change_branchDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public branch_id : number;
    public branch_level: string;
    public branch_class: string;
    public branch_student: string;
    public branch_from: string;
    public branch_to: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllChange_branch(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/change_branch');
    }
    GetAllChange_branch_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/change_branch/id?id=' + val);
    }
    addChange_branch(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/change_branch', val);
    }
    updateChange_branch(val: any) {
        return this.http.put(this.APIUrl + '/change_branch', val);
    }
    deleteChange_branch(id: any) {
        return this.http.delete(this.APIUrl + '/change_branch/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Change_branchDataService);
    }
}