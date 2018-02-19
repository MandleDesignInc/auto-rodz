import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

import 'rxjs/add/operator/switchMap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material';
import {Billing, CheckoutData, Shipping} from '../../services/order.service';
import {States} from '../review-cart/states';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  @ViewChild('shipToBilling') shipToBillingToggle: MatSlideToggle;

  states: States;

  shipToBilling: boolean = true;

  // set to true to display diagnostic data on screen
  devMode: boolean = false;

  billingData: Billing = new Billing();
  shippingData: Shipping = new Shipping();


  billingForm: FormGroup;
  shippingForm: FormGroup;


  constructor(private formBuilder: FormBuilder) {

    this.states = new States();

    // shipping form
    this.shippingForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });


    // watch shipping form and pass changes to data object
    this.shippingForm.get('firstName').valueChanges.forEach((value: string) => this.shippingData.firstName = value);
    this.shippingForm.get('lastName').valueChanges.forEach((value: string) => this.shippingData.lastName = value);
    this.shippingForm.get('address').valueChanges.forEach((value: string) => this.shippingData.address = value);
    this.shippingForm.get('city').valueChanges.forEach((value: string) => this.shippingData.city = value);
    this.shippingForm.get('state').valueChanges.forEach((value: string) => this.shippingData.state = value);
    this.shippingForm.get('zip').valueChanges.forEach((value: string) => this.shippingData.zip = value);

    if (this.shipToBilling) this.shippingForm.disable();


    // billing form
    this.billingForm = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });


    // watch billing form and pass changes to data object
    // if shipToBilling is true, changes are passed to shipping form
    this.billingForm.get('firstName').valueChanges.forEach((value: string) => {
      this.billingData.firstName = value;
      if (this.shipToBilling) this.shippingForm.get('firstName').setValue(value);
    });
    this.billingForm.get('lastName').valueChanges.forEach((value: string) => {
      this.billingData.lastName = value;
      if (this.shipToBilling) this.shippingForm.get('lastName').setValue(value);
    });
    this.billingForm.get('address').valueChanges.forEach((value: string) => {
      this.billingData.address = value;
      if (this.shipToBilling) this.shippingForm.get('address').setValue(value);
    });
    this.billingForm.get('city').valueChanges.forEach((value: string) => {
      this.billingData.city = value;
      if (this.shipToBilling) this.shippingForm.get('city').setValue(value);
    });
    this.billingForm.get('state').valueChanges.forEach((value: string) => {
      this.billingData.state = value;
      if (this.shipToBilling) this.shippingForm.get('state').setValue(value);
    });
    this.billingForm.get('zip').valueChanges.forEach((value: string) => {
      this.billingData.zip = value;
      if (this.shipToBilling) this.shippingForm.get('zip').setValue(value);
    });
    this.billingForm.get('phone').valueChanges.forEach((value: string) => this.billingData.phone = value);
    this.billingForm.get('email').valueChanges.forEach((value: string) => this.billingData.email = value);


  }

  onToggleChange(event: MatSlideToggleChange): void {

    console.log('checked:  ' + event.checked);

    this.shipToBilling = event.checked;

    if (this.shipToBilling) {

      this.shippingForm.reset({
        firstName: this.billingData.firstName,
        lastName: this.billingData.lastName,
        address: this.billingData.address,
        city: this.billingData.city,
        state: this.billingData.state,
        zip: this.billingData.zip
      });

      this.shippingForm.disable();

    } else {

      this.shippingForm.reset({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      });

      this.shippingForm.enable();

      console.log('shipping: ' + this.shippingForm.valid);
    }

  }

  get dataValid(): boolean {

    if (this.shipToBilling) return this.billingForm.valid;

    return this.billingForm.valid && this.shippingForm.valid;

  }

}
