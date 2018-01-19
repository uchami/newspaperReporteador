import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';
import {JwtHelper} from 'angular2-jwt';
import {Observable} from 'rxjs/Observable';

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


  login(username, password, remember): Observable<string> {
    let body = `username=${username}&password=${password}`;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/x-www-form-urlencoded');

    const obs = this.http.post<any>("http://localhost/reparto/loginservice.php",body, {headers: headers});
    obs.subscribe(data => {
      const user = data.data;
      const res = JSON.parse(this.jwtHelper.decodeToken(user));
      if(res.status){
        this.currentUser = res;
        if(remember) this.cookieService.put('currentUser', user, this.opts);
      } else {
        this.currentUser = null;
      }
    });
    return obs;
  }
  getCurrentUser() {
    if(this.currentUser == null) {
      const cookieUser = this.cookieService.get('currentUser');
      if(cookieUser != null){
        this.currentUser = JSON.parse(this.jwtHelper.decodeToken(cookieUser));
      }
    };
    return this.currentUser;
  }
  isActive() {
    const currUs = this.getCurrentUser();
    return (currUs != null);
  }
}
