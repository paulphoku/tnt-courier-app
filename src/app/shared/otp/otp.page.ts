import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  /**
   * submit
   */
  public submit() {
    this.navCtrl.navigateForward('otp-confirm');
  }

  /**
  * navback
  */
  public navback() {
    this.navCtrl.navigateBack('')
    console.log('back to the future!')
  }

}
