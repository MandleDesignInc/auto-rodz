import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import {FooterContent, GlobalService} from '../services/global.service';
import {Page, PageService} from '../services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PageComponent implements OnInit {

  page: Page;

  constructor(private globalSvc: GlobalService, private pageSvc: PageService, private location: Location) { }

  ngOnInit() {

    let pageId = this.globalSvc.getPageId(this.location.path());

    this.pageSvc.getPage(pageId).subscribe(result => this.page = result);

  }

  get footerContent(): FooterContent { return this.globalSvc.footerContent; }

}
