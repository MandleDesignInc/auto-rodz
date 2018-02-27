import { Injectable } from '@angular/core';

export class HeaderContent {

    name: string;
    address: string;
    phone: string;

    constructor(name: string, address: string, phone: string) {
        this.name = name;
        this.address = address;
        this.phone = phone;
    }
}

export class FooterContent {
    navMenu: NavItem[];
    copyright: string;
    address: string;
    phone: string;

    phoneLink: string;

    constructor(navMenu: NavItem[], copyright: string, address: string, phone: string) {
        this.navMenu = navMenu;
        this.copyright = copyright;
        this.address = address;
        this.phone = phone;

        this.phoneLink = phone.replace(/[^0-9.]/g, '');
        console.log(this.phoneLink);
    }
}

export class NavItem {
    constructor(public routerLink: string, public title: string) { }
}

@Injectable()
export class GlobalService {

    // appBaseUrl: string = 'https://bluemandle2.com';

    baseUrl: string = 'https://autorodz.com/';

    isInit: boolean = false;

    headerContent: HeaderContent;

    footerContent: FooterContent;

    navMenu: NavItem[];

    constructor() { }

    init(): void {

        this.mockContent();

        this.isInit = true;

    }

    mockContent(): void {
        this.headerContent = new HeaderContent('Auto Rodz Performance And Machining LLC', '1029 W 4th St, Davenport, IA 52802', '(563) 324-0324');


        let footerNav: NavItem[] = [];
        footerNav.push(new NavItem('/terms', 'Terms of Use'));
        footerNav.push(new NavItem('/privacy', 'Privacy and Security'));
        footerNav.push(new NavItem('/faq', 'FAQs'));
        footerNav.push(new NavItem('/return-policy', 'Return Policy'));



        this.footerContent = new FooterContent(footerNav, 'Copyright 2017, All Rights Reserved. AutoRodz', '1029 W 4th St, Davenport, IA 52802', '(563) 324-0324');

        this.navMenu = [];
        this.navMenu.push(new NavItem('/home', 'Home'));
        this.navMenu.push(new NavItem('/about', 'About'));
        this.navMenu.push(new NavItem('/brands', 'Brands'));
        this.navMenu.push(new NavItem('/departments', 'Departments'));
        this.navMenu.push(new NavItem('/contact', 'Contact'));
    }


    getPageId(location: string): number {


        // TODO: mock data... need refactoring
        switch (location) {
            case '/terms': return 6;
            case '/privacy': return 7;
            case '/faq': return 8;
            case '/return-policy': return 9;
            case '/about': return 10;
            case '/brands': return 11;
            case '/departments': return 12;
            case '/contact': return 13;
            default: return 999;
        }


    }

}
