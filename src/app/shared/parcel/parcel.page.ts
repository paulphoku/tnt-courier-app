import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { RequestService } from '../../services/request.service';
import { GeolocationService } from '../../services/geolocation.service';
import * as map_style from '../../providers/map.styles';
import { ActivatedRoute } from '@angular/router';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLngBounds
} from '@ionic-native/google-maps/ngx';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.page.html',
  styleUrls: ['./parcel.page.scss'],
})

export class ParcelPage implements OnInit {

  @Input('ism') ism: Boolean;
  @Input('parcel') parcel: Object;

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  map: GoogleMap;
  latlng: LatLngBounds;

  origin_marker: Marker;
  destination_marker: Marker;

  constructor(
    private modalCtrl: ModalController,
    private r_service: RequestService,
    private geo: GeolocationService,
    private navCtrl: NavController,
    private platform: Platform,
    public activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.ism = res['ism'];
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.navBack();
    });

    this.latlng = new LatLngBounds([
      { lat: -25.9396489, lng: 28.138786 },
      { lat: -25.9829208, lng: 28.2113031 }
    ])

    await this.platform.ready();
    await this.load_map();
    await this.locate();

  }

  async load_map() {
    let center = {
      lat: this.latlng.getCenter().lat,
      lng: this.latlng.getCenter().lng
    }

    console.log(
      center
    )

    let options: GoogleMapOptions = {
      controls: {
        compass: false,
        myLocation: false,
        myLocationButton: false,
      },
      camera: {
        target: center,
        // zoom: 16,
      },
      gestures: {
        scroll: false,
        tilt: false,
        rotate: false,
        zoom: false,
      },
      // styles: style

    };

    //initialise map with current location
    this.map = GoogleMaps.create('map_canvas_parcel', options);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');

      this.origin_marker = this.map.addMarkerSync({
        position: { lat: -25.9396489, lng: 28.138786 },
        icon: {
          url: './assets/map/marker-origin.png',
          // size: {
          //   with: 20,
          //   height: 20
          // },
          strokeColor: "white",
          size: new google.maps.Size(24, 24), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        },
        title: 'Origin place'
      });

      this.destination_marker = this.map.addMarkerSync({
        position: { lat: Number(-25.9829208), lng: Number(28.2113031) },
        icon: {
          url: './assets/map/marker-destination.png',
          // size: {
          //   with: 20,
          //   height: 20
          // },
          strokeColor: "white",
          size: new google.maps.Size(24, 24), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor

        },
        title: 'Destination place'
      });
    });



  }

  navBack() {
    if(this.ism){
      this.navCtrl.navigateRoot('client');
    }else{
      this.navCtrl.pop();
    }
  }

  async locate() {
    this.map.moveCamera({
      target: this.latlng,
      duration: 1500,
      padding: 30,
    });
  }

}
