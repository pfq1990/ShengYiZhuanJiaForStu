import { Component } from '@angular/core';
import {AlertController, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {Category} from "../../common/Category";
import {EditCategoryPage} from "../edit-category/edit-category";
import {EditCategoryNamePage} from "../edit-category-name/edit-category-name";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the CategoryEditListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-category-edit-list',
  templateUrl: 'category-edit-list.html',
})
export class CategoryEditListPage {

  activeCategory:Category;
  activeSubCategories:Category[];
  selectCategory:Category;


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private modalCtrl:ModalController,private categoryService:CategoryProvider) {
    this.activeCategory=this.navParams.get('activeCategory');
    this.activeSubCategories=this.activeCategory.children;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryEditListPage');
  }

  presentModal(category) {
    this.selectCategory=category;
    let modal = this.modalCtrl.create(EditCategoryNamePage, {name:this.selectCategory.name});
    modal.onDidDismiss(data => {
      // 修改数据并保存到本地存储
      console.log(data);
      if(data){
        this.selectCategory.name=data['name'].toString();
        console.log(this.selectCategory);
        console.log(this.activeCategory.id);
        this.categoryService.save(this.activeCategory.id,this.selectCategory);
      }
    });
    modal.present();
  }

  showConfirm(category) {
    this.selectCategory=category;
    let confirm = this.alertCtrl.create({
      title: '你确认要删除吗？',
      message: '请先删除该类别下的所有商品记录',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            // 删除数据并保存到本地存储中
            console.log(this.selectCategory);
            console.log(this.activeCategory.id);
            this.categoryService.delete(this.activeCategory.id,this.selectCategory.id);
            if (this.activeCategory.id==this.selectCategory.id){
              this.navCtrl.pop();
            }else {
              let idx=this.activeCategory.children.indexOf(category);
              this.activeCategory.children.splice(idx,1);
            }
          }
        }
      ]
    });
    confirm.present();
  }

  save(){
    this.activeCategory.children=this.activeSubCategories;
    console.log(this.activeCategory);
    this.categoryService.save(this.activeCategory.id,this.activeCategory);
  }

}
