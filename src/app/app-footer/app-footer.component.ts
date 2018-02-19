import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FooterContent} from '../services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppFooterComponent implements OnInit {

  @Input() content: FooterContent;

  constructor() { }

  ngOnInit() {
  }


}
