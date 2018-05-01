import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {CategoryListPage} from "../category-list/category-list";
import {Product} from "../../common/Product";
import {CategoryProvider} from "../../providers/category/category";
import {ProductProvider} from "../../providers/product/product";
import {ValidationUtilsProvider} from "../../providers/validation-utils/validation-utils";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  categoryListPage:any=CategoryListPage;
  product:Product;
  subscription:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private categoryService:CategoryProvider,private productSetvice:ProductProvider,private toastCtrl:ToastController,private validationUtil:ValidationUtilsProvider,private barcodeScanner:BarcodeScanner,private camera:Camera,private imagePicker:ImagePicker) {
    this.product=new Product();
    this.product.id=1;
    this.product.categoryId=categoryService.activeCategory.id;
    this.product.categoryName=categoryService.activeCategory.name;
    this.product.images = [];
    this.subscription=this.categoryService.getCategorySubject().subscribe((data)=>{
      console.log(data);
      this.product.categoryId=data['id'];
      this.product.categoryName=data['name'];
    },(error)=>{

    },()=>{

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }

  ionViewWillUnload(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  scanBarcode(){
    this.barcodeScanner.scan().then((barcodeData)=>{
      this.product.barcode=barcodeData.text;
    },(err)=>{

    });
  }

  tocamera(){
    const options: CameraOptions = {
      quality: 100,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 100,
      targetHeight: 100
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.product.images.push(base64Image);
      //this.product.images.push(imageData);
    }, (err) => {
      // Handle error
    });
  }

  pickImage() {
    if(this.product.images.length<3){
      let count:number=0;
      if(this.product.images.length>0){
        count=3-this.product.images.length;
      }else {
        count=3;
      }
      let options = {
        maximumImagesCount: count,
       /* outputType: 1,*/
        targetWidth: 100,
        targetHeight: 100,
        quality: 100
      };
      this.imagePicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
          // console.log('Image URI: ' + results[i]);
         /* let base64Image='data:image/jpeg;base64,'+ results[i];
          this.product.images.push(base64Image);*/
          this.product.images.push(results[i]);
        }
      }, (err) => {

      });
    }else {
      this.showToast('只能上传3张图片！');
    }

  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: '新增供货商',
      inputs: [
        {
          name: 'name',
          placeholder: '名称'
        },
        {
          name: 'phone',
          placeholder: '电话'
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
          text: '保存',
          handler: data => {
            if(data){
              this.product.supplier=data.name;
              this.product.supplierPhone=data.phone;
            }
            console.log(data);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  private  showToast(m:string){
    let toast=this.toastCtrl.create({
      message:m,
      duration:3000
    });
    toast.present();
  }


  save(type:number){
    let m:string='';
    if (this.product.name==''){
      m+='产品名不能为空！';
    }else if(this.product.price==0){
      m+='售价不能为空！';
    }else if(this.product.supplier==''){
      m+='供货商不能为空！';
    }else if (!this.validationUtil.TelValidator(this.product.supplierPhone)){
      m+='供货商电话不合法！';
    }else {
      m+='商品添加成功';
      this.productSetvice.add(this.product);
      console.log(this.product);
      if(type==1){
        this.navCtrl.pop();
      }else {
        let p=new Product();
        p.id=1;
        this.product=p;
        this.product.name='';
        this.product.price=null;
        this.product.bid=null;
        this.product.images=[];
        this.product.barcode='';
        this.product.categoryId=5;
        this.product.categoryName='默认类别';
        this.product.remarks='';
        this.product.stock=null;
        this.product.standard='';
      }
    }
    this.showToast(m);
  }

}
