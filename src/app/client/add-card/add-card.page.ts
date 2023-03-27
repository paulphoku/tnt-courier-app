import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as MaskData from 'maskdata';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  cardForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) {
    this.cardForm = this.fb.group({
      cvv: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {
    let card_num = this.cardForm.get('number');
    card_num.valueChanges.subscribe(v => {
      // card_num.setValue(this.get_card_mask(v))
    })
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  get_card_mask(cardNumber: any) {
    const maskCardOptions: MaskData.CardMaskOptions = {
      // Character to mask the data. The default value is '*'
      maskWith: "*",


      // Should be positive Integer
      // If the starting 'n' digits need to be visible/unmasked
      // Default value is 4
      unmaskedStartDigits: 4,

      // Should be positive Integer
      // If the ending 'n' digits need to be visible/unmasked
      // Default value is 1. 
      unmaskedEndDigits: 1
    };

    // return MaskData.maskCard(cardNumber, maskCardOptions);
    return cardNumber.toString().replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
  }
}
