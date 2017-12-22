import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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

    productResults: ProductResults;

    constructor(private storeSvc: StoreService, private globalSvc: GlobalService, private route: ActivatedRoute) {
    }

    ngOnInit() {

        let query = this.route.snapshot.paramMap.get('query');

        if (query !== null && query.length > 0) {

            this.storeSvc.searchProducts(query).subscribe(results => {
                console.log(results);
                this.productResults = results;
            });

        } else {

            this.storeSvc.getProducts();
        }


    }

    get footerContent(): FooterContent {
        return this.globalSvc.footerContent;
    }

    get baseUrl(): string {
        return this.globalSvc.baseUrl;
    }

    addToCart(product: Product): void {
        this.storeSvc.addToCart(product);
    }
}
