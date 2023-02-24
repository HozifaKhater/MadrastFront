import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class swotDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	ser:	string;
    public	dep_id:	string;
    public	dep_name:	string;
    public	strength:	string;
    public	weakness:	string;
    public	chances:	string;
    public	risks:		string;
    
    constructor(private http: HttpClient) { }

    get_swot(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/swot/get_swot/');
    }
    get_swot_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/swot/get_swot_with_id?id=' + val);
    }
    save_in_swot(val: any) {
        return this.http.post(this.APIUrl + '/swot/save_in_swot', val);
    }
    update_swot(val: any) {
        return this.http.put(this.APIUrl + '/swot/update_swot', val);
    }
    delete_from_swot(id: any) {
        return this.http.delete(this.APIUrl + '/swot/delete_from_swot/' + id);
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