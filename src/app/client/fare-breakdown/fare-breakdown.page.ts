import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fare-breakdown',
  templateUrl: './fare-breakdown.page.html',
  styleUrls: ['./fare-breakdown.page.scss'],
})
export class FareBreakdownPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

}
