import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmLocPage } from './confirm-loc.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmLocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmLocPageRoutingModule {}
