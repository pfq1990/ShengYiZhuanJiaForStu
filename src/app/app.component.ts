import { Component, ViewChild } from '@angular/core';
import {Events, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {WelcomePage} from "../pages/welcome/welcome";
import {LocalStorageProvider} from "../providers/local-storage/local-storage";
import {SettingPage} from "../pages/setting/setting";
import {LoginPage} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

//  rootPage: any =HomePage;
  rootPage: any = WelcomePage;

  shopName:string='未登录';
  phone:string;

  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private localStorage:LocalStorageProvider,private events:Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: '开店论坛', component: HomePage, icon: 'chatbubbles' },
      { title: '手机橱窗', component: ListPage, icon: 'albums' },
      { title: '邀请有礼', component: ListPage, icon: 'person-add' },
      { title: '资金账户', component: ListPage, icon: 'briefcase' },
      { title: '反馈意见', component: ListPage, icon: 'create' },
      { title: '帮助中心', component: ListPage, icon: 'help-buoy' },
    ];

    let appConfig:any=this.localStorage.get('App',{
      isRun:false,
      version:'1.0.0'
    });

    let loginConfig:any=this.localStorage.get('Login',{});

    let userInfo:any=this.localStorage.get(loginConfig['username'],{});
    if(appConfig.isRun==false){
      if(userInfo['phone']==''||userInfo['email']==''){
        appConfig.isRun=false;
        this.localStorage.set('App',appConfig);
      }else {
        this.shopName=userInfo['shopName'];
        console.log(this.shopName);
        this.phone=userInfo['phone'];
        console.log(this.phone);
        appConfig.isRun=true;
        this.localStorage.set('App',appConfig);
      }
      this.rootPage=WelcomePage;
    }
    else {
      if(loginConfig['isLogin'] && loginConfig['time']>=Date.now()){
        this.shopName=userInfo['shopName'];
        console.log(this.shopName);
        this.phone=userInfo['phone'];
        console.log(this.phone);
        this.rootPage=HomePage;
      }else {
        this.rootPage=LoginPage;
      }

    }
    events.subscribe('userLoginData:created',(userLoginData,time)=>{
      this.phone=userLoginData.phone;
      this.shopName=userLoginData.shopname;
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toSetting(){
    this.nav.setRoot(SettingPage);
  }

}
