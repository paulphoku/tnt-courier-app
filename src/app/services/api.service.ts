import { Injectable, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpClientJsonpModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    public drivers: BehaviorSubject<String>;
    // public _Url = "http://192.168.179.123:3000";
    // public _Url = "http://127.0.0.1:3000";
    public _Url = "https://tntcs.onrender.com";

    constructor(
        private http: HttpClient,
    ) {
    }

    //api to get autocomplete address by text
    get_places(input: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/places`, { input });
    }
    //api to get address by coordinates
    get_reverse_geocode(latlng: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/address`, { latlng });
    }
    //api to get map directions
    get_directions(origin: string, destination: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/directions`, { origin, destination });
    }

}