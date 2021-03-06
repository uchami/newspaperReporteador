import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';
import {ComponentNamer} from '../../app.component';
import {IUser} from '../../interfaces/IUser';
import {LoginService} from '../../services/login.service';
import {Angulartics2} from 'angulartics2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentNamer implements OnInit {

  constructor(private router: Router, private loginService: LoginService, private angulartics2: Angulartics2) {
    super();
  }
  user = '';
  password = '';
  userSent = '';
  passSent = '';
  userValidation = null;
  passwordValidation = null;
  lockImage = '';
  userImage = '';
  remember = false;
  ngOnInit() {
    if(this.loginService.isActive()){
      this.loginService.checkUser().subscribe(data => {
        this.loginService.onCheckUserLoad(data);
        this.router.navigate(['home']);
      }, (err) => {
        this.loginService.validity = true;
        this.router.navigate(['home']);
      });
    }
  }

  loginAction(){
    this.userValidation = null;
    this.passwordValidation = null;
    this.userSent = this.user;
    this.passSent = this.password;
    this.loginService.login(this.user, this.password).subscribe(data => {
      this.loginService.onLoginLoad(data, this.remember);
      if(this.loginService.isActive()) {
        this.userValidation = true;
        this.passwordValidation = true;
        this.angulartics2.eventTrack.next({
          action: 'LoginSuccesful',
          properties: { category: 'Login' },
        });
        this.router.navigate(['home']);
      }
      else{
        this.userValidation = false;
        this.passwordValidation = false;
      }
    });
  }
  classValidationPassword(){
    if ((this.passwordValidation != null) && (this.passSent == this.password) && (this.userSent == this.user)){
      this.lockImage = (this.passwordValidation) ? 'Right' : 'Wrong';
      return {'has-success': this.passwordValidation, 'error': !this.passwordValidation};
    } else {
      this.lockImage = '';
      return {'has-success': false, 'error': false};
    }
  }
  classValidationUser(){
    if ((this.userValidation != null) && (this.passSent == this.password) && (this.userSent == this.user)){
      this.userImage = (this.userValidation) ? 'Right' : 'Wrong';
      return {'has-success': this.userValidation, 'error': !this.userValidation}
    } else {
      this.userImage = '';
      return {'has-success': false, 'error': false};
    }
  }
}
