import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';
import {CartService} from './cart.service';
import {Product, ProductRequest} from './product.service';

export class SearchParams {

  constructor(public term: string, public offset: number) {}
}

export class SearchResults {

  foundRows: number;
  list: Product[] = [];
  error: string;

}

@Injectable()
export class SearchService {

  MAX_PAGE_COUNT = 25;

  inProgress: boolean = false;

  currentTerm: string;
  currentPage: number = 1;
  searchResults: SearchResults;

  public products$: Observable<SearchResults>; // product component needs to bind this observable
  private searchTerms = new Subject<SearchParams>();

  searchActivated = new Subject();
  searchActivated$ = this.searchActivated.asObservable();


  constructor(private cartService: CartService, private http: HttpClient) {

    // TODO: remove after refactoring subscription to component
    this.searchResults = new SearchResults();

    this.initSearch();
  }

  initSearch(): void {

    this.products$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((params: SearchParams) => this.searchApi(params))
    );

    this.products$.subscribe(searchResults => {

      this.searchResults = searchResults;

      this.inProgress = false;
    });

  }


  nextPage() {

    if (this.searchResults.list.length < 25) return;

    this.currentPage++;

    this.onSearchTerm(this.currentTerm, this.calculateOffset(this.currentPage));

  }

  previousPage() {

    if (this.currentPage < 2) return;

    this.currentPage--;

    this.onSearchTerm(this.currentTerm, this.calculateOffset(this.currentPage));

    console.log('Page: ' + this.currentPage + ' Offset: ' + this.calculateOffset(this.currentPage));
  }

  performSearch(term: string) {

    // This method performs a fresh search, reset currentPage to 1
    this.currentPage = 1;

    this.onSearchTerm(term);
  }

  onSearchTerm(term: string, offset: number = 0) {

    console.log('offset: ' + offset);

    this.inProgress = true;

    this.searchTerms.next(new SearchParams(term, offset));

    // notify AppComponent of search
    this.searchActivated.next();
  }




  searchApi(params: SearchParams): Observable<SearchResults> {

    this.currentTerm = params.term;
    console.log(this.currentTerm);

    if (!params.term.trim()) {
      // if not search term, return empty results object.
      return of(new SearchResults());
    }

    /*
    let url = `https://bluemandle2.com/api/product/list/${params.term}/${params.offset}`;
    return this.http.get<Product[]>(url).pipe(
      tap(products => console.log('fetched ' + products.length + ' products'))
    );
    */

    let request: ProductRequest = new ProductRequest();
    request.cartId = this.cartService.cart.id;
    request.offset = params.offset;
    request.query = params.term;


    // return this.http.put<Product[]>('https://bluemandle2.com/api/product/list', request);
    return this.http.put<SearchResults>('https://bluemandle2.com/api/product/list', request);
  }

  calculateOffset(pageNumber: number): number {
    return pageNumber * this.MAX_PAGE_COUNT - this.MAX_PAGE_COUNT;
  }


}
