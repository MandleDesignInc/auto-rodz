import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {StoreRoutingModule} from './store-routing.module';
import {AppFooterModule} from '../app-footer/app-footer.module';
import {MaterialModule} from '../material/material.module';
import {CheckoutComponent} from './checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartComponent} from './cart/cart.component';
import {ShippingComponent} from './shipping/shipping.component';
import {CustomPipesModule} from '../custom-pipes/custom-pipes.module';
import {ReviewCartComponent, ReviewCartDialogComponent} from './review-cart/review-cart.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    AppFooterModule,
    ReactiveFormsModule,
    MaterialModule,
    CustomPipesModule.forRoot(),
    StoreRoutingModule,
    FormsModule
  ],
  declarations: [
    ProductsComponent,
    CheckoutComponent,
    CartComponent,
    ShippingComponent,
    ReviewCartComponent,
    ReviewCartDialogComponent,
    PaymentComponent
  ],
  entryComponents: [ReviewCartDialogComponent]
})
export class StoreModule {
}
