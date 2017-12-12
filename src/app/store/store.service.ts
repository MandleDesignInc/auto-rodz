import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

export class ProductResults {
  results: Product[] = [];
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

  constructor(private http: HttpClient) { }

  private productsUrl = 'http://bluemandle2.com/~autorodz/cms/rest/products';

  getProducts(): Observable<ProductResults> {

    return this.http.get<ProductResults>(this.productsUrl);

    // return this.http.get(this.productsUrl).map(response => response as any[]).map(products => products as Product[]);
  }

  getProduct(id: number): Observable<Product> {
      let url = `${this.productsUrl}/${id}`;
      return this.http.get<Product>(url); // TODO: error handling
  }

}
