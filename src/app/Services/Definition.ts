import { EventEmitter, Injectable, Output } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class DefinitionDataService{
    readonly APIUrl = "https://localhost:44337/api";
    private actionUrl: string;
    public def_id: number;
    public def_name: string;
    public s_code: string;
    public s_code_arabic: string;

    constructor(private http: HttpClient) { }

    GetDefinitions(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination');
    }

    GetSCodes(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/sCodeArabic');
    }

    GetDefinitionWithId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/id?id=' + val);
    }

    GetFollowedUpSlides(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/GetFollowedUpSlidesDefinition');
    }

    GetSituationTypes(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/GetSituationTypes');
    }

    addDefinition(val: any) {
        return this.http.post(this.APIUrl + '/defination', val);
    }

    updateDefinition(val: any) {
        return this.http.put(this.APIUrl + '/defination', val);
    }

    deleteDefinition(id: any) {
        return this.http.delete(this.APIUrl + '/defination/' + id);
    }
    Getdefinations_with_scode(val): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/scode?scode=' + val);
    }
    @Output() aClickedEvent = new EventEmitter<string>();

    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();

    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

}

