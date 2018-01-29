import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';
import {JwtHelper} from 'angular2-jwt';



@Injectable()
export class LoginService {

  opts: CookieOptionsArgs = {
    expires: this.addDays(new Date(), 15)
  };
  currentUser: IUser;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private cookieService: CookieService) { }

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
      if(remember) this.cookieService.put('currentUser', user, this.opts);
    } else {
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
  isActive() {
    const currUs = this.getCurrentUser();
    return (currUs != null);
  }
}
