import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CardData, CheckoutData, Product, StoreService} from '../store.service';
import {FooterContent, GlobalService} from '../../global.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/switchMap';


@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

    checkoutData: CheckoutData;

    checkoutForm: FormGroup;

    orderReady: boolean = false;

    scripts: HTMLScriptElement[] = [];

    constructor(private storeSvc: StoreService, private route: ActivatedRoute, private globalSvc: GlobalService, private fb: FormBuilder) {
        console.log('Constructor called');
        this.checkoutData = new CheckoutData();
    }

    ngOnInit() {

        console.log('onInit() called');

        this.checkoutForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.email],
            phone: ['', Validators.pattern('^(\\(?[0-9]{3}\\)?)((\\s|\\-){1})?[0-9]{3}((\\s|\\-){1})?[0-9]{4}$')],
            street: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required]
        });

        // So far this works best TODO: simplify these
        this.startLoadingResponseScript().then(() => {
            console.log('Finished loading response script');
        });
        this.startLoadingScript().then(() => {
            console.log('Finished loading script');
        });

        /*
        this.storeSvc.getProduct(+this.route.snapshot.paramMap.get('part_number')).subscribe(results => {
            this.product = results['object'];
            console.log('got Product');

            // So far this works best TODO: simplify these
            this.startLoadingResponseScript().then(() => {
                console.log('Finished loading response script');
            });
            this.startLoadingScript().then(() => {
                console.log('Finished loading script');
            });
        });
        */

    }


    ngOnDestroy() {
        console.log('onDestroy called');

        this.scripts.forEach((script) => {
            document.getElementsByTagName('body')[0].removeChild(script);
        });
    }

    startLoadingResponseScript(): Promise<any> {
        return new Promise<any>(() => {
            console.log('Loading ResponseJS...');
            this.loadResponseJs();
        });
    }

    startLoadingScript(): Promise<any> {
        return new Promise<any>(() => {
            console.log('Loading AcceptJS...');
            this.loadAcceptJs();
        });
    }

    loadAcceptJs(): void {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://jstest.authorize.net/v3/AcceptUI.js';
        script.async = true;
        document.getElementsByTagName('body')[0].appendChild(script);
        this.scripts.push(script);
    }

    loadResponseJs(): void {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '/assets/payment-response.js';
        script.async = true;
        document.getElementsByTagName('body')[0].appendChild(script);
        this.scripts.push(script);
    }


    @HostListener('window:payment-response', ['$event'])
    onPaymentResponse(event: any): void {
        console.log(event.detail);

        let response = event.detail.response;

        let cardData = new CardData();
        cardData.firstName = response.customerInformation.firstName;
        cardData.lastName = response.customerInformation.lastName;
        cardData.cardNumber = response.encryptedCardData.cardNumber;
        cardData.expDate = response.encryptedCardData.expDate;
        cardData.dataDescriptor = response.opaqueData.dataDescriptor;
        cardData.dataValue = response.opaqueData.dataValue;

        this.checkoutData.cardData = cardData;

    }

    removeItem(): void {
        // TODO
    }
    sendOrder(): void {
        // TODO
    }

    get cart(): Product[] {
        return this.storeSvc.cart;
    }

    get baseUrl(): string {
        return this.globalSvc.baseUrl;
    }

    get footerContent(): FooterContent {
        return this.globalSvc.footerContent;
    }

}
