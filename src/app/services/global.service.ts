import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtpModel } from '../providers/otp.modal';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  modal: any = {
    request: 0
  }

  constructor() {
    this.modal_request = new BehaviorSubject<Object>('');
    this.modal_request_bp = new BehaviorSubject<Number>(0);
    this.Otp = new BehaviorSubject<OtpModel>({ otp: 0, tel: '' });
  }

  public Otp: BehaviorSubject<OtpModel>;
  set_Otp(newValue: OtpModel): void {
    this.Otp.next(newValue);
    this.modal.request = newValue;
  }
  get_Otp(): Observable<OtpModel> {
    return this.Otp.asObservable();
  }

  public modal_request: BehaviorSubject<object>;
  set_modal_request(newValue: any): void {
    this.modal_request.next(newValue);
    this.modal.request = newValue;
  }
  get_modal_request(): Observable<object> {
    return this.modal_request.asObservable();
  }

  public modal_request_bp: BehaviorSubject<Number>;
  set_modal_request_bp(newValue: any): void {
    this.modal_request_bp.next(newValue);
  }
  get_modal_request_bp(): Observable<Number> {
    return this.modal_request_bp.asObservable();
  }
}
