import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { AddCardPage } from '../../client/add-card/add-card.page';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  @Input('isModal') isModal: Boolean;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  navBack() {
    this.navCtrl.pop();
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  async add_card() {
    let modal = await this.modalCtrl.create({
      component: AddCardPage
    })

    modal.present();
  }

}
