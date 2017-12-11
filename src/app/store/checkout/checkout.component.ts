import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../store.service';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  partNum: string = 'Cart is empty';

  constructor(private storeSvc: StoreService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.partNum = this.route.snapshot.paramMap.get('part_number');
    console.log(this.partNum);
  }

}
