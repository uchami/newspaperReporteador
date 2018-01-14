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
    var fauxTable = document.getElementById("faux-totales-header");
    var mainTable = document.getElementById("totales-header");
    var clonedElement = mainTable.cloneNode(true);
    fauxTable.appendChild(clonedElement);
  }
  feriadoOSusc(pub : ITotal){
    if(pub.color == 1){
      if(pub.publicacion.indexOf("|S") != -1) return "S";
      if(pub.publicacion.indexOf("|F") != -1) return "F";
    }
    return "";
  }
}
