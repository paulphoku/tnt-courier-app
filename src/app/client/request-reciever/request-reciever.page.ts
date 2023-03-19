import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-request-reciever',
  templateUrl: './request-reciever.page.html',
  styleUrls: ['./request-reciever.page.scss'],
})
export class RequestRecieverPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
  }

  navBack() {
    this.navCtrl.pop();
  }

  /**
   * submit
   */
  public submit() {
    this.navCtrl.navigateForward('confirm-loc')
  }
}
