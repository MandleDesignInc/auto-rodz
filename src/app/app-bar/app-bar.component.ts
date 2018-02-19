import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HeaderContent, NavItem} from '../services/global.service';
import {SearchService} from '../services/search.service';

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

  @ViewChild('searchBox') searchBox: any;



  constructor(private searchService: SearchService) { }

  ngOnInit() {}

  search(term: string): void {
    this.searchService.performSearch(term);
  }

}
