import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.page.html',
  styleUrls: ['./parcels.page.scss'],
})
export class ParcelsPage implements OnInit {

 @Input('isModal') isModal : Boolean;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,

  ) { }

  ngOnInit() {
  }

  navBack() {
    this.navCtrl.pop();
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

  /**
   * open_parcel
   */
  public open_parcel() {
    this.navCtrl.navigateForward('parcel');
  }

}
