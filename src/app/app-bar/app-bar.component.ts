import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {HeaderContent, NavItem} from '../global.service';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppBarComponent implements OnInit {

  @Input() headerContent: HeaderContent;
  @Input() background: string;
  @Input() navMenu: NavItem[];
  @Input() toolbarIsFixed: boolean = false;

  @Output() onSearch = new EventEmitter<string>();


  constructor() { }

  ngOnInit() {

  }

  // TODO: temp search method
  search(): void {
    this.onSearch.emit('search');
  }

}
