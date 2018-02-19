import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {BrandsComponent} from './brands.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {path: 'brands', component: BrandsComponent}
    ])
  ],
  exports: [RouterModule]
})
export class BrandsRoutingModule { }
