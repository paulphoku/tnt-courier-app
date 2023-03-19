import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmOtpPageRoutingModule } from './confirm-otp-routing.module';

import { ConfirmOtpPage } from './confirm-otp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmOtpPageRoutingModule
  ],
  declarations: [ConfirmOtpPage]
})
export class ConfirmOtpPageModule {}
