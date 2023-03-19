import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BreakdownPageRoutingModule } from './breakdown-routing.module';

import { BreakdownPage } from './breakdown.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BreakdownPageRoutingModule
  ],
  declarations: [BreakdownPage]
})
export class BreakdownPageModule {}
