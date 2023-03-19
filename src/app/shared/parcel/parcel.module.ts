import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParcelPageRoutingModule } from './parcel-routing.module';

import { ParcelPage } from './parcel.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParcelPageRoutingModule
  ],
  declarations: [ParcelPage]
})
export class ParcelPageModule { }
