import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OtpModel } from '../../providers/otp.modal';
import { GlobalService } from '../../services/global.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})

export class OtpPage implements OnInit {
  otpForm: FormGroup;
  isSubmitted: boolean = false;
  Otp: OtpModel = this.global.Otp.value;
  @Input('prev_url') prev_url: any;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private api: ApiService,
    private loadCtrl: LoadingController,
    private global: GlobalService,
    private alert: AlertService,
    public activatedRoute: ActivatedRoute,

  ) {
    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(5),]]
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.prev_url = res['prev_url'];
    });

    this.global.get_Otp().subscribe(val => {
      this.Otp = val;
    })
  }

  /**
   * submit
   */
  public async submit() {
    let otp = Number(this.otpForm.get('otp').value);
    this.isSubmitted = true;

    if (this.errorControl['otp'].errors) {
      return;
    }

    //verify otp
    if (otp === this.Otp.otp) {
      switch (this.prev_url) {
        case 'signin':
          this.navCtrl.navigateRoot('client');
          break;
        case 'signup':
          this.navCtrl.navigateRoot('signup');
          break;
        default:
          break;
      }
    } else {
      const alert = await this.alert.presentWarnAlert('One Time pin is invalid');
    }
  }


  async do_send_sms() {
    const loading = await this.loadCtrl.create({
      message: 'Please wait !'
    })

    let msg = `TnT Courier OTP ${this.Otp.otp}`;
    loading.present();
    this.api.get_otp_sms(this.Otp.tel, msg).subscribe(async res => {
      console.log(res);
      loading.dismiss();
      this.global.set_Otp(this.Otp)
    })
  }

  /**
  * navback
  */
  public navback() {
    this.navCtrl.pop();
    console.log('back to the future!')
  }

  //generate a randon number
  public generateNumber() {
    let n = Math.floor(Math.random() * 9) + 1;
    console.log('random number', n);
    return n;
  }

  //generate One Time Pin
  public generateOTP() {
    let c = 0;
    let otp = '';
    while (c < 5) {
      otp += String(this.generateNumber())[0];
      c++;
    }
    console.log(otp);
    return Number(otp);
  }

  get errorControl() {
    return this.otpForm.controls;
  }

}
