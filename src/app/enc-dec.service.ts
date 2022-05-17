import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncDecService {

  Encrypt(pass: string){
    pass=atob(pass);
    return pass;
  }

  Decrypt(pass: string){
    pass=btoa(pass);
    return pass;
  }

  constructor() { }
}
