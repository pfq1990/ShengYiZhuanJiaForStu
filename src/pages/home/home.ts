import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {CategoryListPage} from "../category-list/category-list";
import {AddProductPage} from "../add-product/add-product";
import {ProductListPage} from "../product-list/product-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categoryListPage:any=CategoryListPage;
  addProductPage:any=AddProductPage;
  productListPage:any=ProductListPage;
  todayData:number;
  yesterdayData:number;
  thisWeekData:number;
  lastWeekData:number;
  thisMonthData:number;
  lastMonthData:number;
  constructor(public navCtrl: NavController,public navParams:NavParams) {
    let tmp:number;
    this.todayData=Math.random()*1000;
    tmp=Math.random()*1000;
    this.yesterdayData=this.todayData-tmp;
    this.thisWeekData=Math.random()*1000;
    tmp=Math.random()*1000;
    this.lastWeekData=this.thisWeekData-tmp;
    this.thisMonthData=Math.random()*1000;
    tmp=Math.random()*1000;
    this.lastMonthData=this.thisMonthData-tmp;
  }


}
