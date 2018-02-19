import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FooterContent, GlobalService} from '../../services/global.service';
import {CartService} from '../../services/cart.service';
import {SearchService} from '../../services/search.service';
import {Product} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductsComponent implements OnInit, AfterViewInit {

  placeholderImagePath: string;

  constructor(public searchService: SearchService, private cartSvc: CartService, private globalSvc: GlobalService) {

    this.placeholderImagePath = this.globalSvc.baseUrl + 'assets/image-coming-soon.jpg';
  }


  ngOnInit() {}

  ngAfterViewInit() {}

  get pageCount(): number {
    return Math.ceil(this.searchService.searchResults.foundRows / this.searchService.MAX_PAGE_COUNT);
  }

  get footerContent(): FooterContent {
    return this.globalSvc.footerContent;
  }

  get baseUrl(): string {
    return this.globalSvc.baseUrl;
  }

  addToCart(product: Product): void {
    this.cartSvc.addToCart(product);
  }

}
