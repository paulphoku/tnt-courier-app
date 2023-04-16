import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestPage } from '../client/request/request.page';
import { ModalController } from '@ionic/angular';
import { RequestModel } from '../providers/request.model';

@Injectable({
    providedIn: 'root'
})

export class RequestService {
    vbp: any = 0;
    modal: Promise<HTMLIonModalElement>;

    constructor(
        private modalCtrl: ModalController,
        public zone: NgZone,
    ) {
        this.crq_modal_bp = new BehaviorSubject<Number>(0);
        this.isPinDroped = new BehaviorSubject<Boolean>(false);

        this.Request = new BehaviorSubject<RequestModel>({
            selectedInput: 'd',
            collection_addr: '',
            collection_lat: 0,
            collection_lng: 0,
            destination_addr: '',
            destination_lat: 0,
            destination_lng: 0,
            datecreated: '',
            photo_url: '',
            price: 0,
            reciever_name: '',
            reciever_number: '',
            request_status: '',
            polyline: '',
            request_notes: '',
            schedule_time: '',
            request_id:''
        })
    }

    /**
    * present_crq_modal
    */
    public async present_crq_modal() {
        this.modal = this.modalCtrl.create({
            component: RequestPage,
            initialBreakpoint: 0.4,
            breakpoints: [0.4, 0.75, .97],
            showBackdrop: false,
            backdropBreakpoint: .4,
            mode: 'ios',
            canDismiss: false
        });

        (await this.modal).addEventListener("ionBreakpointDidChange", async () => {

            this.zone.run(async () => {
                (await this.modal).getCurrentBreakpoint().then((v: any) => {
                    this.set_crq_modal_bp(v);
                });
            })

        });
        (await this.modal).present();
    }

    /**
     * reset_crq_modal
     */
    public async reset_crq_modal() {
        (await this.modal).setCurrentBreakpoint(.4);
    }

    /**
    * enlarge_crq_modal
    */
    public async enlarge_crq_modal() {
        (await this.modal).setCurrentBreakpoint(.97);
        this.set_isPinDroped(false);
    }

    /**
     * dismiss_crq_modal
     */
    public async dismiss_crq_modal() {
        (await this.modal).canDismiss = true;
        (await this.modal).dismiss();
    }

    /**
     * clear_request
     */
    public clear_request() {
        let r: RequestModel = {
            selectedInput: 'd',
            collection_addr: '',
            collection_lat: 0,
            collection_lng: 0,
            destination_addr: '',
            destination_lat: 0,
            destination_lng: 0,
            datecreated: '',
            photo_url: '',
            price: 0,
            reciever_name: '',
            reciever_number: '',
            request_status: '',
            schedule_time: '',
            polyline: '',
            request_notes: '',
            request_id:''
        }

        this.set_Request(r)
        this.reset_crq_modal();
    }

    public crq_modal_bp: BehaviorSubject<Number>;
    set_crq_modal_bp(newValue: any): void {
        this.crq_modal_bp.next(newValue);
    }
    get_crq_modal_bp(): Observable<Number> {
        return this.crq_modal_bp.asObservable();
    }

    public isPinDroped: BehaviorSubject<Boolean>;
    set_isPinDroped(newValue: any): void {
        this.isPinDroped.next(newValue);
    }
    get_isPinDroped(): Observable<Boolean> {
        return this.isPinDroped.asObservable();
    }

    public Request: BehaviorSubject<RequestModel>;
    set_Request(newValue: any): void {
        this.Request.next(newValue);
    }
    get_Request(): Observable<RequestModel> {
        return this.Request.asObservable();
    }
}
