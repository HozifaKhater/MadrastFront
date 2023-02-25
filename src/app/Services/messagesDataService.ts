import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class messagesDataService {
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public	msg_id	:	string;
    public	from_emp_id	:	string;
    public	to_emp_id	:	string;
    public	title	:	string;
    public	body	:	string;
    public	date	:	string;
    public	reply	:	string;
    
    
    constructor(private http: HttpClient) { }

    //public GetAlldepartment = (): Observable<any> =>  
    //{

    //    return this.http1.get(this.actionUrl).map((response: Response) => <any>response.json());

    //}
    get_message_with_id(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_message_with_id?id='+ val);
    }
    get_inbox(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_inbox?id=' + val);
    }
    get_message_with_to_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_message_with_to_id?id=' + val);
    }
    get_message_with_to_id_emails(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_message_with_to_id_emails?id=' + val);
    }
    get_message_with_to_id_noti(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_message_with_to_id_noti?id=' + val);
    }
    save_in_messages(val: any) {
       
        return this.http.post(this.APIUrl + '/messages/save_in_messages', val);
    }

    save_in_messages_to_emp_id(val: any) {
       
        if(val !== null && val !== undefined){
            return this.http.post(this.APIUrl + '/messages/save_in_messages_to_emp_id', val);

        }
    }

    save_in_messages_files(val: any) {
        
        return this.http.post(this.APIUrl + '/messages/save_in_messages_files', val);
    }
    get_messages_emails_to_emp_id_with_msg_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/messages/get_messages_emails_to_emp_id_with_msg_id?id=' + val);
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