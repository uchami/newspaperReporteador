import {Component, Input, OnInit} from '@angular/core';
import {IEdificio} from '../../interfaces/IEdificio';
import {ITotal} from '../../interfaces/ITotal';

@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.css']
})
export class TotalesComponent implements OnInit {

  @Input() title;
  @Input() totales: ITotal[];
  constructor() { }

  ngOnInit() {

  }
  feriadoOSusc(pub : ITotal){
    if(pub.color == 1){
      if(pub.publicacion.indexOf("|S") != -1) return "S";
      if(pub.publicacion.indexOf("|F") != -1) return "F";
    }
    return "";
  }
}
