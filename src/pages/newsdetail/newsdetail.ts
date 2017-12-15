import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewsdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newsdetail',
  templateUrl: 'newsdetail.html',
})
export class NewsdetailPage {
  strHtml = 'aaaaaaa';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.strHtml = this.navParams.get('html');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsdetailPage');
  }

}
