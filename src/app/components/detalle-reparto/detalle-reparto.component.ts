import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {IEdificio} from '../../interfaces/IEdificio';
import {DetalleEdificioComponent} from '../detalle-edificio/detalle-edificio.component';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-detalle-reparto',
  templateUrl: './detalle-reparto.component.html',
  styleUrls: ['./detalle-reparto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleRepartoComponent extends ComponentNamer implements OnInit {

  viewDetalle = true;
  edificioActual : IEdificio;
  todosLosEdificios = [];
  constructor(private readRepartoFileService : ReadRepartoFileService, private dialog : MatDialog) {
    super();
    this.edificioActual = {direccion:"", departamentos:[], totalesEdificio:[]};
  }

  ngOnInit() {
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.edificioActual = this.readRepartoFileService.getEdificioActual();
      this.todosLosEdificios = this.readRepartoFileService.getEdificios();
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
  showEdificioSelect(){
    let selectDialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        title: 'Seleccione edificio',
        options: this.todosLosEdificios
      }
    });
    selectDialogRef.afterClosed().subscribe(result => {
      //navigate to edificio
      console.log(result);
    });
  }

}
