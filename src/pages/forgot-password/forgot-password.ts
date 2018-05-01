import { Component , ViewChild } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ValidationUtilsProvider} from "../../providers/validation-utils/validation-utils";
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {



  forgotPassword={
    email : '',
    password : '',
    confirmPassword : '',
    code : ''
  };


  private userInfo:any;

  private timerText:string='发送验证码';
  private timeStart:number=60;
  private isSend:boolean=false;

  @ViewChild('forgotPasswrdSlides') forgotPasswrdSlides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private validationUtil:ValidationUtilsProvider,private alertCtrl:AlertController,private authenticationCodeService:AuthenticationCodeProvider,private localStorage:LocalStorageProvider) {
    this.userInfo=this.localStorage.get(this.forgotPassword.email,{});
  }

  ionViewDidLoad() {
    this.forgotPasswrdSlides.lockSwipes(true);
    console.log('ionViewDidLoad ForgotPasswordPage');
  }



  toValidate(){
    let t='友情提示';
    let st='';

    if(this.forgotPassword.email!=''){
      if(this.validationUtil.EmailValidator(this.forgotPassword.email)){
        if(this.userInfo){
          this.send();
          this.next();
        }else {
          console.log(this.forgotPassword.email);
          st+='不存在邮箱地址为'+this.forgotPassword.email+'的帐号!';
          this.showAlert(t,st);
        }
      }else {
        st+=this.forgotPassword.email+'不是合法邮箱地址吗!';
        this.showAlert(t,st);
      }
    }else {
      st+='请输入邮箱地址!';
      this.showAlert(t,st);
    }
  }

  validateCode(){
    if(this.authenticationCodeService.validate(this.forgotPassword.code)){
      this.next();
    }else {
      let t='错误提示';
      let st='验证码不正确或者已过期';
      this.showAlert(t,st);
      console.log(st);
    }
  }

  toSuccess(){
    let t='错误提示';
    let st='';
    if(this.forgotPassword.password==""){
      st+='密码不能为空!! ';
    }else if(this.forgotPassword.confirmPassword==""){
      st+='确认密码不能为空!! '
    }else {
      if(this.forgotPassword.password==this.forgotPassword.confirmPassword){
        t='友情提示';
        st='恭喜您，密码修改成功！!';

        this.userInfo['password']=this.forgotPassword.password;
//        this.userInfo.registionDate=Date.now();
        this.localStorage.set(this.userInfo['email'],this.userInfo);
        this.localStorage.set(this.userInfo['phone'],this.userInfo);

      }else {
        st+='确认密码和密码不一致!! ';
      }
    }
    this.showAlert(t,st);
  }

  send(){

    let t='验证码';
    let st='您的验证码是'+this.authenticationCodeService.createCode(4)+'，在一分钟内有效。';
    this.isSend=true;
    this.showAlert(t,st);
    console.log(st);
    this.timerTracker();

  }
  next(){
    this.forgotPasswrdSlides.lockSwipes(false);
    this.forgotPasswrdSlides.slideNext();
    this.forgotPasswrdSlides.lockSwipes(true);
  }
  previous(){
    this.forgotPasswrdSlides.lockSwipes(false);
    this.forgotPasswrdSlides.slidePrev();
    this.forgotPasswrdSlides.lockSwipes(true);
  }

  private showAlert(t:string,st:string){

    let alert=this.alertCtrl.create({
      title:t ,
      subTitle:st ,
      buttons:['关闭']
    });
    alert.present();
  }

  timerTracker(){
    setTimeout(()=>{
        if(this.timeStart>0){
          this.timeStart--;
          this.timerText=this.timeStart+"s后再发送";
          this.timerTracker();
        }else {
          this.timerText="重新发送";
          this.timeStart=60;
          this.isSend=false;
        }
      },1000
    );
  }

}
