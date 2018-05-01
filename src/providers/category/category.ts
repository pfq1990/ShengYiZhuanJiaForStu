/*import { HttpClient } from '@angular/common/http';*/
import { Injectable } from '@angular/core';
import {CATEGORIES} from "../../common/mock.categories";
import {LocalStorageProvider} from "../local-storage/local-storage";
import {Category} from "../../common/Category";
import {Events} from "ionic-angular";
import {Subject} from "rxjs/Subject";

/*
  Generated class for the CategoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryProvider {


  activeCategory={id:5,name:'默认类别'};

  categorySubject = new Subject();

  constructor(/*public http: HttpClient*/private localStorageService:LocalStorageProvider,private events:Events) {
    console.log('Hello CategoryProvider Provider');
  }

  get(){
      return Promise.resolve(this.localStorageService.get('Category', CATEGORIES));
   /* return new Promise((resolve , reject) => {
      resolve(CATEGORIES);
    });*/
//    return CATEGORIES;
  }

  updateActiveCategory(category){
    this.activeCategory.id=category.id;
    this.activeCategory.name=category.name;
    this.categorySubject.next(this.activeCategory);
  }

  getCategorySubject(){
    return this.categorySubject.asObservable();
  }

  save(pid:number,category:Category){
    let flag:boolean=false;
    let data:Category[]=this.localStorageService.get('Category', CATEGORIES);
    data.forEach((value,index) => {
      if(value.id==pid){
        if(category.id==pid){
          data[index]=category;
        }else {
          value.children.forEach((cv,ci)=>{
            if(cv.id==category.id){
              data[index].children[ci]=category;
            }
          });
        }
        flag=true;
      }
    });
    if(flag==false){
      data.push(category);
    }
    this.set(data);
  }

  delete(pid:number,id:number){
    let data:Category[]=this.localStorageService.get('Category', CATEGORIES);
    data.forEach((val,idx,array)=>{
      if(pid==val.id){
        if(pid==id){
          array.splice(idx,1);
        }else {
          val.children.forEach((cv,ci,ca)=>{
            if(cv.id==id){
              ca.splice(ci,1);
            }
          });
        }
      }
    });
    this.set(data);
  }

  set(category){
    this.events.publish('Category:time',category);
    this.localStorageService.set('Category',category);
  }

}
