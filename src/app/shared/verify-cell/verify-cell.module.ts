import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyCellPageRoutingModule } from './verify-cell-routing.module';

import { VerifyCellPage } from './verify-cell.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerifyCellPageRoutingModule
  ],
  declarations: [VerifyCellPage]
})
export class VerifyCellPageModule {}
