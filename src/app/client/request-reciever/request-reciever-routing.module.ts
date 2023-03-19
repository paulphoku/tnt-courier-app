import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestRecieverPage } from './request-reciever.page';

const routes: Routes = [
  {
    path: '',
    component: RequestRecieverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestRecieverPageRoutingModule {}
