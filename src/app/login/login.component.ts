import { Component, OnInit } from '@angular/core';
import {ComponentNamer} from '../app.component';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends ComponentNamer implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
