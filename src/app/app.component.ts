import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
// import { StatusBar } from '@awesome-cordova-plugins/status-bar';
import { Platform } from '@ionic/angular';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private geo: GeolocationService,

  ) {
    this.platform.ready().then(() => {
      this.geo.start_forground_tracking();

      // Display content under transparent status bar (Android only)
      StatusBar.overlaysWebView(true);
      StatusBar.styleDefault();
    })
  }

}
