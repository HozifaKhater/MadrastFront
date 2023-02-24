import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class Training_coursesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public trainig_id: number;
    public trainig_name: string;
    public trainig_from: string;
    public trainig_to: string;
    public traing_desc: string;


    constructor(private http: HttpClient) { }


    addTraining_courses(val: any) {
        console.log("ttt")
        return this.http.post(this.APIUrl + '/training_courses', val);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
        console.log(Training_coursesDataService);
    }
}