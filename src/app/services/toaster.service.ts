import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class ToasterService {

    constructor(
        private toastController: ToastController,
    ) { }

    async successToast(msg: string) {
        const toast = await this.toastController.create({
          message: msg,
          header: 'Success',
          duration: 5000,
          position: 'middle',
          color: 'success',
          buttons: [
            {
              side: 'end',
              icon: 'checkmark-done-outline',
            }
          ]
        });
        toast.present();
      }
    
      async warnToast(msg: string) {
        const toast = await this.toastController.create({
          message: msg,
          header: 'Caution',
          duration: 3000,
          position: 'bottom',
          color: 'warning',
          buttons: [
            {
              side: 'end',
              icon: 'close',
            }
          ]
        });
        toast.present();
      }
    
      async errorToast(msg: string) {
        const toast = await this.toastController.create({
          message: msg,
          header: 'Error',
          duration: 5000,
          position: 'middle',
          color: 'danger',
          buttons: [
            {
              side: 'start',
              icon: 'close-outline',
            }
          ]
        });
        toast.present();
      }

      async toast(msg: string, title: string) {
        const toast = await this.toastController.create({
          message: msg,
          header: title,
          position: 'top',
          color: 'danger',
          buttons: [
            {
              side: 'start',
              icon: 'close-outline',
            }
          ]
        });
        toast.present();
      }
}