import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp-confirm',
  templateUrl: './otp-confirm.page.html',
  styleUrls: ['./otp-confirm.page.scss'],
})
export class OtpConfirmPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit(
  ) {
  }

  /**
 * submit
 */
  public submit() {
    this.navCtrl.navigateForward('signup');
  }

}
