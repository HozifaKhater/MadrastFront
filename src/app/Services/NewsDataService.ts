import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Http, Response, Headers } from '@angular/http';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NewsDataService
{
	readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public id: number;
    public news: string;
   
    constructor(private http: HttpClient){}
  
    
    GetNews(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/News/GetNews');
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

}  