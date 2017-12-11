import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CheckoutComponent} from './checkout/checkout.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'products', component: ProductsComponent},
        {path: 'checkout', component: CheckoutComponent},
        {path: 'checkout/:part_number', component: CheckoutComponent}
    ])
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
