import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {CartService, Estimate, EstimateRequest, LineItem} from '../../services/cart.service';

import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {States} from './states';
import {OrderService, SalesTaxData} from '../../services/order.service';

@Component({
  selector: 'review-cart',
  templateUrl: './review-cart.component.html',
  styleUrls: ['./review-cart.component.css']
})
export class ReviewCartComponent implements OnInit {

  @Output() onCheckoutClick = new EventEmitter();
  @Output() onTaxData = new EventEmitter<SalesTaxData>();


  estimate: Estimate;

  taxLocationData: SalesTaxData;

  constructor(public cartService: CartService, private orderService: OrderService, public dialog: MatDialog) {
    this.estimate = new Estimate();

    this.cartService.onCartChange$.subscribe(() => {
      this.requestEstimate();
    });
  }

  ngOnInit() {
    this.requestEstimate();
  }

  requestEstimate(): void {
    let request: EstimateRequest = new EstimateRequest();
    request.cartId = this.cartService.cart.id;

    if (this.taxLocationData) {

      if (this.taxLocationData.city) {
        request.city = this.taxLocationData.city;
      }

      if (this.taxLocationData.state) {
        request.state = this.taxLocationData.state;
      }

    }

    this.cartService.getEstimate(request).subscribe(estimate => {
      this.estimate = estimate;
    });
  }

  updateCount(item: LineItem, change: number): void {

    if ((item.apiCount + change) > 0) {
      item.apiCount = item.apiCount + change;
      this.cartService.pushCountChange(item.product.id, item.apiCount);
    } else {
      this.cartService.removeFromCart(item.product.id);
    }

  }

  showDialog(): void {

    let dialog = this.dialog.open(ReviewCartDialogComponent, {width: '250px'});

    dialog.afterClosed().subscribe((salesTaxLocationData: SalesTaxData) => {

      let firstLetterCapital: string = salesTaxLocationData.city.toLowerCase().charAt(0).toUpperCase();

      salesTaxLocationData.city = firstLetterCapital + salesTaxLocationData.city.slice(1).toLowerCase();

      this.orderService.getSalesTaxData(salesTaxLocationData).subscribe(taxLocationData => {

        this.taxLocationData = taxLocationData;
        this.requestEstimate();
      });

    });
  }


  checkout(): void {
    this.onCheckoutClick.emit();
  }

}

@Component({
  template: `
    <mat-dialog-content>

      <mat-form-field>

        <mat-select [(ngModel)]="taxLocationData.state" placeholder="YOUR STATE">
          <mat-option *ngFor="let state of states.list" [value]="state">
            {{state}}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field>
        <input matInput [(ngModel)]="taxLocationData.city" placeholder="YOUR CITY">
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="taxLocationData">OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    'button { width: 100%; background: #1b3f6a; color: white;} mat-form-field {width: 100%;}'
  ]
})
export class ReviewCartDialogComponent {

  taxLocationData: SalesTaxData;

  states: States;

  constructor(public dialogRef: MatDialogRef<ReviewCartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.taxLocationData = new SalesTaxData();
    this.states = new States;
  }


}
