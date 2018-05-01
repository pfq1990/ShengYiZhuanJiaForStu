import { Component } from '@angular/core';
import {ActionSheetController, Events, NavController, NavParams} from 'ionic-angular';
import {CategoryProvider} from "../../providers/category/category";
import {Category} from "../../common/Category";
import {CategoryEditListPage} from "../category-edit-list/category-edit-list";
import {EditCategoryPage} from "../edit-category/edit-category";

/**
 * Generated class for the CategoryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categories:Category[];
  activeCategory:Category;
  activeSubCategories:Category[];
  activeSubCategory:Category;
  addIndex:number;

  editCategoryPage=EditCategoryPage;


  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider,public  actionSheetCtrl:ActionSheetController,private events:Events) {
    this.categoryService.get().then((data)=>{
      this.categories=data;
      if (!this.activeCategory){
        this.activeCategory=this.categories[0];
        this.activeSubCategories=this.activeCategory.children;
        this.activeSubCategory=this.activeSubCategories[0];
      }
    });
    this.events.subscribe('Category:time',(data)=>{
      this.categories=data;
      if (!this.activeCategory){
        this.activeCategory=this.categories[0];
        this.activeSubCategories=this.activeCategory.children;
        this.activeSubCategory=this.activeSubCategories[0];
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryListPage');
  }


  selectCategory(category){
    this.activeCategory=category;
    this.activeSubCategories=this.activeCategory.children;
    this.activeSubCategory=this.activeSubCategories[0];
    console.log(this.activeCategory);
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '操作',
      buttons: [
        {
          text: '新增小分类',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.navCtrl.push(EditCategoryPage,{type:'2','category':this.activeCategory});
          }
        },{
          text: '编辑分类',
          handler: () => {
            this.navCtrl.push(CategoryEditListPage,{
              'activeCategory':this.activeCategory,
              'isdelete':false
            });
            console.log('Archive clicked');
          }
        },{
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  selectSubCategory(category){
    this.activeSubCategory=category;
    this.categoryService.updateActiveCategory(category);
    this.navCtrl.pop();
  }

  gotoAddCategory(){
    let length=this.categories.length;
    let index=this.categories[length - 1].id;
    this.navCtrl.push(EditCategoryPage,{type:'0',addI:index});
  }

}
