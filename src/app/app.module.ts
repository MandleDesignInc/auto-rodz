import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http';


import {MaterialModule} from './material/material.module';
import {AppBarModule} from './app-bar/app-bar.module';
import {HomeModule} from './home/home.module';
import {PageModule} from './page/page.module';
import {StoreModule} from './store/store.module';

import { AppComponent } from './app.component';
import {GlobalService} from './global.service';
import {PageService} from './page/page.service';
import {StoreService} from './store/store.service';

import {AppRoutingModule} from './app-routing.module';




@NgModule({
  declarations: [
      AppComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      HomeModule,
      PageModule,
      StoreModule,
      MaterialModule,
      AppBarModule,
      AppRoutingModule
  ],
  providers: [GlobalService, PageService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
