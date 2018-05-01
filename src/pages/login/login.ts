import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ForgotPasswordPage} from "../forgot-password/forgot-password";
import {HomePage} from "../home/home";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username:string='';
  password:string='';


  gotoRegister(){
    this.navCtrl.push(RegisterPage);
  }

  toForgotPassword(){
    this.navCtrl.push(ForgotPasswordPage);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private toastCtrl:ToastController,private localStorage:LocalStorageProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  toLogin(){
    let m='';
    if(this.username==''){
      m+='用户名不能为空!';
    }else if(this.password=='') {
      m+='密码不能为空!';
    }else{
      if(this.authenticationLogin()){
        let loginConfig:any=this.localStorage.get('Login',{
          isLogin:'',
          time:'',
          username:''
        });
        loginConfig.isLogin=true;
        loginConfig.time=Date.now()+5*24*60*60*1000;
        loginConfig.username=this.username;
        this.localStorage.set('Login',loginConfig);
        m+='登录成功!';
        this.navCtrl.setRoot(HomePage);
      }else {
        m+='用户名和密码不正确!';
      }

    }
    this.showToast(m);
  }

  private  showToast(m:string){
    let toast=this.toastCtrl.create({
      message:m,
      duration:3000
    });
    toast.present();
  }

  private authenticationLogin():boolean{
    /*let userInfo=this.localStorage.get('UserInfo',{});
    if((this.username==userInfo['phone']||this.username==userInfo['email'])&&this.password==userInfo['password']){
      return true;
    }else {
      return false;
    }*/
    let userInfo=this.localStorage.get(this.username,{});
    if(this.password==userInfo['password']){
      return true;
    }else {
      return false;
    }
  }

}
