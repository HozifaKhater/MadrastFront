import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EventsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string; 
    public event_id: number;
    public dep_id: number;
    public dep_name: string;
    public event_loc: string;
    public event_date: string;
    public event_name: string;
    public event_site: string;
    public event_invitees: string;
    public event_objectives: string;
    public event_desc: string;
    public event_time: string;

    constructor(private http: HttpClient) { }

    GetAllEvents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Events/get_events');
    }
    GetAllEvents_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Events/get_events_with_id?id=' + val);
    }
    addEvents(val: any) {
        return this.http.post(this.APIUrl + '/Events/save_in_events', val);
    }
    updateEvents(val: any) {
        return this.http.put(this.APIUrl + '/Events/update_events', val);
    }

    deleteEvents(id: any) {
        return this.http.delete(this.APIUrl + '/Events/delete_from_events/' + id);
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