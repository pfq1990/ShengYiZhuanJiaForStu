import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams} from 'ionic-angular';
import {Product} from "../../common/Product";
import {AdminValidationProvider} from "../../providers/admin-validation/admin-validation";
import {ShareMessagePage} from "../share-message/share-message";

/**
 * Generated class for the ProductViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-product-view',
  templateUrl: 'product-view.html',
})
export class ProductViewPage {

  product:Product;
  isShowBid:number=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private administratorValication:AdminValidationProvider,private actionSheetCtrl:ActionSheetController) {
    this.product=this.navParams.get('product');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductViewPage');
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '查询权限验证',
      inputs: [
        {
          name: 'username',
          placeholder: '管理员帐号'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: '密码'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '验证',
          handler: data => {
            console.log(data);
            let t='错误提示';
            let st='';
            if (!data.username){
              st+='用户名不能为空！';
              this.showAlert(t,st);
            }else if (!data.password){
              st+='密码不能为空！';
              this.showAlert(t,st);
            }else {
              this.administratorValication.adminUserValidation(data).then(rs=>{
                console.log(rs);
                if(rs){
                  this.isShowBid=1;
                }else {
                  t+='验证失败';
                  st+='帐号密码不匹配，请重新验证!';
                  this.showAlert(t,st);
                }
              });
            }
          }
        }
      ]
    });
    prompt.present();
  }

  private showAlert(t:string,st:string){

    let alert=this.alertCtrl.create({
      title:t ,
      subTitle:st ,
      buttons:['关闭']
    });
    alert.present();
  }

  showShowProduct(){
    let actionSheet=this.actionSheetCtrl.create({
      buttons:[
        {
          text:'好友',
          icon:'chatbubbles',
          cssClass:'actc-sharebutton',
          handler:()=>{
            console.log('选择分享至好友');
          }
        },
        {
          text:'朋友圈',
          icon:'aperture',
          cssClass:'actc-sharebutton',
          handler:()=>{
            console.log('选择分享至朋友圈');
          }
        },
        {
          text:'短信',
          icon:'mail',
          cssClass:'actc-sharebutton',
          handler:()=>{
            this.navCtrl.push(ShareMessagePage,{'data':this.product});
            console.log('选择分享至短信');
          }
        },
        {
          text: 'QQ',
          icon:'people',
          cssClass:'actc-sharebutton',
          handler: () => {
            console.log('选择分享至QQ');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showSelectFunction() {
    let alert = this.alertCtrl.create();
    alert.setTitle('选择更多功能');

    alert.addInput({
      type: 'radio',
      label: '编辑商品',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '删除商品',
      value: '2',
      checked: false
    });

    alert.addButton('取消');
    alert.addButton({
      text: '确定',
      handler: data => {
        if(data==1){

        }else {

        }
        console.log(data);
      }
    });
    alert.present();
  }

}
