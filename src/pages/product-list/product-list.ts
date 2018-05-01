import { Component } from '@angular/core';
import {Events, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ProductProvider} from "../../providers/product/product";
import {CategoryListPage} from "../category-list/category-list";
import {AddProductPage} from "../add-product/add-product";
import {Product} from "../../common/Product";
import {CategoryProvider} from "../../providers/category/category";
import {ProductViewPage} from "../product-view/product-view";

/**
 * Generated class for the ProductListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-list',
  templateUrl: 'product-list.html',
})
export class ProductListPage {

  categoryListPage:any=CategoryListPage;
  addProductPage:any=AddProductPage;
  productViewPage:any=ProductViewPage;

  activeProduct:Product=new Product();

  pageIndex=1;
  products=[];
  loader:Loading;
  name;
  sumPrice=0;
  subscription:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private productService:ProductProvider,private loadingCtrl:LoadingController,private categoryService:CategoryProvider,private events:Events) {
    this.subscription=this.categoryService.getCategorySubject().subscribe((data)=>{
      console.log(data['id']);
      this.productService.getByCategoryId(data['id']).then((value)=>{
        this.products=value;
        console.log(value);
      },(err)=>{

      });
    },(error)=>{

    },()=>{

    });

    this.events.subscribe('products:created',(data)=>{
      this.products=data;
      if(this.products){
        this.selectProduct(this.products[0]);
      }else {
        this.unSleectProduct();
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductListPage');
    this.load();
  }

  ionViewWillUnload(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  private presentLoading(){
    this.pageIndex=1;
    this.loader=this.loadingCtrl.create({
      spinner:'bubbles',
      content:'正在加载数据，请稍后......'
    });
    this.loader.present();
  }

  private load(){
    this.presentLoading();
    this.productService.get(this.pageIndex).then((data)=>{
      this.loader.dismiss();
      this.products=data;
      if(this.products){
        this.selectProduct(this.products[0]);
      }else {
        this.unSleectProduct();
      }
    },(err)=>{

    });
  }

  onInput(event){
    console.log(event);
    if(!event.target.value){
      return;
    }
    let value=event.target.value;
    if(!isNaN(Number(value))){
      this.productService.getByBarcode(value).then((data)=>{
        this.products=data;
        if(this.products){
          this.selectProduct(this.products[0]);
        }else {
          this.unSleectProduct();
        }
        console.log("searchbarBarCode");
      },(error)=>{

      });
    }else {
      this.productService.getByName(value).then((data)=>{
        this.products=data;
        console.log("searchbarName");
      },(error)=>{

      });
    }
    console.log(value);
  }

  doRefresh(event){
    this.pageIndex=1;
    this.productService.get(this.pageIndex).then((data)=>{
      this.products=data;
      if(this.products){
        this.selectProduct(this.products[0]);
      }else {
        this.unSleectProduct();
      }
      event.complete();
      console.log('refresh');
    },(error)=>{

    });
  }

  doInfinite(event){
    this.pageIndex++;
    if(this.pageIndex>this.productService.pageNumber){
      return;
    }
    this.productService.get(this.pageIndex).then((data)=>{
      this.products=data;
      if(this.products){
        this.selectProduct(this.products[0]);
      }else {
        this.unSleectProduct();
      }
      event.complete();
    },(error)=>{});
  }

  selectProduct(product){
    if(!product){
      this.unSleectProduct();
      return;
    }
    this.activeProduct=product;
    if(this.activeProduct.bid){
      this.sumPrice=this.activeProduct.bid*this.activeProduct.stock;
    }else {
      this.sumPrice=this.activeProduct.price*this.activeProduct.stock;
    }

  }

  unSleectProduct(){
    let product=new Product();
    product.stock=0;
    this.sumPrice=0;
    this.activeProduct=product;
  }

}
