import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';
import { PaymentPage } from '../../client/payment/payment.page';
import { GeolocationService } from '../../services/geolocation.service';
import { FareBreakdownPage } from '../../client/fare-breakdown/fare-breakdown.page';
import { environment } from 'src/environments/environment';
import { ParcelPage } from '../../shared/parcel/parcel.page';
import * as map_style from '../../providers/map.styles';
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

  constructor(
    private r_service: RequestService,
    private navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
  ) { }

  async ngOnInit() {
    this.latlng = new LatLngBounds([
      { lat: -25.9396489, lng: 28.138786 },
      { lat: -25.9829208, lng: 28.2113031 }
    ])

    await this.platform.ready();
    await this.load_map();
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

}
