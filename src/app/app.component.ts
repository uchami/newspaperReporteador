import {Component, OnInit} from '@angular/core';
import {routerTransition} from './routing.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ]
})
export class AppComponent implements OnInit {
  ngOnInit(){
  }
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}

export class ComponentNamer {
  get componentName() { return this.constructor.name.toLowerCase().replace('component', ''); }
}

