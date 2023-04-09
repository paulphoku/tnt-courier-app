import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from '@ionic/angular';
import { ConnectivityProvider } from '../../services/connectivity.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  isOnline: boolean;

  constructor(
    private platform: Platform,
    private conn: ConnectivityProvider
  ) { }

  ngOnInit() {
    this.conn.appIsOnline$.subscribe(isOnline => {
      this.isOnline = isOnline;
      console.log('isOnline', isOnline);
    })

    this.platform.ready().then(async () => {
      // Display content under transparent status bar (Android only)
      // StatusBar.overlaysWebView(true);
      // StatusBar.styleDefault();
    })
  }

  async ionViewWillEnter() {
    this.platform.ready().then(() => {
      // StatusBar.overlaysWebView(true);
      // StatusBar.styleDefault();
    })
  }

  async ionViewWillLeave() {

  }



}
