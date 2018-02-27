import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Product} from './product.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {SalesTaxData} from './order.service';
import {elementDef} from '@angular/core/src/view';

export class Request {

  customerId: number;
  productId: number;
  count: number;
  countChange: number;
  cartId: number;

  estimateRequest: EstimateRequest;

  constructor() {}

}

export class ChangeCountParams {

  constructor(public product: Product, public change: number) {}
}

export class LineItem {
  error: string;

  constructor(public product: Product, public appCount: number, public apiCount: number) {}

  get lineTotal(): number {
    return +this.product.suggestedRetail * this.appCount;
  }

}

export class Estimate {
  taxData: SalesTaxData;

  subtotal: number = 0;
  shipping: number = 0;

  tax: number = null;
  taxCalculated: boolean = false;

  total: number = 0;

  static placeholder(subtotal: number): Estimate {

    let estimate: Estimate = new Estimate();

    estimate.subtotal = subtotal;

    if (subtotal < 100) {
      estimate.shipping = 11;
    }

    estimate.total = estimate.subtotal + estimate.shipping;

    return estimate;

  }
}

export class EstimateRequest {
  public cartId: number;
  public state: string;
  public city: string;
}

export class Cart {

  id: number;

  customerId: number;

  subtotal: number;

  productCount: number;

  lineItems: LineItem[];

  constructor() {
    this.lineItems = [];

  }

}




@Injectable()
export class CartService {
  private KEY_CART_ID: string = 'cartId';

  // All orders use guest id for now. Also defined in OrderService.Guest as a static variable. TODO: clean up duplication
  private GUEST_CUSTOMER_ID: number = 100;

  cart: Cart;

  private cartClosedSource = new Subject<number>();
  cartClosed$ = this.cartClosedSource.asObservable();

  // count changes TODO: merge cart functionality to a single observable stream
  countUpdates$: Observable<Cart>;
  private countUpdates = new Subject<Request>();

  private cartChange = new Subject();
  onCartChange$ = this.cartChange.asObservable();


  constructor(private http: HttpClient) {

    this.initCart();

    this.watchCountChanges();
  }

  initCart(): void {

    this.cart = new Cart();

    if (typeof (Storage) !== 'undefined') this.cart.id = +localStorage.getItem(this.KEY_CART_ID);

    if (this.cart.id) {
      this.getCart();
      console.log('Found existing cart id: ' + this.cart.id);
    } else {
      this.getNewCart();
    }

  }

  watchCountChanges(): void {

    this.countUpdates$ = this.countUpdates.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((request: Request) => this.updateItem(request))
    );

    this.countUpdates$.subscribe(cart => {
      this.setCart(cart);
      console.log('Fetched updated cart');
    });

  }

  pushCountChange(productId: number, updatedCount: number): void {

    let request: Request = new Request();
    request.customerId = this.cart.customerId;
    request.cartId = this.cart.id;
    request.productId = productId;
    request.count = updatedCount;

    console.log('Pushing count change: ' + request);

    this.countUpdates.next(request);
  }



  setCart(cart: Cart): void {
    this.cart = cart;
    this.cartChange.next();
  }

  getCart(): void {


    this.http.get<Cart>(`/api/cart/${this.cart.id}`).subscribe(cart => {
      this.setCart(cart);
      console.log('Retrieved cart with id: ' + this.cart.id);
    });



  }

  getNewCart(): void {

    let request: Request = new Request();
    request.customerId = this.GUEST_CUSTOMER_ID;

    this.http.put<Cart>('/api/cart/create', request).subscribe(cart => {

      this.setCart(cart);

      localStorage.setItem(this.KEY_CART_ID, this.cart.id.toString());
      console.log('New cart id: ' + this.cart.id);

    });
  }

  getEstimate(estimateRequest: EstimateRequest): Observable<Estimate> {

    let options = {
      headers: new HttpHeaders({'Content-Type' : 'application/json'})
    };

    return this.http.put<Estimate>('/api/cart/estimate', estimateRequest, options);

  }

  updateItem(request: Request): Observable<Cart> {

    return this.http.put<Cart>('/api/cart/update', request);


  }


  addToCart(product: Product, count: number = 1): void {

    let request: Request = new Request();
    request.productId = product.id;
    request.cartId = this.cart.id;
    request.count = count;

    this.http.put<Cart>('/api/cart/add', request).subscribe(cart => {
      this.setCart(cart);
      console.log('Added item ' + product.id + ' to cart ' + this.cart.id);
    });

  }

  removeFromCart(id: number): void {

    let request: Request = new Request();
    request.productId = id;
    request.cartId = this.cart.id;

    this.http.put<Cart>('/api/cart/remove', request).subscribe(cart => {
      this.setCart(cart);
    });

  }

  closeCart(): void {

    let request: Request = new Request();
    request.cartId = this.cart.id;

    this.http.put<Cart>('/api/cart/close', request).subscribe(cart => {

      this.setCart(cart);

      localStorage.removeItem(this.KEY_CART_ID);

      this.cartClosedSource.next(request.cartId);
    });

  }

  abandonCart(): void {

    let request: Request = new Request();
    request.cartId = this.cart.id;

    this.http.put('/api/cart/abandon', request).subscribe(response => console.log(response));
  }

  get count(): number {

    if (!this.cart || !this.cart.lineItems) return 0;

    let count: number = 0;

    this.cart.lineItems.forEach(item => {
      count = count + item.lineTotal;
    });

    return count;

  }


}
