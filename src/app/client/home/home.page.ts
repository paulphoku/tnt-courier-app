import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';
import { MenuPage } from '../../shared/menu/menu.page';
import { GeolocationService } from '../../services/geolocation.service';
import { RequestModel } from '../../providers/request.model';
import { environment } from 'src/environments/environment';
import { MapStyles } from '../../providers/mapstyles';

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

var google;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {
  modal: any;
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  map: GoogleMap;
  latlng: LatLngBounds;

  lat: string = '';
  lng: string = '';
  isPinDroped: Boolean;
  Request: RequestModel;
  loc_marker: Marker;

  constructor(
    private modalCtrl: ModalController,
    private global: GlobalService,
    private r_service: RequestService,
    private geo: GeolocationService,
    private navCtrl: NavController,
    private platform: Platform,
    private map_styles: MapStyles
  ) {

  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.load_map();
    })

    this.r_service.get_Request().subscribe(val => {
      this.Request = val;
    })

    this.geo.get_lat().subscribe(lat => {
      this.lat = this.geo.lat.value;
      this.lng = this.geo.lng.value;
    })



    this.r_service.get_isPinDroped().subscribe(val => {
      this.isPinDroped = val;
    })
  }

  async locate() {
    // Move the map programmatically
    this.map.animateCamera({
      target: {
        lat: Number(this.lat),
        lng: Number(this.lng)
      },
      zoom: 16,
      duration: 1000
    });

    this.map.setCompassEnabled(false);
  }

  async load_map() {

    let style = this.map_styles.purple;

    let options: GoogleMapOptions = {
      controls: {
        compass: false,
        myLocation: true,
        myLocationButton: false,
      },
      camera: {
        target: {
          lat: Number(this.lat),
          lng: Number(this.lng)
        },
        zoom: 16,
      },
      gestures: {
        scroll: true,
        tilt: false,
        rotate: false,
        zoom: true,
      },
      styles: style
    };

    //initialise map with current location
    this.map = GoogleMaps.create('map_canvas_client', options);

  }

  ionViewWillEnter() {
    this.r_service.present_crq_modal();
    console.log('ionViewWillEnter')
  }

  async ionViewWillLeave() {
    this.r_service.dismiss_crq_modal();
    console.log('ionViewWillLeave')
  }

  /**
   * present_menu
   */
  public async present_menu() {
    let modal = await this.modalCtrl.create({
      component: MenuPage,
    })

    await modal.present();
  }

  /**
 * dismiss_pindrop
 */
  public dismiss_pindrop() {
    this.r_service.set_isPinDroped(false);
  }

  /**
   * confirm_pindrop
   */
  public confirm_pindrop() {
    this.r_service.set_isPinDroped(false);
    this.r_service.enlarge_crq_modal();

    if (
      this.Request.selectedInput === 'd'

    ) {
      this.Request.destination_addr = 'test address';
      this.Request.destination_lat = 0;
      this.Request.destination_lng = 0;
      if (
        this.Request.collection_addr.length > 0
        && this.Request.destination_addr.length > 0
      ) {
        this.navCtrl.navigateForward('request-reciever');
      }
    } else {
      this.Request.collection_addr = 'test address';
      this.Request.collection_lat = 0;
      this.Request.collection_lng = 0;
    }

    this.r_service.set_Request(this.Request);
  }

}
