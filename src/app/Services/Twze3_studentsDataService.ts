import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Twze3_studentsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public twze3_id: number;
    public twze3_lev: string;
    public student_id: number;
    public student_name: string;
    public class_id: number;
    public class_name: string;
    public student_class_id: number;
    public student_class_name: string;

    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllTwze3_students(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/twze3_students');
    }

   update_class_in_student(val: any) {
        return this.http.put(this.APIUrl + '/update_class_in_student', val);
    }

    GetAllTwze3_students_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/twze3_students/id?id=' + val);
    }

    addTwze3_students(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/twze3_students', val);
    }
    updateTwze3_students(val: any) {
        return this.http.put(this.APIUrl + '/twze3_students', val);
    }
    deleteTwze3_students(id: any) {
        return this.http.delete(this.APIUrl + '/twze3_students/' + id);
    }
    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Twze3_studentsDataService);
    }
}