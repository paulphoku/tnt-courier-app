import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  constructor(
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {

  }

  dismiss(){
    this.modalCtrl.dismiss()
  }

}
