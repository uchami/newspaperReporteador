import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';

@Injectable()
export class LoginService {

  opts: CookieOptionsArgs = {
    expires: this.addDays(new Date(), 15)
  };
  currentUser: IUser;
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  addDays(date, days) {
    const one_day = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + (days * one_day));
  }


  login(username, password, remember) {
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let body = `username=${username}&password=${password}`;
    const obs = this.http.post<IUser>("http://localhost/reparto/loginservice.php",body, {headers: headers});
    obs.subscribe(user => {
      //this.currentUser = user;
      //if(remember) this.cookieService.put('currentUser', JSON.stringify(user), this.opts);
      console.log(user);
    });
    return obs;
  }
  getCurrentUser() {
    if(this.currentUser) return this.currentUser;
    return this.cookieService.get('currentUser');
  }
  isActive() {
    const currUs = this.getCurrentUser();
    return (currUs && currUs != '');
  }
}
