import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import {PageRoutingModule} from './page-routing.module';
import {MaterialModule} from '../material/material.module';
import {AppFooterModule} from '../app-footer/app-footer.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppFooterModule,
    PageRoutingModule
  ],
  declarations: [PageComponent]
})
export class PageModule { }
