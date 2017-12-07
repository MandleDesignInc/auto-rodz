import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Product, ProductResults, StoreService} from '../store.service';
import {FooterContent, GlobalService} from '../../global.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private storeSvc: StoreService, private globalSvc: GlobalService) { }

  ngOnInit() {

    this.storeSvc.getProducts().subscribe(results => this.products = results.results);

  }

  get footerContent(): FooterContent { return this.globalSvc.footerContent; }

  get baseUrl(): string { return this.globalSvc.baseUrl; }
}
