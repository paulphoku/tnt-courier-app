import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Error500PageRoutingModule } from './error500-routing.module';

import { Error500Page } from './error500.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Error500PageRoutingModule
  ],
  declarations: [Error500Page]
})
export class Error500PageModule {}
