import {ApplicationRef, Component, Input, OnInit} from '@angular/core';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {IEdificio} from '../../interfaces/IEdificio';

@Component({
  selector: 'app-detalle-edificio',
  templateUrl: './detalle-edificio.component.html',
  styleUrls: ['./detalle-edificio.component.css']
})
export class DetalleEdificioComponent implements OnInit {
  @Input() edificioActual: IEdificio;
  constructor() {
  }
  ngOnInit() {
    /*document.getElementById("wrap").addEventListener("scroll",function(){
      var translate = "translate(0,"+this.scrollTop+"px)";
      this.querySelector("thead").style.transform = translate;
    });*/
    var fauxTable = document.getElementById("faux-table");
    var mainTable = document.getElementById("main-table");
    var clonedElement = mainTable.cloneNode(true);
    fauxTable.appendChild(clonedElement);
  }
}


