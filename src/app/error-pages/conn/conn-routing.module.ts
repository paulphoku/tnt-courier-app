import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConnPage } from './conn.page';

const routes: Routes = [
  {
    path: '',
    component: ConnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnPageRoutingModule {}
