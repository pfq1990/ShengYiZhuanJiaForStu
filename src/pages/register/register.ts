import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, NavController, NavParams} from 'ionic-angular';
import {AuthenticationCodeProvider} from "../../providers/authentication-code/authentication-code";
import {ValidationUtilsProvider} from "../../providers/validation-utils/validation-utils";
import {HomePage} from "../home/home";
import {LocalStorageProvider} from "../../providers/local-storage/local-storage";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  register = {
    phone : '',
    email : '',
    shopName : '',
    password : '',
    confirmPassword : '',
    code : ''
  };

  private timerText:string='发送验证码';
  private timeStart:number=60;
  private isSend:boolean=false;

  @ViewChild('registerSlides') registerSlides:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private authenticationCodeService:AuthenticationCodeProvider,private validationUtil:ValidationUtilsProvider,private localStorage:LocalStorageProvider,private events:Events) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.registerSlides.lockSwipes(true);
  }

  login(){
    let m:string='';
    let LoginConfig:any=this.localStorage.get('Login',{
      isLogin:'',
      time: '',
      username: ''
    });
    LoginConfig.isLogin=true;
    LoginConfig.time=Date.now()+5*24*60*60*1000;
    LoginConfig.username=this.register.phone;
    this.localStorage.set('Login',LoginConfig);
    m+='登录成功!';
    let userLoginData={
      shopname: '',
      phone: ''
    };
    userLoginData.shopname=this.register.shopName;
    userLoginData.phone=this.register.phone;
    this.events.publish('userLoginData:created', userLoginData);
    this.navCtrl.setRoot(HomePage);
  }


  send(){
    let t='验证码';
    let st='您的验证码是'+this.authenticationCodeService.createCode(4)+'，在一分钟内有效。';
    this.showAlert(t,st);
    console.log(st);
    this.isSend=true;
    this.timerTracker();
  }

  validateCode(){
    if(this.authenticationCodeService.validate(this.register.code)){
      this.next();
    }else {
      let t='错误提示';
      let st='短信验证码不正确或者已过期';
      this.showAlert(t,st);
      console.log(st);
    }
  }

  toValidate(){
    let t='友情提示';
    let st='';
    if(this.register.phone!=''){
      if(this.validationUtil.TelValidator(this.register.phone)){
        this.send();
        this.next();
      }else {
        st+=this.register.phone+'不是合法手机号吗!';
        this.showAlert(t,st);
      }
    }else {
      st+='请输入手机号码!';
      this.showAlert(t,st);
    }
  }

  toSuccess(){
    let t='错误提示';
    let st='';
    if(this.register.shopName==""){
      st+='店铺名称不能为空!! ';
    }else if(this.register.email==""){
      st+='邮箱不能为空!! ';
    }else if(this.register.password==""){
      st+='密码不能为空!! ';
    }else if(this.register.confirmPassword==""){
      st+='确认密码不能为空!! ';
    }else if(this.register.password!=this.register.confirmPassword){
      st+='确认密码不正确，请重新输入!! ';
    } else{
      if(this.validationUtil.EmailValidator(this.register.email)){
        let userInfo=this.localStorage.get('UserInfo',{
          phone : '',
          email : '',
          shopName : '',
          nameShort :'',
          password : '',
          userName :'李四',
          shopTel :'0000',
          registionDate:''
        });
        userInfo.phone=this.register.phone;
        userInfo.email=this.register.email;
        userInfo.shopName=this.register.shopName;
        userInfo.password=this.register.password;
        userInfo.registionDate=Date.now();
        //this.localStorage.set('UserInfo',userInfo);
        this.localStorage.set(userInfo.phone,userInfo);
        this.localStorage.set(userInfo.email,userInfo);
        t='友情提示';
        st='恭喜您，注册成功！!';
        this.next();
      }else {
        st+='邮箱格式不正确!! ';
      }
    }
    this.showAlert(t,st);
  }

  private next(){
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slideNext();
    this.registerSlides.lockSwipes(true);
  }
  private previous(){
    this.registerSlides.lockSwipes(false);
    this.registerSlides.slidePrev();
    this.registerSlides.lockSwipes(true);
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
