import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class PageResponse {

  message: string;
  object: PageData;
  success: string;

}

export class PageData {

    id: number;
    type: string;
    contentType: string;
    pagetitle: string;
    longtitle: string;
    description: string;
    alias: string;
    link_attributes: string;
    published: boolean;
    pub_date: number;
    unpub_date: number;
    parent: number;
    isFolder: boolean;
    introtext: string;
    content: string;
    richtext: boolean;
    template: number;
    menuindex: number;
    searchable: boolean;
    cacheable: boolean;
    createdby: number;
    createdon: string;
    editedby: number;
    editedon: string;
    deleted: boolean;
    deletedby: number;
    publishedon: number;
    publishedby: number;
    menutitle: string;
    donthit: boolean;
    privateweb: boolean;
    privatemgr: boolean;
    content_dispo: boolean;
    hidemenu: boolean;
    class_key: string;
    context_key: string;
    content_type: number;
    uri: string;
    uri_override: number;
    hide_children_in_tree: number;
    show_in_tree: number;

}

export class Page {

    title: string;
    safeContent: SafeHtml;

    constructor() { }

    static fromPageData(data: PageData, sanitizer: DomSanitizer): Page {
      let page = new Page();
      page.title = data.pagetitle;
      page.safeContent = sanitizer.bypassSecurityTrustHtml(data.content);
      return page;
    }

}

@Injectable()
export class PageService {

    private baseUrl = 'https://bluemandle2.com/~autorodz/cms/rest/page';


    constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }



    getPage(id: number): Observable<Page> {

        let url = `${this.baseUrl}/${id}`;

        return this.http.get(url).map(response => response as PageResponse).map(data => Page.fromPageData(data.object, this.sanitizer));
    }



}
