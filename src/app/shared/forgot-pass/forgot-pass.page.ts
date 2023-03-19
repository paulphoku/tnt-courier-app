import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.page.html',
  styleUrls: ['./forgot-pass.page.scss'],
})
export class ForgotPassPage implements OnInit {

  @Input('email') email: String;
  @Input('isLoggedin') isLoggedin: Boolean;
  reset_passForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,

  ) {
    this.reset_passForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
    if(this.email){
      this.reset_passForm.get('email').setValue(this.email)
    }
  }

  reset_pass() {

  }

  submit() {
    this.dismiss();
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
