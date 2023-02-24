import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class instructionsDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public ser: number;
    public level_name: string;
    public level_id: string;
    public class_name: string;
    public class_id: string;
    public topic: string;
    public group_number: string;
    public sessions_number: string;
    public notes: string;

    constructor(private http: HttpClient){}
 
    GetAllinstructions(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/instructions');
    }
    GetAllinstructions_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/instructions/id?id=' + val);
    }
    addinstructions(val: any) {
        return this.http.post(this.APIUrl + '/instructions', val);
    }
    updateinstructions(val: any) {
        return this.http.put(this.APIUrl + '/instructions', val);
    }
    deleteinstructions(id: any) {
        return this.http.delete(this.APIUrl + '/instructions/' + id);
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