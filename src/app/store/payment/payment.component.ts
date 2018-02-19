import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthNetResizeParams, Order, OrderService, TransactionResponse} from '../../services/order.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatCard} from '@angular/material';

@Component({
  selector: 'hosted-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  // Set true to add diagnostic options to screen
  devMode: boolean = false;

  @ViewChild('card') matCard: MatCard;

  isInit: boolean = false;

  frameWidth: number = 0;
  frameHeight: number = 0;

  order: Order;

  formLoaded: boolean = false;
  @Output() onFormLoaded = new EventEmitter<boolean>();

  confirmed: boolean = false;


  @ViewChild('accept') acceptFormElement: any;
  acceptFormGroup: FormGroup;

  constructor(private orderService: OrderService) {
    this.acceptFormGroup = new FormGroup({token: new FormControl()});
  }

  init(requestOrder: Order): void {

    // TODO: handle expired tokens

    // return if already init,
    if (this.isInit) return;

    // only init once
    this.isInit = true;

    this.order = requestOrder;

    console.log('Order: ' + JSON.stringify(requestOrder));


    this.orderService.getHostedFormToken(requestOrder).subscribe(order => {

      console.log('Token: ' + order.orderResponse.response.token);

      this.acceptFormGroup.setValue({token: order.orderResponse.response.token});
      this.acceptFormElement.nativeElement.submit();
    });

  }

  simulate(action: string) {

    let params = null;

    switch (action) {

      case 'resizeWindow':
        params = {action: 'resizeWindow', width: '500', height: '400'};

        break;

      case 'cancel':
        params = {action: 'cancel'};

        break;

      case 'transactResponse':
        params = {
          action: 'transactResponse',
          response: {
            accountNumber: 'XXXX1111',
            accountType: 'Visa',
            authorization: 'Y6WJRH',
            dateTime: '1/26/2018 6:16:54 AM',
            responseCode: '1',
            totalAmount: '58.50',
            transId: '60039126271'
          }
        };

        break;
    }

    let event: CustomEvent = new CustomEvent(action, {detail: params});
    window.dispatchEvent(event);
  }

  @HostListener('window:resizeWindow', ['$event'])
  onResizeWindow(event: any): void {

    if (!this.formLoaded) this.formLoaded = true;

    console.log(event);

    let params: AuthNetResizeParams = event.detail as AuthNetResizeParams;

    this.frameHeight = +params.height;
    this.frameWidth = +params.width;

    this.onFormLoaded.emit(true);

  }

}
