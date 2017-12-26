import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { NewsdetailPage } from '../newsdetail/newsdetail';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  homeArticles = [];
  //  currentItems: Item[];
  bodys = [];
  curpage: number = 0;          //当前页

  constructor(public navCtrl: NavController, public items: Items, public modalCtrl: ModalController,
    private http: Http) {
    //    this.currentItems = this.items.query();
    this.reloadNews();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /*
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }

  reloadNews() {
    this.homeArticles = [];
    this.curpage = 0;
    this.getNews();
  }

  getnextNews() {
    this.curpage += 1;
    this.getNews();
  }

  getNews() {
    let url = 'http://192.168.50.80:81/drupal/newsapi?page=' + this.curpage.toString();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let param = '';
    this.http.get(url, options).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          let newstitle = data[i].title[0].value;
          let strbody = data[i].body[0].value;
          this.homeArticles.push({
            title: newstitle,//标题
          });
          this.bodys.push({
            body: strbody,   //body
          });

        }
      });


    /*        let url = this.hostURL + "?type=" + itemName + "&key=" + this.APPKEY;
        this.http.get(url).map(res => res.json()).subscribe(data => {
          for (var i = 0; i < data.result.data.length - 24; i++) {
            this.homeArticles.push({
              title: data.result.data[i].title,//标题
              // picture1:data.result.data[i].thumbnail_pic_s,//图片1
              // picture2:data.result.data[i].text_ithumbnail_pic_s02mage1,//图片2
              picture3: data.result.data[i].thumbnail_pic_s03,//图片3
              author_name: data.result.data[i].author_name,
              date: data.result.data[i].date,
              url: data.result.data[i].url,//
            });
    
          }
          this.loading.dismiss();
        });
*/
  }

  /*
   getNewArticle(itemName) {
  
      let url = this.hostURL + "?type=" + itemName + "&key=" + this.APPKEY;
      this.http.get(url).map(res => res.json()).subscribe(data => {
  
        for (var i = data.result.data.length - 24; i < data.result.data.length; i++) {
          this.homeArticles.unshift({
            title: data.result.data[i].title,//标题
            // picture1:data.result.data[i].thumbnail_pic_s,//图片1
            // picture2:data.result.data[i].text_ithumbnail_pic_s02mage1,//图片2
            picture3: data.result.data[i].thumbnail_pic_s03,//图片3
            author_name: data.result.data[i].author_name,
            date: data.result.data[i].date,
            url: data.result.data[i].url
          });
  
        }
        this.loading.dismiss();
  
      });
    }
    */
  doRefresh(refresher) {
    setTimeout(() => {
      this.reloadNews();
      refresher.complete();
    }, 500);

  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      this.getnextNews();

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }


  showArticle(event, homeArticle, index) {
    let str = this.bodys[index].body;
    this.navCtrl.push(NewsdetailPage,
      {
        html: str
      });

  }
}
