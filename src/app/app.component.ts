import {Component, HostListener, OnInit} from '@angular/core';
import {GlobalService, HeaderContent, NavItem} from './global.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    toolbarIsFixed: boolean = false;

    constructor(private globalSvc: GlobalService, private router: Router) { }


    ngOnInit(): void {
        this.globalSvc.init();
    }

    onSearch(query: string): void {
        this.router.navigateByUrl(`/products/${query}`);
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

    get headerContent(): HeaderContent { return this.globalSvc.headerContent; }
    get navMenu(): NavItem[] { return this.globalSvc.navMenu; }
    get baseUrl(): string { return this.globalSvc.baseUrl; }

}
