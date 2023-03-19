import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestRecieverPageRoutingModule } from './request-reciever-routing.module';

import { RequestRecieverPage } from './request-reciever.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestRecieverPageRoutingModule
  ],
  declarations: [RequestRecieverPage]
})
export class RequestRecieverPageModule {}
