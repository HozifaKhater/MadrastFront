import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class School_partyDataService {
    readonly APIUrl = "https://localhost:44337/api"; 
    private actionUrl: string;
    public sch_party_id: number;
    public dep_id: number;
    public dep_name: string;
    public party_occ: string;
    public party_date: string;
    public party_duration: number;
    public party_loc: string;
    public party_sponsor: string;
    public party_invitees: string;
    public external_part: string;
    public party_desc: string;

    constructor(private http: HttpClient) { }

    GetAllParties(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_party/get_school_party');
    }
    GetAllParties_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/school_party/get_school_party_with_id?id=' + val);
    }
    addParty(val: any) {
        return this.http.post(this.APIUrl + '/school_party/save_in_school_party', val);
    }
    updateParty(val: any) {
        return this.http.put(this.APIUrl + '/school_party/update_school_party', val);
    }

    deleteParty(id: any) {
        return this.http.delete(this.APIUrl + '/school_party/delete_from_school_party/' + id);
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