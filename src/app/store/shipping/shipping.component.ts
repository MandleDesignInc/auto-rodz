import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-shipping',
    templateUrl: './shipping.component.html',
    styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

    shippingForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.shippingForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('^(\\(?[0-9]{3}\\)?)((\\s|\\-){1})?[0-9]{3}((\\s|\\-){1})?[0-9]{4}$')],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required]
        });
    }

}
