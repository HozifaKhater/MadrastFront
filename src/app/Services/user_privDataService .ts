import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import jwt_decode from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class user_privDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    user_id: number;
    emp_id: string;
    priv_name: string = "";
    page_name: string = "";
    in_class_priv: string = "";
    dep_work: string = "";
    job_id: string = "";
     read: string= "";
     read_and_write: string= "";
     write: string= "";
decoded:any;
    constructor(private http: HttpClient){
        const userToken = localStorage.getItem(environment.authTokenKey);
        this.decoded = jwt_decode(userToken);

    }
  
    //public GetAlldepartment = (): Observable<any> =>  
    //{
      
    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());
     
    //}
    get_emp_user_privliges_menus_route_with_route(val: any): Observable<any[]> {
      return this.http.post<any>('https://localhost:44337/api/login/get_emp_user_privliges_menus_route_with_route' , {emp_id:this.decoded.id,menu_route:val});
    }
    GetAlluser_privs(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/emp_user_privliges');
    }
    GetAlluser_privs_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/emp_user_privliges/emp_id?id=' + val);
    }
    adduser_privs(val: any) {
        return this.http.post(this.APIUrl + '/emp_user_privliges', val);
    }
    updateuser_privs(val: any) {
        return this.http.put(this.APIUrl + '/emp_user_privliges', val);
    }
    deleteuser_privs_empinfo(id: any) {
        return this.http.delete(this.APIUrl + '/emp_user_privliges/' + id);
    }
    deleteuser_privs(id: any) {
        return this.http.delete(this.APIUrl + '/emp_user_privliges/emp_id?emp_id=' + id);
    }

    get_priv_pages(val: any,val2: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/emp_user_privliges/get_priv_pages?id=' + val+'&job_id='+val2);
    }
    save_update_emp_user_privliges(val: any) {
        return this.http.post(this.APIUrl + '/emp_user_privliges/save_update_emp_user_privliges', val);
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
    @Output() e_bind_tableClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    f_bind_tableClicked(msg: string) {
        this.e_bind_tableClickedEvent.emit(msg);
    }
}  