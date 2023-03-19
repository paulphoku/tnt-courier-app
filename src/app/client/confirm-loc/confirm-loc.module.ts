import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmLocPageRoutingModule } from './confirm-loc-routing.module';

import { ConfirmLocPage } from './confirm-loc.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmLocPageRoutingModule
  ],
  declarations: [ConfirmLocPage]
})
export class ConfirmLocPageModule {}
