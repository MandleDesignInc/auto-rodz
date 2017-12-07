import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Highlight} from './highlight';

@Component({
  selector: 'app-highlight',
  templateUrl: './app-highlight.component.html',
  styleUrls: ['./app-highlight.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppHighlightComponent implements OnInit {

  @Input() highlights: Highlight[];

  constructor() { }

  ngOnInit() {
  }

}
