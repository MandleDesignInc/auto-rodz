import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

export class ProductResults {
    results: Product[] = [];
}

export class CheckoutData {

    public cardData: CardData;
    public shippingData: ShippingData;

    constructor() {
        this.shippingData = new ShippingData();
    }
}

export class CardData {
    public firstName: string;
    public lastName: string;
    public cardNumber: string;
    public expDate: string;
    public dataDescriptor: string;
    public dataValue: string;
}

export class ShippingData {
    public firstName: string = '';
    public lastName: string = '';
    public street: string = '';
    public city: string = '';
    public state: string = '';
    public zip: string = '';
    public email: string = '';
    public phone: string = '';
}

export class Product {
    id: number;
    partNumber: string;
    description: string;
    brand: string;
    suggestedRetail: number;
    cost: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantityAvailable: number;
    upc: number;
    jobber: number;
    aaiaCode: string;
    mapPrice: number;
    vendorMsrp: number;
    airRestricted: string;
    stateRestricted: string;
    truckFrtOnly: string;
    manufacturerPart: string;

}

@Injectable()
export class StoreService {

    cart: Product[] = [];

    constructor(private http: HttpClient) { }

    private productsUrl = 'http://bluemandle2.com/~autorodz/cms/rest/products';

    addToCart(product: Product): void {
        this.cart.push(product);
        console.log('cart contents: ' + this.cart.length);
    }

    getProducts(): Observable<ProductResults> {

        return this.http.get<ProductResults>(this.productsUrl);

        // return this.http.get(this.productsUrl).map(response => response as any[]).map(products => products as Product[]);
    }

    getProduct(id: number): Observable<Product> {
        let url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url); // TODO: error handling
    }

}
