import {Injectable} from '@angular/core';
import {Product} from './store/store.service';

@Injectable()
export class CartService {

    cart: Product[] = [];

    constructor() { }

}
