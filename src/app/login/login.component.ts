import { Component, OnInit } from '@angular/core';
import {ComponentNamer} from '../app.component';
import {ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentNamer implements OnInit {

  constructor(private router: Router) {
    super();
  }
  user = '';
  password = '';
  userSent = '';
  passSent = '';
  userValidation = null;
  passwordValidation = null;
  ngOnInit() {
  }

  loginAction(){
    this.userSent = this.user;
    this.passSent = this.password;
    if(this.user.toLowerCase() == "admin" && this.password.toLowerCase() == "admin") {
      this.userValidation = true;
      this.passwordValidation = true;

      this.router.navigate(['home']);
    }
    else{
      this.userValidation = true;
      this.passwordValidation = false;
    }
  }
  classValidationPassword(){
    if((this.passwordValidation != null) && (this.passSent == this.password) && (this.userSent == this.user)){
      return {'has-success':this.passwordValidation, 'error':!this.passwordValidation};
    } else {
      return {'has-success': false, 'error':false};
    }
  }
  classValidationUser(){
    if((this.userValidation != null) && (this.passSent == this.password) && (this.userSent == this.user)){
      return {'has-success':this.userValidation, 'error':!this.userValidation}
    } else {
      return {'has-success': false, 'error':false};
    }
  }
}
