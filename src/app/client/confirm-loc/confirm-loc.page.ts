import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';
import { PaymentPage } from '../../client/payment/payment.page';
import { GeolocationService } from '../../services/geolocation.service';
import { FareBreakdownPage } from '../../client/fare-breakdown/fare-breakdown.page';
import { environment } from 'src/environments/environment';
import { ParcelPage } from '../../shared/parcel/parcel.page';
import * as map_style from '../../providers/map.styles';

@Component({
  selector: 'app-confirm-loc',
  templateUrl: './confirm-loc.page.html',
  styleUrls: ['./confirm-loc.page.scss'],
})


export class ConfirmLocPage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  map: google.maps.Map;
  origin_marker: google.maps.Marker;
  destination_marker: google.maps.Marker;
  latlng: google.maps.LatLngBounds;

  constructor(
    private r_service: RequestService,
    private navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.load_map();
    })
  }

  navBack() {
    this.navCtrl.pop();
  }

  async locate() {
    // Move the map programmatically
    this.map.fitBounds(this.latlng);
  }

  async load_map() {

    this.latlng = new google.maps.LatLngBounds(
      { lat: -25.9396489, lng: 28.138786 },
      { lat: -25.9829208, lng: 28.2113031 },
    )

    this.map = new google.maps.Map(document.getElementById('map_canvas_confirm_loc'), {
      center: this.latlng.getCenter(),
      zoom: 9,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: true,
    });

    this.map.fitBounds(this.latlng);
    this.set_map_styles();
    //DarkMap by default
    this.map.setMapTypeId('2DMap');

    this.origin_marker = new google.maps.Marker({
      position: { lat: Number(-25.9396489), lng: Number(28.138786) },
      map: this.map,
      icon: {
        url: 'assets/map/marker origin.png',
        strokeColor: "white",
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
    });

    this.destination_marker = new google.maps.Marker({
      position: { lat: Number(-25.9829208), lng: Number(28.2113031) },
      map: this.map,
      icon: {
        url: 'assets/map/marker destination.png',
        strokeColor: "white",
        scaledSize: new google.maps.Size(20, 20), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
      }
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

    modal.present();
    modal.onWillDismiss().then(data => {
      this.navCtrl.navigateRoot('client');
      this.r_service.clear_request();
    })
  }


  /**
 * set_styles
 */
  public set_map_styles() {
    //Associate the styled map with the MapTypeId and set it to display.
    this.map.mapTypes.set("RetroMap", map_style.RetroMapStyle);
    this.map.mapTypes.set("DarkMap", map_style.DarkMapStyle);
    this.map.mapTypes.set("2DMap", map_style.StandardMapStyle);
  }

  /**
   * change_style
   */
  public change_style(mapStyle: any) {
    this.map.setMapTypeId(mapStyle)
  }

}
