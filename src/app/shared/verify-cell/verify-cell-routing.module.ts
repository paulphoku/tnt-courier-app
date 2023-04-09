import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerifyCellPage } from './verify-cell.page';

const routes: Routes = [
  {
    path: '',
    component: VerifyCellPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerifyCellPageRoutingModule {}
