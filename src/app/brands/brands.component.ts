import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../services/global.service';
import {Brand, BrandService} from '../services/brand.service';
import {Observable} from 'rxjs/Observable';
import {SearchService} from '../services/search.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  brands$: Observable<Brand[]>;

  constructor(public globalService: GlobalService, public brandService: BrandService, private searchService: SearchService) { }

  ngOnInit() {
    this.brands$ = this.brandService.getBrands();
  }

  onBrandClicked(term: string): void {
    this.searchService.performSearch(term);
  }

}
