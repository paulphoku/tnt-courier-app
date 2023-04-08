import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestModel } from '../../providers/request.model';
import { placeModel } from '../../providers/place.modal';
import { GeolocationService } from '../../services/geolocation.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})

export class RequestPage implements OnInit {
  bp: Number = 0;
  isPinDroped: boolean;
  requestForm: FormGroup;
  selectedInput: string;
  Places: any[];
  Request: RequestModel;
  isRequesting$: any;

  constructor(
    private global: GlobalService,
    private r_service: RequestService,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private geo: GeolocationService,
    private api: ApiService
  ) {
    this.selectedInput = 'd';

    this.requestForm = this.fb.group({
      collection: ['', Validators.required],
      destination: ['', Validators.required],
    });

    let collection = this.requestForm.get('collection');
    let destination = this.requestForm.get('destination');

    this.r_service.get_Request().subscribe(val => {
      this.Request = val;
      // console.log('Request', val)

      collection.setValue(this.Request.collection_addr);
      destination.setValue(this.Request.destination_addr);
    })

    collection.valueChanges.subscribe(val => {
      if (val.length > 0 && this.selectedInput == 'c') {
        this.findPlaces('c', collection.value);
      }
    });

    destination.valueChanges.subscribe(val => {
      if (val.length > 0) {
        this.findPlaces('d', destination.value);
      } else {
        //get previous addreses
        this.get_recent_places();
      }
    });

  }

  modal: any;
  ngOnInit() {
    this.r_service.get_crq_modal_bp().subscribe(bp => {
      this.bp = bp;
    })

  }

  /**
   * dismiss
   */
  public dismiss() {

  }



  /**
   * clear
   */
  public clear() {
    this.r_service.clear_request();
  }

  /**
   * isRequesting
   */


  get isRequesting() {
    return this.bp > .4 || (this.Request.collection_addr.length > 0) ? true : false;
  }

  /**
   * select_addr
   */
  public select_addr(place: placeModel) {
    if (this.Request.selectedInput === 'c') {
      this.Request.collection_addr = place.description;
      this.Request.collection_lat = place.location.lat;
      this.Request.collection_lng = place.location.lng;
      this.r_service.set_Request(this.Request)
    } else {
      this.Request.destination_addr = place.description;
      this.Request.destination_lat = place.location.lat;
      this.Request.destination_lng = place.location.lng;
      this.r_service.set_Request(this.Request);

      if (
        this.Request.collection_addr.length > 0
        && this.Request.destination_addr.length > 0
      ) {
        this.navCtrl.navigateForward('request-reciever');
      }
    };
  }

  /**
   * select_input
   */
  public select_input(addr_type: string) {
    this.Request.selectedInput = addr_type;
    this.r_service.set_Request(this.Request);
    this.r_service.enlarge_crq_modal();
  }

  /**
   * choose_on_map
   */
  public present_pindrop(addr_type: string) {
    this.modal.setCurrentBreakpoint(.4);
    this.r_service.set_isPinDroped(true);
    this.Request.selectedInput = addr_type;
    this.r_service.set_Request(this.Request);
  }

  /**
   * dismiss_pindrop
   */
  public dismiss_pindrop() {
    this.r_service.set_isPinDroped(false);
  }

  /**
   * findPlaces
   */
  public findPlaces(addr_type: string, address: string) {

    this.api.get_places(address).subscribe(res => {
      console.log(res);
      this.Places = res;
    })
  }

  /**
     * get_recent_places
     */
  public get_recent_places() {
    this.Places = [];
  }
}
