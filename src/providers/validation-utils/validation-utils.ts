import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ValidationUtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ValidationUtilsProvider {

  constructor() {
    console.log('Hello ValidationUtilsProvider Provider');
  }

  EmailValidator(s:string):boolean{
    let emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if(emailReg.test(s)){
      return true;
    }else {
      return false;
    }
  }

  TelValidator(s:string):boolean{
    let phoneReg=/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/;
    if(phoneReg.test(s)){
      return true;
    }else {
      return false;
    }
  }


}
