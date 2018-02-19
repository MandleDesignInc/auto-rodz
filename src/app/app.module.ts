import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {HttpClientModule} from '@angular/common/http';

import {GlobalService} from './services/global.service';
import {PageService} from './services/page.service';
import {CartService} from './services/cart.service';
import {SearchService} from './services/search.service';
import {BrandService} from './services/brand.service';


import {MaterialModule} from './material/material.module';

import {AppBarModule} from './app-bar/app-bar.module';
import {HomeModule} from './home/home.module';
import {BrandsModule} from './brands/brands.module';
import {PageModule} from './page/page.module';
import {StoreModule} from './store/store.module';
import {DashboardModule} from './dashboard/dashboard.module';


import {AppComponent} from './app.component';


import {AppRoutingModule} from './app-routing.module';
import {CustomPipesModule} from './custom-pipes/custom-pipes.module';
import {OrderService} from './services/order.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomPipesModule.forRoot(),
    HomeModule,
    BrandsModule,
    PageModule,
    StoreModule,
    MaterialModule,
    AppBarModule,
    DashboardModule,
    AppRoutingModule
  ],
  providers: [GlobalService, PageService, CartService, SearchService, BrandService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
