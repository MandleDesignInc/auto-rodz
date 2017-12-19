import {Component, OnInit} from '@angular/core';
import {Cart, Product, StoreService} from '../store.service';
import {FooterContent, GlobalService} from '../../global.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

    constructor(private storeService: StoreService, private globalService: GlobalService) {
    }

    ngOnInit() {}

    removeItem(): void {
        // TODO
    }



    get cart(): Cart {
        return this.storeService.cart;
    }

    get footerContent(): FooterContent {
        return this.globalService.footerContent;
    }
}
