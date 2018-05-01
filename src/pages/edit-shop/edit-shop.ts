import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the EditShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-shop',
  templateUrl: 'edit-shop.html',
})
export class EditShopPage {

  property:string;
  value:string;
  title:string;


  userInfo:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private localStorage:LocalStorageProvider,private toastCtrl:ToastController) {
    this.title=this.navParams.get('title');
    this.property=this.navParams.get('property');
    console.log(this.property);
    let loginConfig=this.localStorage.get('Login',{});
    this.userInfo=this.localStorage.get(loginConfig['username'],{});
    this.value=this.userInfo[this.property];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditShopPage');
  }


  save(){
    this.userInfo[this.property]=this.value;
    this.localStorage.set(this.userInfo['phone'],this.userInfo);
    this.localStorage.set(this.userInfo['email'],this.userInfo);
    let m='“'+this.title+'”已经修改为“'+this.value+'”!'
    this.showToast(m);
  }

  private  showToast(m:string){
    let toast=this.toastCtrl.create({
      message:m,
      duration:3000
    });
    toast.present();
  }

}
