import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";
import {EditShopPage} from "../edit-shop/edit-shop";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  shopName:string;
  nameShort:string;
  creatTime:string='';
  phone:string;
  userName:string;
  email:string;
  shopTel:string;
  editShop:any=EditShopPage;

  constructor(public navCtrl: NavController, public navParams: NavParams,private localStorage:LocalStorageProvider) {
    let loginConfig=this.localStorage.get('Login',{});
    let userInfo:any= this.localStorage.get(loginConfig['username'],{
      phone : '',
      email : '',
      shopName : '',
      nameShort :'',
      password : '',
      userName :'',
      shopTel :'',
      registionDate:''
    });
    this.phone=userInfo.phone;
    this.email=userInfo.email
    this.shopName=userInfo.shopName;
    this.nameShort=userInfo.nameShort;
    this.creatTime+=new Date(userInfo.registionDate).getUTCFullYear().toString()+'-';
    this.creatTime+=new Date(userInfo.registionDate).getUTCMonth().toString()+'-';
    this.creatTime+=new Date(userInfo.registionDate).getUTCDate().toString()+' ';
    this.creatTime+=new Date(userInfo.registionDate).getUTCHours().toString()+':';
    this.creatTime+=new Date(userInfo.registionDate).getUTCMinutes().toString()+':';
    this.creatTime+=new Date(userInfo.registionDate).getUTCSeconds().toString();
    this.userName=userInfo.userName;
    this.shopTel=userInfo.shopTel;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
