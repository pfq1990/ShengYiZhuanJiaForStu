import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";
import {Product} from "../../common/Product";
import {PRODUCTS} from "../../common/mock.products";
import {Events} from "ionic-angular";

/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const PAGE_SIZE=5;

@Injectable()
export class ProductProvider {

  pageNumber:number;

  constructor(/*public http: HttpClient*/private localStorageService:LocalStorageProvider,private  events:Events) {
    console.log('Hello ProductProvider Provider');
    this.pageNumber=this.getPageNumber();
  }

  get(index:number=1):Promise<any>{
    return new Promise((resolve, reject) => {
      if(!index){
        reject('页码不能为空！');
      }else if(index < 0){
        reject('页码不能小于0！');
      }
      setTimeout(()=>{
        let products=this.localStorageService.get('Product',PRODUCTS);
        if(index>this.pageNumber){
          index=this.pageNumber;
        }
        let result=products.slice((index-1)*PAGE_SIZE,index*PAGE_SIZE);
        resolve(result);
      },1000);
    });
  }

  getByName(name:string):Promise<any>{
    return new Promise((resolve, reject) => {
      if(!name){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.localStorageService.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].name.indexOf(name)>=0)result.push(products[i]);
        }
        resolve(result);
      },1000);
    });
  }

  getByBarcode(name:string):Promise<any>{
    return new Promise((resolve, reject) => {

      if(!name){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.localStorageService.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].barcode.indexOf(name)>=0)result.push(products[i]);
        }
        resolve(result);
      },1000);
    });
  }
  getByCategoryId(name:string):Promise<any>{
    return new Promise((resolve, reject) => {
      if(!name){
        resolve(this.get(1));
      }
      setTimeout(()=>{
        let products=this.localStorageService.get('Product',PRODUCTS);
        let result:Product[]=[];
        for(let i=0;i<products.length;i++){
          if (products[i].categoryId==Number(name))result.push(products[i]);
        }
        console.log('getByCategoryId'+result);
        resolve(result);
      },1000);
    });
  }

  add(product:any):Promise<any>{
    return new Promise((resolve, reject) => {
      if(!product){
        reject('添加失败！');
      }
      let products:Product[]=this.localStorageService.get('Product',PRODUCTS);
      if(products){
        product.id+=products[products.length-1].id;
      }else {
        products=[];
        product.id=1;
      }
      products.push(product);
      this.localStorageService.set('Product',products);
      this.events.publish('products:created',products);
      resolve(products);
    });

  }

  getPageNumber(){
    let products=this.localStorageService.get('Product',PRODUCTS);
    let rs=products.length/PAGE_SIZE;
    if(products.length-rs*PAGE_SIZE>0) return rs+1;
    else return rs;
  }

}
