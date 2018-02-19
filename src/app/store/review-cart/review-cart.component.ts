import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Cart, CartService, ChangeCountParams, LineItem, Request} from '../../services/cart.service';
import {Product} from '../../services/product.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {States} from './states';

@Component({
  selector: 'review-cart',
  templateUrl: './review-cart.component.html',
  styleUrls: ['./review-cart.component.css']
})
export class ReviewCartComponent implements OnInit {

  @Output() onCheckoutClick = new EventEmitter();

  estTax: number = null;

  constructor(public cartService: CartService, public dialog: MatDialog) {}

  ngOnInit() {

  }

  get estShipping(): number {
    if (this.cartService.cart.subTotal < 100 && this.cartService.cart.lineItems.length > 0) {
      return 11;
    } else {
      return 0;
    }
  }

  get estTotal(): number {

    // TODO: need to move all est calculations to front end, final calc on back and check against quote
    return this.cartService.cart.subTotal + this.estTax + this.estShipping;
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

    dialog.afterClosed().subscribe(state => {

      console.log(state);

      this.estimateTaxAndShipping(state);
    });
  }

  estimateTaxAndShipping(state: string): void {

    if (state === 'Iowa') {
      this.estTax = this.cartService.cart.subTotal * 0.07;
    } else {
      this.estTax = 0;
    }

  }


  checkout(): void {
    this.onCheckoutClick.emit();
  }

}

@Component({
  template: `
    <mat-dialog-content>
      <mat-form-field>
        
        <mat-select [(ngModel)]="selectedState" placeholder="SELECT YOUR STATE">
          <mat-option *ngFor="let state of states.list" [value]="state">
            {{state}}
          </mat-option>
        </mat-select>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="selectedState">OK</button>
    </mat-dialog-actions>
  `,
  styles: [
    'button { width: 100%; background: #1b3f6a; color: white;} mat-form-field {width: 100%;}'
  ]
})
export class ReviewCartDialogComponent {

  selectedState: string;

  states: States;

  constructor(public dialogRef: MatDialogRef<ReviewCartDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.states = new States;
  }


}
