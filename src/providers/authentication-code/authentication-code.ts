import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthenticationCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationCodeProvider {

  private code:string;

  private deadline:number;

  constructor() {
    console.log('Hello AuthenticationCodeProvider Provider');
    this.code='';
  }

  createCode(count:number):string{
    this.code='';
    this.deadline=Date.now()+60*10*1000;
    for(let i:number=0;i<count;i++){
      let num =Math.floor(Math.random()*10);
      this.code+=num.toString();
    }
    return this.code;
  }

  validate(value:string){
    let now=Date.now();
    return value==this.code && now < this.deadline;
  }

}
