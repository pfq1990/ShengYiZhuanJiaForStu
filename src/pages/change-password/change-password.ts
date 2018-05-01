import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  password:string;
  input:any={
    oldPassword : '',
    newPassword:'',
    confirmPassword:''
  };

  private userInfo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private localStorage:LocalStorageProvider,private toastCtrl:ToastController) {
    let loginConfing:any=this.localStorage.get('Login',{});
    this.userInfo=this.localStorage.get(loginConfing['username'],{});
    this.password=this.userInfo['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  save(){
    let m='';
    if(this.password!=this.input.oldPassword){
      m+='登录密码错误,请再次输入！';
    }else if(this.input.newPassword!=this.input.confirmPassword){
      m+='两次输入的新密码不一致，请重新是输入！';
    }else {
      this.userInfo['password']=this.input.newPassword;
      this.localStorage.set(this.userInfo['phone'],this.userInfo);
      this.localStorage.set(this.userInfo['email'],this.userInfo);
      m+='“密码”已经修改，请记住新密码!'
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

}
