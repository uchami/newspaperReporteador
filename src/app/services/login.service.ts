import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';
import {JwtHelper} from 'angular2-jwt';
import {MatDialog} from '@angular/material';
import {MessageDialogComponent} from '../components/message-dialog/message-dialog.component';


@Injectable()
export class LoginService {

  opts: CookieOptionsArgs = {
    expires: this.addDays(new Date(), 15)
  };
  currentUser: IUser;
  validity: boolean;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private cookieService: CookieService, private dialog: MatDialog) { }

  addDays(date, days) {
    const one_day = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + (days * one_day));
  }


  login(username, password) {
    let body = `username=${username}&password=${btoa("96bf6314b679ba43775964fdd65aa0e4" + password)}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post<any>("http://listadodereparto.lss.com.ar/repartoAPI/loginservice.php",body, {headers: headers});
  }
  onLoginLoad(data, remember){
    const user = data.data;
    const res = JSON.parse(this.jwtHelper.decodeToken(user));
    if(res.status){
      this.currentUser = res;
      this.validity = true;
      if(remember) this.cookieService.put('currentUser', user, this.opts);
    } else {
      if(res.error == "Deshabilitado"){
        setTimeout(() => {
        this.dialog.open(MessageDialogComponent, {
          data: {
            title: 'Ups!<br>',
            message: 'Tu usuario no está habilitado para ver el Listado de Reparto en el celular.',
            buttonText: 'Entendido'
          }, disableClose: true
        });
      }, 0);
      }
      this.validity = false;
      this.currentUser = null;
    }
  }
  getCurrentUser() {
    if(this.currentUser == null) {
      const cookieUser = this.cookieService.get('currentUser');
      if(cookieUser != null){
        this.currentUser = JSON.parse(this.jwtHelper.decodeToken(cookieUser));
      }
    }
    return this.currentUser;
  }
  checkUser(){
    const user: IUser = this.getCurrentUser();
    let body = `identifier=${user.identificacion}&id=${user.id}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/x-www-form-urlencoded');
    return this.http.post<any>("http://listadodereparto.lss.com.ar/repartoAPI/checkUser.php",body, {headers: headers});
  }
  onCheckUserLoad(data){
    const response = data.data;
    const res = JSON.parse(this.jwtHelper.decodeToken(response));
    if(res.status && res.habilitado == 1){
      this.validity = true;
    } else {
      console.log(res);
      console.log(res.habilitado);
      if(res.habilitado && res.habilitado == 0) {
        this.validity = true;
      } else{
        this.validity = false;
        this.currentUser = null;
        this.cookieService.remove('currentUser');
      }
    }
  }
  isActive() {
    const currUs = this.getCurrentUser();
    return (currUs != null);
  }
}
