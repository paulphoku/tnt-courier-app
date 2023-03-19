import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpConfirmPageRoutingModule } from './otp-confirm-routing.module';

import { OtpConfirmPage } from './otp-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpConfirmPageRoutingModule
  ],
  declarations: [OtpConfirmPage]
})
export class OtpConfirmPageModule {}
