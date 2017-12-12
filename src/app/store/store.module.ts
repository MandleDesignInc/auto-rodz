import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {StoreRoutingModule} from './store-routing.module';
import {AppFooterModule} from '../app-footer/app-footer.module';
import {MaterialModule} from '../material/material.module';
import { CheckoutComponent } from './checkout/checkout.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
      CommonModule,
      AppFooterModule,
      ReactiveFormsModule,
      MaterialModule,
      StoreRoutingModule
  ],
  declarations: [ProductsComponent, CheckoutComponent]
})
export class StoreModule { }
