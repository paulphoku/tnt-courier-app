import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpConfirmPage } from './otp-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: OtpConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpConfirmPageRoutingModule {}
