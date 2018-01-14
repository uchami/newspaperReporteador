import {Component, Input, OnInit} from '@angular/core';
import {IEdificio} from '../../interfaces/IEdificio';
import {ITotal} from '../../interfaces/ITotal';
import {ITotalDTO} from '../../interfaces/ITotalDTO';

@Component({
  selector: 'app-totales',
  templateUrl: './totales.component.html',
  styleUrls: ['./totales.component.css']
})
export class TotalesComponent implements OnInit {

  @Input() title;
  @Input() totales: ITotal[];
  totalesData: ITotalDTO[] = [];
  constructor() { }

  ngOnInit() {
    var fauxTable = document.getElementById("faux-totales-header");
    var mainTable = document.getElementById("totales-header");
    var clonedElement = mainTable.cloneNode(true);
    fauxTable.appendChild(clonedElement);

    this.totales.forEach(tot => {
      var newTot: ITotalDTO = <ITotalDTO>{};
      newTot.color = tot.color;
      newTot.cantidad = tot.cantidad;
      newTot.letter = this.feriadoOSusc(tot);
      newTot.publicacion = tot.publicacion;
      this.totalesData.push(newTot);
    });
  }
  feriadoOSusc(pub : ITotal){
    if(pub.color == 1){
      if(pub.publicacion.indexOf("|S") != -1) {
        pub.publicacion = pub.publicacion.replace("|S", "");
        return "S";
      }
      if(pub.publicacion.indexOf("|F") != -1) {
        pub.publicacion = pub.publicacion.replace("|F", "");
        return "F";
      }
    }
    return "";
  }
}
