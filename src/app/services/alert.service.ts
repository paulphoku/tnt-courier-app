import { AlertController, ModalController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(
    private alertCtrl: AlertController,
    public modalController: ModalController,
  ) { }

  async presentWarnAlert(msg:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      subHeader: 'Warning ⚠️',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentDangerAlert(msg:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      
      subHeader: 'Danger ❌',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }

}