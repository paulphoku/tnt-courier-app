import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotPassPage } from '../forgot-pass/forgot-pass.page';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.page.html',
  styleUrls: ['./change-pass.page.scss'],
})
export class ChangePassPage implements OnInit {

  isPv1: Boolean = false;
  isPv2: Boolean = false;

  @ViewChild('pass_input1') pass_input1: ElementRef;
  @ViewChild('pass_input2') pass_input2: ElementRef;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async reset_pass() {
    this.dismiss();
    let modal = await this.modalCtrl.create({
      component: ForgotPassPage,
      breakpoints: [0, .35],
      initialBreakpoint: .4,
      componentProps: {
        email: 'paulphoku@gmail.com',
        isLoggedin: true
      }
    })

    modal.present();
  }

  submit() {
    this.dismiss();
  }

  set_isPv1() {
    this.isPv1 = !this.isPv1;
  }

  set_isPv2() {
    this.isPv2 = !this.isPv2
  }

}
