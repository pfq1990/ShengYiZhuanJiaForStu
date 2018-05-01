import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, ViewController} from 'ionic-angular';

/**
 * Generated class for the EditCategoryNamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-category-name',
  templateUrl: 'edit-category-name.html',
})
export class EditCategoryNamePage {

  name:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController,private toastCtrl:ToastController) {
    this.name=this.navParams.get('name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCategoryNamePage');
  }

  dismiss(type) {
    if(type){
      if (this.name){
        this.viewCtrl.dismiss({name: this.name});
      }else {
        this.showToast('修改名称不能为空!');
      }
    }else {
      this.navCtrl.pop();
    }

  }

  private  showToast(m:string){
    let toast=this.toastCtrl.create({
      message:m,
      duration:3000
    });
    toast.present();
  }

}
