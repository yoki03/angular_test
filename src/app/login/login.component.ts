import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EncDecService } from '../enc-dec.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cp = '';


  ngOnInit(): void {
    var getData = localStorage.getItem('Credentials');
    getData = JSON.parse(getData || '{}');
    //this.onGetPost(getData!);
    console.log(getData);
  }

  closeResult = '';

  constructor(private encdecServ: EncDecService, private modalService: NgbModal, private authService: AuthService) {}


  onGetPost(getData: { name: string; password: string}){
    getData.password = this.encdecServ.Decrypt(getData.password);
    return getData;
  }

  postdata: any = {};

  onCreatePost(postData: { name: string; password: string}){
    postData.password = this.encdecServ.Encrypt(postData.password);
    //console.log(postData);
    this.postdata = Object.assign(this.postdata, postData);
    const user = this.authService.authUser(postData);
    //console.log(user);
    if (user){
      console.log('user exist');
    } else{
      this.addpostData(this.postdata);
    }
    postData.password = this.encdecServ.Decrypt(postData.password);
  }

  onLogin(loginForm: { name: string; password: string}){
    //console.log(loginForm);
    loginForm.password = this.encdecServ.Encrypt(loginForm.password);
    //console.log(loginForm);
    const user = this.authService.authUser(loginForm);
    //console.log(user);
    if (user){
      console.log('login successful');
    } else{
      console.log('login not successful');
    }
    loginForm.password = this.encdecServ.Decrypt(loginForm.password);
  }

  addpostData(postdata: any) {
    let postdatas = [];
    if (localStorage.getItem('Credentials')){
      postdatas = JSON.parse(localStorage.getItem('Credentials')!);
      postdatas = [postdata, ...postdatas];
    }else{
      postdatas = [postdata];
    }
    localStorage.setItem('Credentials',JSON.stringify(postdatas)) 
  }






  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



}
