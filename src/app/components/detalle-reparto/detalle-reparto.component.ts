import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {IEdificio} from '../../interfaces/IEdificio';
import {DetalleEdificioComponent} from '../detalle-edificio/detalle-edificio.component';

@Component({
  selector: 'app-detalle-reparto',
  templateUrl: './detalle-reparto.component.html',
  styleUrls: ['./detalle-reparto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleRepartoComponent extends ComponentNamer implements OnInit {

  viewDetalle = true;
  edificioActual : IEdificio;

  constructor(private readRepartoFileService : ReadRepartoFileService) {
    super();
    this.edificioActual = {direccion:"", departamentos:[], totalesEdificio:[]};
  }

  ngOnInit() {
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.edificioActual = this.readRepartoFileService.getEdificioActual();
      scrollTo(0,0);
    });
  }

  nextEdificio(){
    this.readRepartoFileService.setNextIndexEdificio();
    this.edificioActual = this.readRepartoFileService.getEdificioActual();
  }
  prevEdificio(){
    this.readRepartoFileService.setPrevIndexEdificio();
    this.edificioActual = this.readRepartoFileService.getEdificioActual();
  }

}
