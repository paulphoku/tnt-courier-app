import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  /**
   * submit
   */
  public submit() {
    this.navCtrl.navigateForward('client');
  }

  /**
   * navback
   */
  public navback() {
    this.navCtrl.navigateBack('')
    console.log('back to the future!')
  }

}
