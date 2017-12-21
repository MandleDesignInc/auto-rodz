import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Product, ProductResults, StoreService} from '../store.service';
import {FooterContent, GlobalService} from '../../global.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private storeSvc: StoreService, private globalSvc: GlobalService, private route: ActivatedRoute) { }

  ngOnInit() {

    let query = this.route.snapshot.paramMap.get('query');

    // TODO: only working with id for now...
    query = '1';

    this.storeSvc.getProducts(query).subscribe(results => this.products = results.results);
  }

  get footerContent(): FooterContent { return this.globalSvc.footerContent; }

  get baseUrl(): string { return this.globalSvc.baseUrl; }

  addToCart(product: Product): void { this.storeSvc.addToCart(product); }
}
