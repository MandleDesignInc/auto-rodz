import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalService, HeaderContent, NavItem} from './services/global.service';
import {Router} from '@angular/router';
import {SearchService} from './services/search.service';
import {CartService} from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  toolbarIsFixed: boolean = false;

  constructor(private globalSvc: GlobalService, private searchService: SearchService, public cartService: CartService, private router: Router) {

    this.searchService.searchActivated.subscribe(() => {
      if (this.router.url !== '/products') this.router.navigateByUrl('/products');
    });

    console.log(cartService.count);

  }

  ngOnInit(): void {
    this.globalSvc.init();

  }

  goToCart(): void {
    this.router.navigateByUrl('/cart');
  }

  @HostListener('window:scroll', [])
  onScroll(): void {

    let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (number > 211) {
      this.toolbarIsFixed = true;
    } else {
      this.toolbarIsFixed = false;
    }

  }

  get headerContent(): HeaderContent {
    return this.globalSvc.headerContent;
  }

  get navMenu(): NavItem[] {
    return this.globalSvc.navMenu;
  }

  get baseUrl(): string {
    return this.globalSvc.baseUrl;
  }

}
