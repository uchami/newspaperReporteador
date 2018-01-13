import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {IEdificio} from '../../interfaces/IEdificio';
import {DetalleEdificioComponent} from '../detalle-edificio/detalle-edificio.component';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';
import {MatDialog} from '@angular/material';
import {ITotal} from '../../interfaces/ITotal';

@Component({
  selector: 'app-detalle-reparto',
  templateUrl: './detalle-reparto.component.html',
  styleUrls: ['./detalle-reparto.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetalleRepartoComponent extends ComponentNamer implements OnInit {

  viewDetalle = true;
  totalesButtonText = "TOTALES";
  edificioActual : IEdificio;
  todosLosEdificios = [];
  titleTotales = "TOTALES DEL EDIFICIO";
  indexEdificio = -1;
  lengthEdificios = -1;

  constructor(private readRepartoFileService : ReadRepartoFileService, private dialog : MatDialog) {
    super();
    this.edificioActual = {direccion:"", departamentos:[], totalesEdificio:[]};
  }

  ngOnInit() {
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.edificioActual = this.readRepartoFileService.getEdificioActual();
      this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
      this.todosLosEdificios = this.readRepartoFileService.getEdificios();
      scrollTo(0,0);
    });
  }

  nextEdificio(){
    this.readRepartoFileService.setNextIndexEdificio();
    this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
    this.edificioActual = this.readRepartoFileService.getEdificioActual();
  }
  prevEdificio(){
    this.readRepartoFileService.setPrevIndexEdificio();
    this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
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
      if(result != null){
        //navigate to edificio
        this.readRepartoFileService.setIndexEdificio(result.value);
        this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
        this.edificioActual = this.readRepartoFileService.getEdificioActual();
      }
    });
  }

  toggleViewDetalle() {
    this.viewDetalle = !this.viewDetalle;
    this.totalesButtonText = (this.viewDetalle) ? "TOTALES" : "<img src='./assets/images/left-arrow.png'>";
  }
}


