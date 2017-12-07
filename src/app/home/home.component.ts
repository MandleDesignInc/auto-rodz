import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FooterContent, GlobalService} from '../global.service';
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

    this.intro = 'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ' +
        'Intro text here about Auto Rodz. ';

    this.quote = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing."';
    this.author = '- First Name Last Name';

    this.ready = true;

  }

  get mockSlides(): MdlSlide[] {

    let slide1 = new MdlSlide('0', 'caption 1', this.globalSvc.baseUrl + 'cms/assets/images/slider-image.jpg');
    let slide2 = new MdlSlide('1', 'caption 2', this.globalSvc.baseUrl + 'cms/assets/images/highlight-2.jpg');

    let mockSlides: MdlSlide[] = [];
    mockSlides.push(slide1);
    mockSlides.push(slide2);

    return mockSlides;
  }

  get mockHighlights(): Highlight[] {

      let desc = 'Lorem ipsum foctor sinct et brute ella nor mae sic toto davenport what lorem ipsum';


      let first = new Highlight('HIGHLIGHT', desc, this.globalSvc.baseUrl + 'cms/assets/images/highlight-1.jpg', '/home');
      let second = new Highlight('HIGHLIGHT', desc, this.globalSvc.baseUrl + 'cms/assets/images/highlight-2.jpg', '/home');
      let third = new Highlight('HIGHLIGHT', desc, this.globalSvc.baseUrl + 'cms/assets/images/highlight-3.jpg', '/home');

      let mockHighlights: Highlight[] = [];

      mockHighlights.push(first);
      mockHighlights.push(second);
      mockHighlights.push(third);

      return mockHighlights;
  }

  get footerContent(): FooterContent { return this.globalSvc.footerContent; }

  get baseUrl(): string {return this.globalSvc.baseUrl;}

}
