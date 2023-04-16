import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ApiService } from '../../services/api.service';
import { RequestModel } from '../../providers/request.model';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.page.html',
  styleUrls: ['./parcels.page.scss'],
})
export class ParcelsPage implements OnInit {

  @Input('isModal') isModal: Boolean;
  Parcel: any[];
  Request: RequestModel = this.r_service.Request.value;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private api: ApiService,
    private r_service: RequestService,

  ) { }

  ngOnInit() {
    //get user requests
    this.get_requests();
  }

  navBack() {
    this.navCtrl.pop();
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  /**
   * open_parcel
   */
  public open_parcel(Parcel: any) {
    console.log(Parcel);
    this.Request.destination_addr = Parcel.destination_address;
    this.Request.destination_lat = Parcel.destination_lat;
    this.Request.destination_lng = Parcel.destination_lng;

    this.Request.collection_addr = Parcel.collection_address;
    this.Request.collection_lat = Parcel.collection_lat;
    this.Request.collection_lng = Parcel.collection_lng;

    this.Request.reciever_name = Parcel.reciever_name;
    this.Request.reciever_number = Parcel.reciever_number;
    this.Request.request_notes = Parcel.request_notes;

    this.Request.request_status = Parcel.status;
    this.Request.price = Parcel.price;
    this.Request.datecreated = Parcel.addedondatetime;
    this.Request.polyline = Parcel.polyline;
    this.Request.photo_url = Parcel.photo_url;
    this.Request.request_id = Parcel.request_id;

    this.r_service.set_Request(this.Request);

    this.navCtrl.navigateForward('parcel');
  }

  async get_requests() {
    try {
      this.api.get_user_request('user_id').subscribe(res => {
        console.log(res);
        this.Parcel = res.data;
      })
    } catch (error) {

    }
  }

}
