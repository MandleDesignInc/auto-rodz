import { Injectable } from '@angular/core';


export class Product {
  id: number;
  partNumber: string;
  description: string;
  brand: string;
  suggestedRetail: string;
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

  inCart: boolean = false;


  constructor() {}

}


export class ProductRequest {
  query: string;
  cartId: number;
  offset: number;

}


@Injectable()
export class ProductService {

  constructor() { }

}
