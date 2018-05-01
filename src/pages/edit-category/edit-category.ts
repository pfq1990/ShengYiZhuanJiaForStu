import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Category} from "../../common/Category";
import {CategoryProvider} from "../../providers/category/category";

/**
 * Generated class for the EditCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-category',
  templateUrl: 'edit-category.html',
})
export class EditCategoryPage {

  title:string='编辑分类';

  editChildern:Category[]=[];
  editCategory:Category;
  type:number;


  constructor(public navCtrl: NavController, public navParams: NavParams,private categoryService:CategoryProvider,private alertCtrl:AlertController) {
    this.type=this.navParams.get('type');
    this.editCategory=this.navParams.get('category');
    if (!this.editCategory){
      this.editCategory={
        id:1,
        name:'',
        children:[]
      };
      this.editCategory.id+=this.navParams.get('addI');
    }
    let c:Category={
      id:1,
      name:'',
      children:[]
    };
    c.id=1;
    if(this.type>=2){
      let clidern:Category[]=this.editCategory.children;
      if(!clidern){
        c.id+=clidern[clidern.length - 1].id;
      }else {
        c.id+=this.editCategory.id*10;
      }
    }
    console.log(c.id);
    this.editChildern.push(c);
    this.editCategory.children.push(c);
    console.log(this.editChildern);
    this.getTypeCategory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryPage');
  }

  ionViewDidLeave(){
    this.editChildern=this.removeEmptyChildern(this.editChildern);
    this.editCategory.children=this.removeEmptyChildern(this.editCategory.children);
  }

  private getTypeCategory(){
    let title='';
    if (this.type==0){
      title+='新增大分类';
    }else if(this.type==1){
      title+='编辑大分类';
    }else if(this.type==2){
      title+='新增小分类';
    }else if(this.type==3){
      title+='编辑小分类';
    }
    this.title=title;

  }


  addSubCategory(){

    let c:Category={
      id:1,
      name:'',
      children:[]
    };
    c.id=1;
    let clidern:Category[]=this.editChildern;
    c.id+=this.editCategory.children[this.editCategory.children.length - 1].id;
    console.log(c.id);
    this.editChildern.push(c);
    this.editCategory.children.push(c);
    console.log(this.editCategory);
    console.log(this.editChildern);
  }

  save(){
    console.log(this.editCategory);
    console.log(this.editChildern);
    let t='操作提示！';
    let m='';
    if(this.editCategory.name==''){
      m+='新增大类名不能为空！';
    }else {
      if(this.type==0){
        m+='新增大类‘'+this.editCategory.name+'’成功！'
      }else if(this.type==2){
        m+='大类‘'+this.editCategory.name+'’添加小类成功！'
      }
      this.editChildern=this.removeEmptyChildern(this.editChildern);
      console.log(this.editChildern);
      this.editCategory.children=this.removeEmptyChildern(this.editCategory.children);
      this.categoryService.save(this.editCategory.id,this.editCategory);
    }
    this.showAlert(t,m);
  }

  private showAlert(t:string,st:string){

    let alert=this.alertCtrl.create({
      title:t ,
      subTitle:st ,
      buttons:['关闭']
    });
    alert.present();
  }

  private removeEmptyChildern(categories:Category[]){
    if(categories){
      for (let i:number=0;i<categories.length;){
        if(!categories[i].name){
          categories.splice(i,1);
        }else {
          i++;
        }
      }
    }
    return categories;
  }


}
