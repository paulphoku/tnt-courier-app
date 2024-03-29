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


    /**
       * api to get autocomplete address by text
       * 
       * @param latlng 'lat,lng'
       */
    get_places(input: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/places`, { input });
    }

    /**
       * api to get address by coordinates
       * 
       * @param latlng 'lat,lng'
       */
    get_reverse_geocode(latlng: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/address`, { latlng });
    }

    /**
       * api to get map directions
       * 
       * @param tel +27842929337
       * @param msg message
       */
    get_directions(origin: string, destination: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/directions`, { origin, destination });
    }


    /**
        * api to send otp via sms
        * 
        * @param tel +27842929337
        * @param msg message
        */
    get_otp_sms(tel: string, msg: string) {
        return this.http.post<any>(`${this._Url}/v1/verification/sms`, { tel, msg });
    }

    /**
     * api to get user
     * 
     * @param user_id
     * @param email
     * @param tel
     */
    get_user(user_id: string) {
        return this.http.get<any>(`${this._Url}/v1/user/${user_id}`, {});
    }

    /**
     * api to get request
     * 
     * @param request_id
     */
    get_request(request_id: string) {
        return this.http.get<any>(`${this._Url}/v1/request/${request_id}`, {});
    }

    /**
    * api to get user request
    * 
    * @param user_id
    */
    get_user_request(user_id: string) {
        return this.http.get<any>(`${this._Url}/v1/request/user/${user_id}`, {});
    }

    /**
     * api to get user recent places
     * 
     * @param user_id
     */
    get_recent_places(user_id: string) {
        return this.http.post<any>(`${this._Url}/v1/geocode/places/${user_id}`, {});
    }

    /**
    * api to get user
    * 
    * @param user_role 
    * @param address NULL
    * @param id_no NULL
    * @param contact NOT NULL
    * @param email NOT NULL
    * @param country NOT NULL
    * @param state NULL
    * @param datecreated NOT NULL
    * @param modifiedondatetime NOT NULL
    * @param password NULL
    * @param salt NULL
    * @param gender NULL
    * @param names NOT NULL
    * @param surname NOT NULL
    * @param photourl NULL
    * @param username NULL
    * @param dob NULL
    */
    add_user(user_role: string, address: string, id_no: string, contact: string, email: string, country: string, state: string, datecreated: string, modifiedondatetime: string, password: string, salt: string, gender: string, names: string, surname: string, photourl: string, username: string, dob: string) {
        return this.http.post<any>(`${this._Url}/v1/user/`, { user_role, address, id_no, contact, email, country, state, datecreated, modifiedondatetime, password, salt, gender, names, surname, photourl, username, dob });
    }
    /**
     * @param dob NULL
    */
    add_request(user_id: string, description: string, weight: number, price: number, destination_address: string, destination_lat: number, destination_lng: number, collection_address: string, collection_lat: number, collection_lng: number, reciever_name: string, reciever_cell: string, request_notes: string, schedule_time: string, polyline: string, addedondatetime: string) {
        return this.http.post<any>(`${this._Url}/v1/request/`, { user_id, description, weight, price, destination_address, destination_lat, destination_lng, collection_address, collection_lat, collection_lng, reciever_name, reciever_cell, request_notes, schedule_time, polyline, addedondatetime });
    }

    /**
    * api to do a handshake!
    * 
    */
    shake_hands() {
        return this.http.get<any>(`${this._Url}/v1/handshake`, {});
    }

}