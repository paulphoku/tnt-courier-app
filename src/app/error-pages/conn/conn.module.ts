import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConnPageRoutingModule } from './conn-routing.module';

import { ConnPage } from './conn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConnPageRoutingModule
  ],
  declarations: [ConnPage]
})
export class ConnPageModule {}
