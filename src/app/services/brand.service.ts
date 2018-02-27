import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrands(): Observable<Brand[]> {

    return this.http.get<Brand[]>('/api/brands').pipe(
      tap(brands => console.log('fetched ' + brands.length + ' brands'))
      // catchError(error => console.log(error))
    );

  }

}

export class Brand {
  hovered: boolean = false;
  name: string;
}
