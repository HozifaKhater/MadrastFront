import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class corridorsDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public corridor_id: number;
    public corridor_name: string;
    public corridor_desc: string;
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllCorridors(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/corridors');
    }
    GetAllCorridors_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/corridors/id?id=' + val);
    }
    addCorridors(val: any) {
        return this.http.post(this.APIUrl + '/corridors', val);
    }
    updateCorridors(val: any) {
        return this.http.put(this.APIUrl + '/corridors', val);
    }
    deleteCorridors(id: any) {
        return this.http.delete(this.APIUrl + '/corridors/' + id);
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