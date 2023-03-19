import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FareBreakdownPageRoutingModule } from './fare-breakdown-routing.module';

import { FareBreakdownPage } from './fare-breakdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FareBreakdownPageRoutingModule
  ],
  declarations: [FareBreakdownPage]
})
export class FareBreakdownPageModule {}
