import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

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

export class Cart {
    products: Product[] = [];

    constructor() {}

    get empty(): boolean {
        return this.products.length < 1;
    }

    get subTotal(): number {
        let subTotal: number = 0;
        this.products.forEach(item => subTotal += item.suggestedRetail);
        return subTotal;
    }

    get shipping(): number {
        let shipping: number = this.subTotal * 0.1;
        return shipping;
    }

    get tax(): number {
        let tax: number = this.subTotal * 0.1;
        return tax;
    }

    get total(): number {
        return this.subTotal + this.shipping + this.tax;
    }


}

@Injectable()
export class StoreService {

    cart: Cart;

    constructor(private http: HttpClient) {
        this.cart = new Cart();
    }

    private productsUrl = 'http://bluemandle2.com/~autorodz/cms/rest/products';
    private testPostUrl = 'http://bluemandle2.com/~autorodz/cms/rest/charge';

    addToCart(product: Product): void {
        this.cart.products.push(product);
        console.log('cart contents: ' + this.cart.products.length);
    }

    /*
    getProducts(): Observable<ProductResults> {

        // this works!
        // return this.http.get<ProductResults>(this.productsUrl);


        return this.http.get<ProductResults>(this.productsUrl).pipe(
            tap(products => console.log('fetched ' + products.results.length + ' products')),
            // catchError(error => console.log(error))
        );

    }
    */

    getProducts(term: string): Observable<ProductResults> {

        if (!term.trim()) {
            // if not search term, return empty results object.
            return of(new ProductResults());
        }

        return this.http.get<ProductResults>(`http://bluemandle2.com/~autorodz/cms/rest/products/?query=${term}`).pipe(
            tap(products => console.log('fetched ' + products.results.length + ' products')),
            // catchError(error => console.log(error))
        );

    }

    getProduct(id: number): Observable<Product> {
        let url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url); // TODO: error handling
    }

    testPost(dataValue: string): Observable<any[]> {

        let headers = new HttpHeaders();

        let formData = new FormData();
        formData.set('dataValue', dataValue);

        return this.http.post<any[]>(this.testPostUrl, formData, {headers});

    }

}
