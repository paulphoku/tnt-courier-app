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
} from '@ionic-native/google-maps';
import { ApiService } from '../../services/api.service';
import { RequestModel } from '../../providers/request.model';

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
  request_id: any;
  Request: RequestModel;


  constructor(
    private modalCtrl: ModalController,
    private r_service: RequestService,
    private geo: GeolocationService,
    private navCtrl: NavController,
    private platform: Platform,
    public activatedRoute: ActivatedRoute,
    private api: ApiService,
  ) { }

  async ngOnInit() {
    this.r_service.get_Request().subscribe(val => {
      this.Request = val;
      console.log('Parcel', val)
    })

    await this.platform.ready();
    await this.load_map();
    await this.locate();

    this.activatedRoute.queryParams.subscribe(async (res) => {
      console.log(res);
      this.ism = res['ism'];
      this.request_id = res['t_id'];
      if (this.request_id) {
        this.get_request();
      } else {
        await this.set_map_objects();
      }
    });

    this.platform.backButton.subscribeWithPriority(10, () => {
      console.log('Handler was called!');
      this.navBack();
    });

    this.latlng = new LatLngBounds([
      { lat: -25.9396489, lng: 28.138786 },
      { lat: -25.9829208, lng: 28.2113031 }
    ])

  }

  async load_map() {
    let center = {
      lat: this.latlng.getCenter().lat,
      lng: this.latlng.getCenter().lng
    }

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
    });

  }

  navBack() {
    if (this.ism == true) {
      this.navCtrl.navigateRoot('client');
    } else {
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

  async get_request() {

    try {
      this.api.get_request(this.request_id).subscribe(res => {
        // console.log('Parcel', res);
        this.Request.destination_addr = res.data[0].destination_address;
        this.Request.destination_lat = res.data[0].destination_lat;
        this.Request.destination_lng = res.data[0].destination_lng;

        this.Request.collection_addr = res.data[0].collection_address;
        this.Request.collection_lat = res.data[0].collection_lat;
        this.Request.collection_lng = res.data[0].collection_lng;

        this.Request.reciever_name = res.data[0].reciever_name;
        this.Request.reciever_number = res.data[0].reciever_number;
        this.Request.request_notes = res.data[0].request_notes;

        this.Request.request_status = res.data[0].status;
        this.Request.price = res.data[0].price;
        this.Request.datecreated = res.data[0].addedondatetime;
        this.Request.polyline = res.data[0].polyline;
        this.Request.photo_url = res.data[0].photo_url;

        
        this.r_service.set_Request(this.Request);
      })
    } catch (error) {

    }
  }

  async set_map_objects() {
    if (!this.map) return;

    this.origin_marker = this.map.addMarkerSync({
      position: { lat: this.Request.collection_lat, lng: this.Request.collection_lng },
      icon: {
        url: './assets/map/marker-origin.png',
        strokeColor: "white",
        size: new google.maps.Size(24, 24), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      },
      title: this.Request.collection_addr
    });

    this.destination_marker = this.map.addMarkerSync({
      position: { lat: this.Request.destination_lat, lng: this.Request.destination_lng },
      icon: {
        url: './assets/map/marker-destination.png',
        strokeColor: "white",
        size: new google.maps.Size(24, 24), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      },
      title: this.Request.destination_addr
    });

    await this.locate();
  }
}
