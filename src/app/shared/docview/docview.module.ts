import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocviewPageRoutingModule } from './docview-routing.module';

import { DocviewPage } from './docview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocviewPageRoutingModule
  ],
  declarations: [DocviewPage]
})
export class DocviewPageModule {}
