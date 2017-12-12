import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product, StoreService} from '../store.service';
import {GlobalService} from '../../global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  product: Product;

  paymentForm: FormGroup;


  constructor(private storeSvc: StoreService, private route: ActivatedRoute, private globalSvc: GlobalService, private fb: FormBuilder) { }

  ngOnInit() {

      this.paymentForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.email],
          phone: ['', Validators.pattern('^(\\(?[0-9]{3}\\)?)((\\s|\\-){1})?[0-9]{3}((\\s|\\-){1})?[0-9]{4}$')],
      });

    this.storeSvc.getProduct(+this.route.snapshot.paramMap.get('part_number')).subscribe(results => {
      this.product = results['object'];
      console.log(this.product.id);
    });
  }

    get baseUrl(): string { return this.globalSvc.baseUrl; }

}
