import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('Credentials')){
      UserArray = JSON.parse(localStorage.getItem('Credentials')!);
    }
    return UserArray.find((p: { name: any; password: any; }) => p.name === user.name && p.password === user.password);
  }
  existUser(user: any) {
    let UserArray = [];
    if (localStorage.getItem('Credentials')){
      UserArray = JSON.parse(localStorage.getItem('Credentials')!);
    }
    return UserArray.find((p: { userName: any;}) => p.userName === user.userName);
  }
}
