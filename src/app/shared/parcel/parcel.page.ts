import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { RequestService } from '../../services/request.service';
import { GeolocationService } from '../../services/geolocation.service';
import * as map_style from '../../providers/map.styles';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.page.html',
  styleUrls: ['./parcel.page.scss'],
})

export class ParcelPage implements OnInit {

  @Input('isModal') isModal: Boolean;
  @Input('parcel') parcel: Object;

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  map: google.maps.Map;

  origin_marker: google.maps.Marker;
  destination_marker: google.maps.Marker;
  latlng: google.maps.LatLngBounds;

  constructor(
    private modalCtrl: ModalController,
    private r_service: RequestService,
    private geo: GeolocationService,
    private navCtrl: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.platform.ready().then(async () => {
      this.load_map();
    })
  }

  async load_map() {

    this.latlng = new google.maps.LatLngBounds(
      { lat: -25.9396489, lng: 28.138786 },
      { lat: -25.9829208, lng: 28.2113031 },
    )

    this.map = new google.maps.Map(document.getElementById('map_canvas_parcel'), {
      center: this.latlng.getCenter(),
      zoom: 9,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: true,
      scrollwheel: false,
      draggable: false
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
      },
      title: 'Origin place'
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
      },
      title: 'Destination place'
    });

  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  navBack() {
    this.navCtrl.pop();
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
