import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ClassesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public class_id : number;
    public class_mr7la: string;
    public class_level: string;
    public class_corr: string;
    public class_name: string;
 

    constructor(private http: HttpClient) { }

    GetAllClasses(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/class');
    }
    GetAllClasses_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/class/id?id=' + val);
    }
    GetAllClasses_with_level_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/class/class_level?class_level=' + val);
    }
    addClasses(val: any) {
        return this.http.post(this.APIUrl + '/class', val);
    }
    updateClasses(val: any) {
        return this.http.put(this.APIUrl + '/class', val);
    }
    deleteClasses(id: any) {
        return this.http.delete(this.APIUrl + '/class/' + id);
    }
    get_class_count_for_teacher(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/class/get_class_count_for_teacher?emp_id=' + val);
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