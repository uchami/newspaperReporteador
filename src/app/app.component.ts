import {Component, OnChanges, OnInit} from '@angular/core';
import {routerTransition} from './routing.animation';
import {NavigationEnd, Router} from '@angular/router';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ]
})
export class AppComponent implements OnInit {
  constructor(angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics) {
  }
  ngOnInit(){
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}

export class ComponentNamer {
  get componentName() { return this.constructor.name.toLowerCase().replace('component', ''); }
}

