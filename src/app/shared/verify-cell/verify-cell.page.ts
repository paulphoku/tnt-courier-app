import { Component, OnInit, Input } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { OtpModel } from '../../providers/otp.modal';
import { GlobalService } from '../../services/global.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-verify-cell',
  templateUrl: './verify-cell.page.html',
  styleUrls: ['./verify-cell.page.scss'],
})
export class VerifyCellPage implements OnInit {
  verifyForm: FormGroup;
  isSubmitted: boolean = false;
  Otp: OtpModel = this.global.Otp.value;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private api: ApiService,
    private loadCtrl: LoadingController,
    private global: GlobalService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    this.verifyForm = this.fb.group({
      tel: ['', [Validators.required, Validators.pattern(/0((60[3-9]|64[0-5]|66[0-5])\d{6}|(7[1-4689]|6[1-3]|8[1-4])\d{7})/g)]],
    });
  }

  /**
 * submit
 */
  public async submit() {
    this.isSubmitted = true;

    let tel = `+27${this.verifyForm.get('tel').value}`;
    let otp = this.generateOTP();

    if (this.errorControl['tel'].errors) {
      console.log({
        'ERR': this.errorControl['tel'].errors,
        tel: tel
      })
      return;
    }

    this.Otp.otp = otp;
    this.Otp.tel = tel;

    //check if number exits
    this.api.get_user(tel).subscribe(res => {
      if (res.data.length > 0) {
        this.alert.presentWarnAlert('This number is alredy registerd on the platform!')
      } else {
        //send otp
        this.do_send_sms();
      }
    })

  }

  //generate a randon number
  public generateNumber() {
    let n = Math.floor(Math.random() * 9) + 1;
    // console.log('random number', n);
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
    // console.log(otp);
    return Number(otp);
  }

  get errorControl() {
    return this.verifyForm.controls;
  }

  /**
   * navback
   */
  public navback() {
    this.navCtrl.pop();
    console.log('back to the future!')
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
      this.navCtrl.navigateForward('otp');
    })
  }

}