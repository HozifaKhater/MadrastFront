import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class MaintenanceDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public maint_id: number;
    public maint_date: string;
    public maint_type: string;
    public maint_loc: string;
    public maint_work: string;
    public maint_notes: string;


    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    GetAllMaintenance(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Maintenance');
    }
    GetAllMaintenance_with_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Maintenance/id?id=' + val);
    }
    addMaintenance(val: any) {
        return this.http.post(this.APIUrl + '/Maintenance', val);
    }
    updateMaintenance(val: any) {
        return this.http.put(this.APIUrl + '/Maintenance', val);
    }
    deleteMaintenance(id: any) {
        return this.http.delete(this.APIUrl + '/Maintenance/' + id);
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