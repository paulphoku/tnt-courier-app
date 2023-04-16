import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConnectivityProvider } from '../../services/connectivity.service';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-conn',
  templateUrl: './conn.page.html',
  styleUrls: ['./conn.page.scss'],
})
export class ConnPage implements OnInit {

  isOnline: boolean;
  isLoading: Boolean = false;

  constructor(
    private conn: ConnectivityProvider,
    private api: ApiService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.conn.appIsOnline$.subscribe(val => {
      this.isOnline = val;
    })
  }

  async retry() {
    this.isLoading = true;
    try {
      this.api.shake_hands().subscribe(res => {
        this.isLoading = false;
        console.log(res.msg);
        //navigate to root
        this.navCtrl.navigateRoot('home');
      }, (error => {
        this.isLoading = false;
      }))
    } catch (error) {
      this.isLoading = false;
    }
  }

}
