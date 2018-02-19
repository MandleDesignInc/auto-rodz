import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FooterContent, GlobalService} from '../services/global.service';
import {MdlSlide} from './app-slider/mdl-slide';
import {Highlight} from './app-highlight/highlight';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HomeComponent implements OnInit {

  ready: boolean;

  slides: MdlSlide[];

  highlights: Highlight[];

  intro: string;
  quote: string; // TODO: change to string[]
  author: string; // TODO: move to object with quote

  constructor(private globalSvc: GlobalService) { }

  ngOnInit() {

    this.slides = this.mockSlides;

    this.highlights = this.mockHighlights;

    this.intro = 'We believe in a few simple things: fast cars, good parts, quality supplies. For years, Auto Rodz Performance & Machining has served the Quad Cities from our downtown Davenport location. Now, shop from our hand-picked selection of auto parts and supplies from the comfort of home! We have everything you need to perfect your ride.';

    this.quote = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing."';
    this.author = '- First Name Last Name';

    this.ready = true;

  }

  get mockSlides(): MdlSlide[] {

    let slide1 = new MdlSlide('0', 'OUR VISION', this.globalSvc.baseUrl + 'cms/assets/images/slider/slider-2.jpg');
    let slide2 = new MdlSlide('1', 'OUR BRANDS', this.globalSvc.baseUrl + 'cms/assets/images/slider/slider-1.jpg');

    let mockSlides: MdlSlide[] = [];
    mockSlides.push(slide1);
    mockSlides.push(slide2);

    return mockSlides;
  }

  get mockHighlights(): Highlight[] {

      let firstDesc = 'Learn more about the vision behind Auto Rodz, and how we’re making it come true';
      let secondDesc = 'Auto Rodz is committed to choosing brands you can trust for quality and performance.';
      let thirdDesc = 'Not sure what you need? No problem. Give us a call and we\'ll help you find the perfect part.';


      let first = new Highlight('ABOUT US', firstDesc, this.globalSvc.baseUrl + 'cms/assets/images/highlights/highlight-1.jpg', '/about');
      let second = new Highlight('OUR BRANDS', secondDesc, this.globalSvc.baseUrl + 'cms/assets/images/highlights/highlight-2.jpg', '/brands');
      let third = new Highlight('CONTACT US', thirdDesc, this.globalSvc.baseUrl + 'cms/assets/images/highlights/highlight-3.jpg', '/contact');


      let mockHighlights: Highlight[] = [];

      mockHighlights.push(first);
      mockHighlights.push(second);
      mockHighlights.push(third);

      return mockHighlights;
  }

  get footerContent(): FooterContent { return this.globalSvc.footerContent; }

  get baseUrl(): string {return this.globalSvc.baseUrl; }

}
