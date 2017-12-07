import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {AppFooterModule} from '../app-footer/app-footer.module';
import { AppSliderComponent } from './app-slider/app-slider.component';
import { AppHighlightComponent } from './app-highlight/app-highlight.component';
import {MaterialModule} from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AppFooterModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, AppSliderComponent, AppHighlightComponent]
})
export class HomeModule { }
