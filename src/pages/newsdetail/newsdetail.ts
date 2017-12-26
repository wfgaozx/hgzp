import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { DomSanitizer } from '@angular/platform-browser/src/security/dom_sanitization_service';
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

//  constructor(private sanitizer: DomSanitizer,public navCtrl: NavController, 
  constructor(public navCtrl: NavController, 
      public navParams: NavParams) {
    this.strHtml = this.navParams.get('html');
    this.strHtml = this.strHtml.replace(/\/drupal\/sites\/default\/files\/inline-images\//g, 
        'http://192.168.50.80:81/drupal/sites/default/files/inline-images/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsdetailPage');
//    history.replaceState({}, '', "http://192.168.50.80:81")
//    alert("aa");
//    window.location.href="http://192.168.50.80:81/drupal" 
//    this.strHtml.replace('/drupal/sites/default/files/inline-images', 
//        'http://92.168.50.80:81/drupal/sites/default/files/inline-images/')
}

/*
  assembleHTML(strHTML:any) {
    return this.sanitizer.bypassSecurityTrustHtml(strHTML);
  }
*/
//  sanitizeHtml = this.sanitizer.bypassSecurityTrustHtml(this.strHtml);

}
