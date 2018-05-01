import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {HomePage} from "../home/home";
import {ShopPage} from "../shop/shop";
import {ChangePasswordPage} from "../change-password/change-password";
import {AboutUsPage} from "../about-us/about-us";

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  shopPage:any=ShopPage;
  chagePasswordPage:any=ChangePasswordPage;
  aboutUsPage:any=AboutUsPage;
  version:string;
  telNumber:string;
  private loginConfig:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private  localStorage:LocalStorageProvider) {
    let appConfig=this.localStorage.get('App',{});
    this.version=appConfig['version'];
    this.loginConfig=this.localStorage.get('Login',{});
    let userInfo:any=this.localStorage.get(this.loginConfig['username'],{});
    this.telNumber=userInfo['phone'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  call(phoneName:string){
    location.href='tel:'+phoneName;
  }

  logout(){
    this.loginConfig['isLogin']=false;
    this.localStorage.set('Login',this.loginConfig);
    this.navCtrl.setRoot(LoginPage);
  }

  toHome(){
    this.navCtrl.setRoot(HomePage);
  }

}
