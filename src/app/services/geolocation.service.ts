import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GeolocationService {
    watch: any;
    constructor(
        public zone: NgZone,
        private geolocation: Geolocation,
    ) {
        let lat: any = localStorage.getItem('last_lat');
        let lng: any = localStorage.getItem('last_lng');
        this.lat = new BehaviorSubject<string>(lat);
        this.lng = new BehaviorSubject<string>(lng);
    }

    public lat: BehaviorSubject<string>;
    set_lat(newValue: string): void {
        this.lat.next(newValue);
        localStorage.setItem('last_lat', newValue);
    }
    get_lat(): Observable<string> {
        return this.lat.asObservable();
    }

    public lng: BehaviorSubject<string>;
    set_lng(newValue: string): void {
        this.lng.next(newValue);
        localStorage.setItem('last_lng', newValue);
    }
    get_lng(): Observable<string> {
        return this.lng.asObservable();
    }

    start_forground_tracking = async () => {
        // Foreground Tracking
        let options = {
            frequency: 5000,
            enableHighAccuracy: true
        };

        this.watch = this.geolocation.watchPosition(options);
        this.watch.subscribe(async (position: any) => {

            // Run update inside o Angular's zone
            this.zone.run(() => {
                if (position) {
                    this.set_lat(position.coords.latitude);
                    this.set_lng(position.coords.longitude);
                    console.log('Pos:', position)
                }
            });

        });

    };
}