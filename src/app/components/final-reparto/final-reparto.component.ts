import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ComponentNamer} from '../../app.component';
import {routerTransition} from '../../routing.animation';

@Component({
  selector: 'app-final-reparto',
  templateUrl: './final-reparto.component.html',
  styleUrls: ['./final-reparto.component.css']
})
export class FinalRepartoComponent extends ComponentNamer implements OnInit {

  constructor(private router: Router) {
    super();
  }

  ngOnInit() {
  }
  goHome() {
    this.router.navigate(['home']);
  }

}
