import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class divisionsDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public div_id: number;
    public dep_id: string;
    public dep_name: string;
    public job_id: string;
    public job_name: string;
    public emp_id: string;
    public emp_name: string;
    public phone: string;
    public mob: string;
    constructor(private http: HttpClient){}
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    GetAlldivisions(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/divisions');
    }
    GetAlldivisions_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/divisions/id?id=' + val);
    }
    adddivisions(val: any) {
        return this.http.post(this.APIUrl + '/divisions', val);
    }
    updatedivisions(val: any) {
        return this.http.put(this.APIUrl + '/divisions', val);
    }
    deletedivisions(id: any) {
        return this.http.delete(this.APIUrl + '/divisions/' + id);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

}  