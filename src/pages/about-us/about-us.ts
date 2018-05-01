import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the AboutUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  version:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private localStorage:LocalStorageProvider) {
    let appConfig=this.localStorage.get('App',{});
    this.version=appConfig['version'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
