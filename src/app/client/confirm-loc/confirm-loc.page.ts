import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';
import { PaymentPage } from '../../client/payment/payment.page';
import { GeolocationService } from '../../services/geolocation.service';
import { FareBreakdownPage } from '../../client/fare-breakdown/fare-breakdown.page';
import { environment } from 'src/environments/environment';
import { ParcelPage } from '../../shared/parcel/parcel.page';
import { RequestModel } from '../../providers/request.model';
import * as map_style from '../../providers/map.styles';
import { ApiService } from '../../services/api.service';
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
  selector: 'app-confirm-loc',
  templateUrl: './confirm-loc.page.html',
  styleUrls: ['./confirm-loc.page.scss'],
})

export class ConfirmLocPage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  map: GoogleMap;
  latlng: LatLngBounds;

  origin_marker: Marker;
  destination_marker: Marker;
  Request: RequestModel;


  constructor(
    private r_service: RequestService,
    private navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private api: ApiService
  ) { }

  async ngOnInit() {



    this.r_service.get_Request().subscribe(val => {
      this.Request = val;
      console.log('Request:', val)
      this.latlng = new LatLngBounds([
        { lat: this.Request.collection_lat, lng: this.Request.collection_lng },
        { lat: this.Request.destination_lat, lng: this.Request.destination_lng }
      ])
    })


    await this.platform.ready();
    await this.load_map();
    // await this.get_directions(); //enable directions api
    await this.locate();
  }

  navBack() {
    this.navCtrl.pop();
  }

  async locate() {
    this.map.moveCamera({
      target: this.latlng,
      duration: 1500,
      padding: 30,
    });
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
    this.map = GoogleMaps.create('map_canvas_confirm_loc', options);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');

      this.origin_marker = this.map.addMarkerSync({
        position: { lat: this.Request.collection_lat, lng: this.Request.collection_lng },
        icon: {
          url: './assets/map/marker-origin.png',
          strokeColor: "white",
          size: new google.maps.Size(24, 24), // scaled size
          origin: new google.maps.Point(0, 0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        },
        title: 'Origin place'
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
        title: 'Destination place'
      });
    });



  }

  async select_payment() {
    let modal = await this.modalCtrl.create({
      component: PaymentPage,
      componentProps: {
        isModal: true
      }
    })

    await modal.present();
  }

  async open_fare() {
    let modal = await this.modalCtrl.create({
      component: FareBreakdownPage
    })

    modal.present();
  }

  async submit() {
    let modal = await this.modalCtrl.create({
      component: ParcelPage,
      componentProps: {
        isModal: true,
        parcel: {}
      }
    })

    this.navCtrl.navigateRoot('parcel', {
      queryParams: {
        ism: 1,
        t_id: 'T9989829423'
      },
    });

  }


  /**
 * set_styles
 */
  public set_map_styles() {
    //Associate the styled map with the MapTypeId and set it to display.
  }

  /**
   * change_style
   */
  public change_style(mapStyle: any) {
    this.map.setMapTypeId(mapStyle)
  }


  /**
   * get_directions
   */
  public async get_directions() {
    let origin = `${this.Request.collection_lat},${this.Request.collection_lng}`;
    let destination = `${this.Request.destination_lat},${this.Request.destination_lng}`;
    this.api.get_directions(origin, destination).subscribe(res => {
      console.log('Directions:', res)
    })
  }
}
