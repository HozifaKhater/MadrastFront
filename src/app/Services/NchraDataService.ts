import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NchraDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public nchra_id: number;
    public nchra_date: string;
    public nchra_sender: string;
    public nchra_topic: string;
    public nchra_text: string;
    public nchra_pages_num: number;
    public nchra_attach: string;
    public nachra_file_type:any;
    public is_file: any;
    public is_dep: any;

    constructor(private http: HttpClient) { }

    GetAllNchra(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Nchra');
    }
    GetAllNchra_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Nchra/id?id=' + val);
    }
    addNchra(val: any) {
        return this.http.post(this.APIUrl + '/Nchra', val);
    }
    addNchradetails(val: any) {
        return this.http.post(this.APIUrl + '/nchra_details', val);
    }
    updateNchra(val: any) {
        return this.http.put(this.APIUrl + '/Nchra', val);
    }
    deleteNchra(id: any) {
        return this.http.delete(this.APIUrl + '/Nchra/' + id);
    }
    deleteNchradel(id: any) {
        return this.http.delete(this.APIUrl + '/nchra_details_del/' + id);
    }
    get_nchra_details_with_nchra_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/nchra_details/get_nchra_details_with_nchra_id?nchra_id=' + val);
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