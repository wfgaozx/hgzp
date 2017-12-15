import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  homeArticles = [];
  
  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items,
    private http: Http) {
      this.getNews();
     }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  getNews() {
    let url = 'http://192.168.50.80:81/drupal/bookapi' ;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let param = '';
    this.http.get(url, options).map(res => res.json())
    .subscribe(data => {
      console.log(data);
      for (var i = 0; i < data.length ; i++) {
        let newstitle = data[i].title[0].value;
        this.homeArticles.push({
          title: newstitle,//标题
        });

      }
    });
  }  

}
