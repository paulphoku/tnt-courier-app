import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//services
import { GlobalService } from './services/global.service';
import { RequestService } from './services/request.service';
import { GeolocationService } from './services/geolocation.service';
import { AlertService } from './services/alert.service';
import { ToasterService } from './services/toaster.service';

//providers
import { MapStyles } from './providers/mapstyles';

//Directives
import { CardNumberDirective } from './directives/card.number.directive'

// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
// import { StatusBar } from '@ionic-native/status-bar';


@NgModule({
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],

  declarations: [
    AppComponent,

    //Directives
    CardNumberDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GlobalService,
    RequestService,
    GeolocationService,
    AlertService,
    ToasterService,
    MapStyles,

    //Native plugins
    Geolocation,
    // StatusBar,



  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
