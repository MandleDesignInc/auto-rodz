import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProductsComponent} from './products/products.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'products', component: ProductsComponent}
    ])
  ],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
