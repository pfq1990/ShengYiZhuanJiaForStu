import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {ContactFieldType, ContactFindOptions, Contacts} from "@ionic-native/contacts";
import {SMS} from "@ionic-native/sms";
import {ValidationUtilsProvider} from "../../providers/validation-utils/validation-utils";

/**
 * Generated class for the ShareMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-share-message',
  templateUrl: 'share-message.html',
})
export class ShareMessagePage {

  private contactslist:any[]=[];
  private contactsData:any[]=[];
  private product;
  private activeContact;
  private phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts:Contacts,private sms:SMS,private alertCtrl:AlertController,private validationService:ValidationUtilsProvider) {
    this.getAllContacts();
    this.product=this.navParams.get('data');
    console.log(this.product);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareMessagePage');
  }


  getAllContacts(){
    console.log('getAllContacts');
    let options=new ContactFindOptions();
    options.filter='';
    options.multiple=true;
    options.hasPhoneNumber=true;
    let fields:ContactFieldType[]=['displayName', 'phoneNumbers'];
    this.contacts.find(fields,options).then((result)=>{
      this.contactslist=result;
      this.contactsData=result;
    });
  }

  sendMessageToNewContact(){
    if(this.validationService.TelValidator(this.phoneNumber)){
      this.showAlert(this.phoneNumber);
    }else {
      this.presentAlert(this.phoneNumber);
    }
  }

  onInput(event){
    console.log(event);
    if(!event.target.value){
      return;
    }
    let value=event.target.value;
    if(!isNaN(Number(value))){
      this.searchByPhone(value);
    }else {
      this.searchByName(value);
    }
    this.phoneNumber=value;
    console.log(value);
  }



  sendMessage(phoneNumber,Messages){
    this.sms.send(phoneNumber,Messages);
  }

  selectContact(contact){
    this.activeContact=contact;
    this.showAlert(contact.phoneNumbers[0].value);
  }

  private showAlert(phoneNumber){
    let alert = this.alertCtrl.create({
      title: '温馨提示',
      message: '是否向“'+phoneNumber+'”号码发送共享信息！',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消 clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.sendMessage(phoneNumber,this.getMessage());
            console.log('确定 clicked');
          }
        }
      ]
    });
    alert.present();
  }

  private searchByName(name){
    if(!name){
      this.contactslist=this.contactsData;
      return;
    }
    let rs:any[]=[];
    this.contactsData.forEach(value => {
      if(value.displayName.indexOf(name)>=0)rs.push(value);
    });
    this.contactslist=rs;
  }

  private searchByPhone(phoneNumber){
    if(!phoneNumber){
      this.contactslist=this.contactsData;
      return;
    }
    let rs:any[]=[];
    this.contactsData.forEach(data => {
      let i;
      for(i=0;i<data.phoneNumbers.length;i++){
        if(data.phoneNumbers[i].value.indexOf(phoneNumber)>=0){
          rs.push(data);
          break;
        }
      }
    });
    this.contactslist=rs;
  }

  private getMessage():string{
    let m='';
    m+='商品名：'+this.product.name+' \n ';
    m+='分类为：'+this.product.categoryName+' \n ';
    m+='条码为：'+this.product.barcode+' \n ';
    m+='售价为：'+this.product.price+' \n ';
    m+='规格为：'+this.product.standard+' \n ';
    m+='库存为：'+this.product.stock+' \n ';
    return m;
  }

  private presentAlert(name) {
    let alert = this.alertCtrl.create({
      title: '错误提示!',
      subTitle: '输入电话号码‘'+name+'’不合法!!',
      buttons: ['关闭']
    });
    alert.present();
  }
}
