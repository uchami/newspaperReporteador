import { Component, OnInit } from '@angular/core';
import {ComponentNamer} from '../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentNamer implements OnInit {

  constructor() { super(); }
  anim = false;
  ngOnInit() {
  }

}
