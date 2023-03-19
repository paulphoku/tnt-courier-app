import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ChangePassPage } from '../change-pass/change-pass.page';
import { AlertService } from '../../services/alert.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertService: AlertService,
    private toasterService:ToasterService
  ) { }

  ngOnInit() {
  }

  navBack() {
    this.navCtrl.pop();
  }

  /**
   * open_item
   */
  public async open_item(item: string) {
    switch (item) {
      case 'change-pass':

        let modal = await this.modalCtrl.create({
          component: ChangePassPage,
          breakpoints: [0, .35],
          initialBreakpoint: .4
        })

        modal.present();
        break;

      case 'change-cell':
        this.toasterService.warnToast('Feature not available yet!')
        break;

    }
  }

}
