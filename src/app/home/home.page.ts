import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private navCtrl: NavController
  ) { }

  /**
   * signin
   */
  public signin() {
    this.navCtrl.navigateForward('signin')
  }

  /**
  * signin
  */
  public signup() {
    this.navCtrl.navigateForward('verify-cell',{
      queryParams: {
        prev_url: 'signup',
      },
    })
  }
}
