import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncDecService {

  Encrypt(pass: string){
    console.log(pass);
    pass=atob(pass);
    console.log(pass);
    return pass;
  }

  Decrypt(pass: string){
    pass=btoa(pass);
    return pass;
  }

  constructor() { }
}
