import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule} from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WelcomePage} from '../pages/welcome/welcome';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import {RegisterPage} from '../pages/register/register';
import {FormsModule} from "@angular/forms";
import {LoginPage} from "../pages/login/login";
import {CopyrightComponent} from "../components/copyright/copyright";
import {AuthenticationCodeProvider} from "../providers/authentication-code/authentication-code";
import {ForgotPasswordPage} from "../pages/forgot-password/forgot-password";
import { ValidationUtilsProvider } from '../providers/validation-utils/validation-utils';
import {SettingPage} from "../pages/setting/setting";
import {ShopPage} from "../pages/shop/shop";
import {EditShopPage} from "../pages/edit-shop/edit-shop";
import {ChangePasswordPage} from "../pages/change-password/change-password";
import {CategoryListPage} from "../pages/category-list/category-list";
import { CategoryProvider } from '../providers/category/category';
import {CategoryEditListPage} from "../pages/category-edit-list/category-edit-list";
import {EditCategoryPage} from "../pages/edit-category/edit-category";
import {EditCategoryNamePage} from "../pages/edit-category-name/edit-category-name";
import {AboutUsPage} from "../pages/about-us/about-us";
import { ProductProvider } from '../providers/product/product';
import {AddProductPage} from "../pages/add-product/add-product";
import {Camera} from "@ionic-native/camera";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {ImagePicker} from "@ionic-native/image-picker";
import {ProductListPage} from "../pages/product-list/product-list";
import {ProductViewPage} from "../pages/product-view/product-view";
import { AdminValidationProvider } from '../providers/admin-validation/admin-validation';
import {SMS} from "@ionic-native/sms";
import {Contacts} from "@ionic-native/contacts";
import {ShareMessagePage} from "../pages/share-message/share-message";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    CopyrightComponent,
    ForgotPasswordPage,
    SettingPage,
    ShopPage,
    EditShopPage,
    ChangePasswordPage,
    CategoryListPage,
    CategoryEditListPage,
    EditCategoryPage,
    EditCategoryNamePage,
    AboutUsPage,
    AddProductPage,
    ProductListPage,
    ProductViewPage,
    ShareMessagePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText:'返回',
      backButtonIcon: 'arrow-back'
    }),
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    WelcomePage,
    RegisterPage,
    LoginPage,
    ForgotPasswordPage,
    SettingPage,
    ShopPage,
    EditShopPage,
    ChangePasswordPage,
    CategoryListPage,
    CategoryEditListPage,
    EditCategoryPage,
    EditCategoryNamePage,
    AboutUsPage,
    AddProductPage,
    ProductListPage,
    ProductViewPage,
    ShareMessagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalStorageProvider,
    AuthenticationCodeProvider,
    ValidationUtilsProvider,
    CategoryProvider,
    ProductProvider,
    Camera,
    BarcodeScanner,
    ImagePicker,
    AdminValidationProvider,
    SMS,
    Contacts
  ]
})
export class AppModule {}
