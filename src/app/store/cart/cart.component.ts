import {Component, EventEmitter, HostListener, OnInit, ViewChild} from '@angular/core';
import {FooterContent, GlobalService} from '../../services/global.service';
import {CartService, Estimate, EstimateRequest} from '../../services/cart.service';
import {Router} from '@angular/router';
import {MatHorizontalStepper} from '@angular/material';
import {
  AuthNetResizeParams, Billing, Order, OrderService, SalesTaxData, Shipping,
  TransactionResponse
} from '../../services/order.service';
import {CheckoutComponent} from '../checkout/checkout.component';
import {PaymentComponent} from '../payment/payment.component';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @ViewChild('stepper') stepper: MatHorizontalStepper;
  @ViewChild('checkoutComponent') checkoutComponent: CheckoutComponent;
  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;

  order: Order;

  loading: boolean = false;

  linear: boolean = true;
  editable: boolean = true;
  cartStep: boolean = true;
  checkoutStep: boolean = false;
  confirmStep: boolean = false;

  paymentSuccess: boolean = false;


  constructor(public cartService: CartService, private globalService: GlobalService, private orderService: OrderService, private router: Router) {


    this.cartService.cartClosed$.subscribe(id => this.onCartClosed(id));
  }

  ngOnInit() {

    this.stepper.selectionChange.subscribe((change: StepperSelectionEvent) => {
      console.log(change);
      if (change.selectedIndex === 2) this.onPaymentStep();
    });

  }

  onCheckoutClick(): void {
    this.stepper.next();
  }


  onHostedFormLoaded(loaded: boolean): void {
    if (loaded && this.loading) this.toggleLoading();
  }

  // called when order confirmed in payment component
  onPaymentComplete(order: Order): void {

    this.paymentSuccess = true;

  }

  onPaymentStep(): void {

    this.toggleLoading();

    // TODO: finish form validation

    // change completed steps to editable = false
    this.editable = false;

    this.order = new Order();
    // TODO: handle invalid cases

    this.order.billing = Billing.fromFormValues(this.checkoutComponent.billingForm.value);
    this.order.shipping = Shipping.fromFormValues(this.checkoutComponent.shippingForm.value);
    this.order.cart = this.cartService.cart;

    console.log(this.order);
    this.paymentComponent.init(this.order);

  }


  afterPayment(): void {

    this.paymentSuccess = true;

    this.orderService.addOrder(this.order).subscribe(order => {

      console.log('Final order: ' + order);

      this.order = order;

      // clear cart
      this.cartService.closeCart();
    });
  }

  toggleLoading(): void {
    this.loading = !this.loading;
  }

  get footerContent(): FooterContent {
    return this.globalService.footerContent;
  }

  onCartClosed(id: number): void {
    console.log('Closed cart id: ' + id);
    this.stepper.selectedIndex = 3;
  }


  @HostListener('window:transactResponse', ['$event'])
  onTransactResponse(event: any): void {

    this.order.transactionResponse = event.detail.response as TransactionResponse;

    console.log(JSON.stringify(this.order));

    this.afterPayment();

    /*
    setTimeout(() => {
      this.stepper.selectedIndex = 3;
    }, 0);
    */
  }



  @HostListener('window:cancel', ['$event'])
  onCancel(event: any): void {

    // TODO: put abandoned order in db
    // TODO: log message after saving to db

    this.router.navigateByUrl('/home');

  }
}
