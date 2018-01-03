import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(){
  }
}

export class ComponentNamer {
  get componentName() { return this.constructor.name.toLowerCase().replace('component', ''); }
}
