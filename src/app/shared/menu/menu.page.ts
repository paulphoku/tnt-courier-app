import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { GlobalService } from '../../services/global.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {
  rm: any;

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private global: GlobalService,
    private request: RequestService
  ) { }

  ngOnInit() {
    
  }



  /**
   * dismiss
   */
  public async dismiss() {
    this.modalCtrl.dismiss();
  }

  /**
   * nav_item
   */
  public async nav_item(menu_item: string) {
    // this.request.dismiss_crq_modal();
    this.dismiss();
    this.navCtrl.navigateForward(menu_item);
  }

}
