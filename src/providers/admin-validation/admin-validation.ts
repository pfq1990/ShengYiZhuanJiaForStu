import { Injectable } from '@angular/core';
import {LocalStorageProvider} from "../local-storage/local-storage";
import {ADMINISTRATOR} from "../../common/mock.administrator";
import {User} from "../../common/User";

/*
  Generated class for the AdminValidationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdminValidationProvider {

  constructor(private localService:LocalStorageProvider) {
    console.log('Hello AdminValidationProvider Provider');
  }

  adminUserValidation(user):Promise<any>{
    return new Promise((resolve, reject) => {
      if (!user){
        reject('输入用户名/密码不能为空！');
      }
      let administrator:User[]=this.localService.get('Administrator',ADMINISTRATOR);
      let rs=false;
      administrator.forEach(value=>{
        if(value.username==user.username && value.password==user.password){
          rs=true;
        }
        resolve(rs);
      });
    });
  }

}
