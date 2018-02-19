import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import {MaterialModule} from '../material/material.module';
import {BrandsRoutingModule} from './brands-routing.module';
import {AppFooterModule} from '../app-footer/app-footer.module';
import {CustomPipesModule} from '../custom-pipes/custom-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppFooterModule,
    BrandsRoutingModule,
    CustomPipesModule.forRoot()
  ],
  declarations: [BrandsComponent]
})
export class BrandsModule { }
