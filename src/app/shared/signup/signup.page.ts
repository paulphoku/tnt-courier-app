import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OtpModel } from '../../providers/otp.modal';
import { GlobalService } from '../../services/global.service';
import { AlertService } from '../../services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  isSubmitted: boolean = false;
  Otp: OtpModel = this.global.Otp.value;
  public day = moment().add(0, 'd').format().toString();


  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private api: ApiService,
    private loadCtrl: LoadingController,
    private global: GlobalService,
    private alert: AlertService,
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      names: ['', [Validators.required,]],
      surname: ['', [Validators.required,]],
      gender: ['', [Validators.required,]]
    });
  }

  ngOnInit() {
    this.global.get_Otp().subscribe(val => {
      this.Otp = val;
    })
  }


  /**
   * navBack
   */
  public navBack() {
    this.navCtrl.navigateBack('')
  }

  /**
   * submit
   */
  public async submit() {
    this.isSubmitted = true;

    if (this.signupForm.errors) return;

    let user_role = 'c';
    let address = null;
    let id_no = null;
    let contact = this.Otp.tel;
    let email = this.signupForm.get('email').value;
    let country = 'ZA';
    let state = null;
    let datecreated = this.day.substr(0, 10) + ' ' + this.day.substr(11, 8);
    let modifiedondatetime = this.day.substr(0, 10) + ' ' + this.day.substr(11, 8);
    let password = null;
    let salt = null;
    let gender = this.signupForm.get('gender').value;
    let names = this.signupForm.get('names').value;
    let surname = this.signupForm.get('surname').value;
    let photourl = null;
    let username = null;
    let dob = null;

    const loading = await this.loadCtrl.create({
      message: 'Please wait!'
    })

    await loading.present();
    try {
      this.api.add_user(user_role, address, id_no, contact, email, country, state, datecreated, modifiedondatetime, password, salt, gender, names, surname, photourl, username, dob).subscribe(res => {
        console.log(res);
        loading.dismiss();
        if (res.status == 0) {
          this.alert.presentWarnAlert('Email address already exists!');
        } else {
          this.navCtrl.navigateRoot('client');
        }
      })
    } catch (err) {
      loading.dismiss();
      this.alert.presentWarnAlert('Oops something went wrong ! 😥, please try again!')
    }
  }

  get errorControl() {
    return this.signupForm.controls;
  }
}
