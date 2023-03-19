import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FareBreakdownPage } from './fare-breakdown.page';

const routes: Routes = [
  {
    path: '',
    component: FareBreakdownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FareBreakdownPageRoutingModule {}
