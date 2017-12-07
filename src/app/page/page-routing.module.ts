import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {PageComponent} from './page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'about', component: PageComponent},
        {path: 'brands', component: PageComponent},
        {path: 'departments', component: PageComponent},
        {path: 'contact', component: PageComponent},
        {path: 'terms', component: PageComponent},
        {path: 'privacy', component: PageComponent},
        {path: 'faq', component: PageComponent},
        {path: 'return-policy', component: PageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class PageRoutingModule { }
