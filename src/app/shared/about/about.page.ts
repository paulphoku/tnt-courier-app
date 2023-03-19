import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(
    private navCtrl: NavController,

  ) { }

  ngOnInit() {
  }

  navBack() {
    this.navCtrl.pop();
  }

}
