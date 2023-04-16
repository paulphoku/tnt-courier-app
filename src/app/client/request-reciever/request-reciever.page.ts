import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestModel } from '../../providers/request.model';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-reciever',
  templateUrl: './request-reciever.page.html',
  styleUrls: ['./request-reciever.page.scss'],
})
export class RequestRecieverPage implements OnInit {

  recieverForm: FormGroup;
  Request: RequestModel;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private r_service: RequestService,
  ) { }

  ngOnInit() {
    this.recieverForm = this.fb.group({
      contact: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required,]],
      notes: ['', [Validators.required,]],
      schedule_time: [null, [Validators.required,]]
    });

    this.r_service.get_Request().subscribe(val => {
      this.Request = val;
    })
  }

  navBack() {
    this.navCtrl.pop();
  }

  /**
   * submit
   */
  public submit() {
    this.Request.schedule_time = this.recieverForm.get('schedule_time').value;
    this.Request.reciever_name = this.recieverForm.get('name').value;
    this.Request.reciever_number = this.recieverForm.get('contact').value;
    this.Request.request_notes = this.recieverForm.get('notes').value;

    this.r_service.set_Request(this.Request);
    console.log('Reciever', this.Request)
    this.navCtrl.navigateForward('confirm-loc')
  }
}
