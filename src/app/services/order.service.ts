import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Cart} from './cart.service';


// moved from StoreService

export class ShippingData {
  public firstName: string = '';
  public lastName: string = '';
  public address: string = '';
  public city: string = '';
  public state: string = '';
  public zip: string = '';
  public email: string = '';
  public phone: string = '';

  static fromFormValues(values: string[]): ShippingData {

    let data: ShippingData = new ShippingData();

    data.firstName = values['firstName'];
    data.lastName = values['lastName'];
    data.address = values['address'];
    data.city = values['city'];
    data.state = values['state'];
    data.zip = values['zip'];
    data.phone = values['phone'];
    data.email = values['email'];

    return data;
  }
}


export class CheckoutData {


  constructor() {}
}



export class AuthNetResizeParams {
  action: string;
  width: string;
  height: string;

}

export class AuthNetTransactParams {
  action: string;
  // response: AuthNetTransactResponse;
}

export class AuthNetTransactResponse {
  accountNumber: string;
  accountType: string;
  authorization: string;
  dateTime: string;
  responseCode: string;
  totalAmount: string;
  transId: string;
}
//////////////////////////////////////



// response models

export class AnetApiResponseMessage {
  code: string;
  text: string;
}

export class AnetApiResponseMessages {
  resultCode: string;
  message: AnetApiResponseMessage;
}

export class AnetApiResponse {
  messages: AnetApiResponseMessages;
  token: string;
}

export class TransactionResponse {
  accountNumber: string;
  accountType: string;
  authorization: string;
  dateTime: string;
  responseCode: string;
  totalAmount: string;
  transId: string;
}

export class OrderResponse {
  logs: string[];
  response: AnetApiResponse;
  expires: number;
}

export class Guest {
  public static ID = 100;
}

export class OrderStatus {
  public static STATUS_NEW: string = 'New';
  public static STATUS_SHIPPED: string = 'Shipped';
  public static STATUS_REFUNDED: string = 'Refunded';
  public static STATUS_VOIDED: string = 'Voided';
}

export class Order {

  id: number;
  customerId: number;

  status: string;

  orderResponse: OrderResponse;
  transactionResponse: TransactionResponse;

  logs: string[];

  cart: Cart;

  shipping: Shipping;
  billing: Billing;

  constructor() {

    this.id = 0;

    // All orders use guest id for now
    this.customerId = Guest.ID;

    this.status = OrderStatus.STATUS_NEW;

    this.logs = [];
  }
}


export class Shipping {
  public id: number;

  public firstName: string = '';
  public lastName: string = '';
  public address: string = '';
  public city: string = '';
  public state: string = '';
  public zip: string = '';

  static fromFormValues(values: string[]): Shipping {

    let data: Shipping = new Shipping();

    data.id = 0;
    data.firstName = values['firstName'];
    data.lastName = values['lastName'];
    data.address = values['address'];
    data.city = values['city'];
    data.state = values['state'];
    data.zip = values['zip'];

    return data;
  }
}

export class Billing {
  public id: number;

  public firstName: string = '';
  public lastName: string = '';
  public address: string = '';
  public city: string = '';
  public state: string = '';
  public zip: string = '';
  public email: string = '';
  public phone: string = '';

  static fromFormValues(values: string[]): Billing {

    let data: Billing = new Billing();

    data.id = 0;
    data.firstName = values['firstName'];
    data.lastName = values['lastName'];
    data.address = values['address'];
    data.city = values['city'];
    data.state = values['state'];
    data.zip = values['zip'];
    data.phone = values['phone'];
    data.email = values['email'];

    return data;
  }
}


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getHostedFormToken(order: Order): Observable<Order> {

    let options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    return this.http.post<Order>('https://bluemandle2.com/api/order/hosted-page', order, options);
  }

  addOrder(order: Order): Observable<Order> {

    let options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    return this.http.put<Order>('https://bluemandle2.com/api/order/add', order, options);

  }


}
