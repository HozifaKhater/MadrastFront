import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class new_workDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public ser: number;
    public new_work_var: string;
   
    public date: string;
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    GetAllnew_work(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/new_work');
    }
    GetAllnew_work_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/new_work/id?id=' + val);
    }
    addnew_work(val: any) {
        return this.http.post(this.APIUrl + '/new_work', val);
    }
    updatenew_work(val: any) {
        return this.http.put(this.APIUrl + '/new_work', val);
    }
    deletenew_work(id: any) {
        return this.http.delete(this.APIUrl + '/new_work/' + id);
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