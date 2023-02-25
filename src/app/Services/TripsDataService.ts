import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TripsDataService
{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
  public trip_id: number;
    public dep_id: string;
    public dep_name: string;
    public emp_id: string;
    public emp_name: string;
    public trip_loc: string;
    public trip_date: string;
    public trip_time: string;
    public trip_duration: string;
    public trip_goals: string;
    public trip_notes: string;
    public	student_number	:	string;
    public	trip_type	:	string;
    public	transportation_type	:	string;
    public	class_id	:	string;
    public	level_id	:	string;
    constructor(private http: HttpClient){}

    GetAlltrips(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/trips');
    }
    GetAlltrips_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/trips/id?id=' + val);
    }
    addtrips(val: any) {
        return this.http.post(this.APIUrl + '/trips', val);
    }
    updatetrips(val: any) {
        return this.http.put(this.APIUrl + '/trips', val);
    }
    deletetrips(id: any) {
        return this.http.delete(this.APIUrl + '/trips/' + id);
    }
    deletetrips_details(val: any) {
        return this.http.post(this.APIUrl + '/trips/delete_details_with_trip_id/', val);
    }
    addtrips_details(val: any) {
        return this.http.post(this.APIUrl + '/trips/details', val);
    }
    GetAlldetails_trips_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/trips/details_id?id=' + val);
    }
    GetAlldetails_trips_with_trip_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/trips/details_with_trip_id?id=' + val);
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