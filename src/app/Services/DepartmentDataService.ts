import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DepartmentDataService
{
   /* dep_id: any;*/
    public dep_id: string;
    public dep_name: string;
    public dep_desc: string;
    public dep_supervisor_id: string;
    public dep_supervisor_name: string;
    public parent_id: string;
    public emp_id: string;
    get data(): any {
        return this.dep_id
    }
     set data(val: any) {
         this.dep_id = val;   
    }

    get dep_id1(): any {
        return this.dep_id
    }
    set dep_id1(val: any) {
        this.dep_id = val;
    }
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;  
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    //getfilter(): Observable<any[]> {
    //    return this.filterdata.asObservable();
    //}
 
    GetAllMasterdepartment(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/master');
    }
    GetAllsidedepartment(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/side');
    }
    GetAlldepartment(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department');
    }
    GetAlldepartment_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/id?id=' + val);
    }
    get_department_def_with_master_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/get_department_def_with_master_id?id=' + val);
    }
    addDepartment(val: any) {
        return this.http.post(this.APIUrl + '/department', val);
    }
    updateDepartment(val: any) {
        return this.http.put(this.APIUrl + '/department', val);
    }
    deleteDepartment(val: any) {
        return this.http.delete(this.APIUrl + '/Department/' + val);
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