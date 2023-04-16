import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, NavController } from '@ionic/angular';
import { GeolocationService } from './services/geolocation.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ConnectivityProvider } from './services/connectivity.service';
import { AlertService } from './services/alert.service';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  isOnline: boolean;
  constructor(
    private platform: Platform,
    private geo: GeolocationService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private screenOrientation: ScreenOrientation,
    private conn: ConnectivityProvider,
    private alert: AlertService,
    private navCtrl: NavController,
    private api: ApiService
  ) {
    this.initializeApp();
  }

  initializeApp() {


    this.platform.ready().then(() => {

      this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#F4D504');
      this.statusBar.styleDefault(); // set default style

      this.conn.appIsOnline$.subscribe(val => {
        this.isOnline = val;
      })

      if (this.isOnline) {
        try {
          this.api.shake_hands().subscribe(res => {
            console.log(res.data);
            this.splashScreen.hide();
            //navigate to root
            this.navCtrl.navigateRoot('home');
          }, (error => {
            // console.log(error);
            this.splashScreen.hide();
            this.navCtrl.navigateRoot('conn');
          }))
        } catch (error) {
          console.log('error1', error)
          this.splashScreen.hide();
          this.navCtrl.navigateRoot('conn');
        }
      } else {
        this.splashScreen.hide();
        this.navCtrl.navigateRoot('conn');
      }

      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.geo.start_forground_tracking();
    });
  }

}
