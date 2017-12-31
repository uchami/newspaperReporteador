import { Component } from '@angular/core';
import {Router, RoutesRecognized} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}

export class ComponentNamer {
  get componentName() { return this.constructor.name.toLowerCase().replace('component', ''); }
}
