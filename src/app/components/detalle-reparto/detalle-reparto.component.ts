import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentNamer} from '../../app.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {IEdificio} from '../../interfaces/IEdificio';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {routerTransition} from '../../routing.animation';
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
  totalesEdificio: ITotal[];
  todosLosEdificios = [];
  tieneTotales = true;
  titleTotales = "TOTALES DEL EDIFICIO";
  indexEdificio = -1;

  constructor(private readRepartoFileService : ReadRepartoFileService, private dialog : MatDialog, private router: Router) {
    super();
    this.edificioActual = {direccion:"", departamentos:[], totalesEdificio:[]};
    this.totalesEdificio = [];
  }

  ngOnInit() {
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.edificioActual = this.readRepartoFileService.getEdificioActual();
      this.totalesEdificio = this.edificioActual.totalesEdificio;
      this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
      this.todosLosEdificios = this.readRepartoFileService.getEdificios();
      this.tieneTotales = this.readRepartoFileService.incluyeTotalesEdificio();
      scrollTo(0, 0);
    }, (err) => {
      if (this.readRepartoFileService.noHayArchivo){
        this.router.navigate(['home/-1/404']);
      }
    });
  }

  nextEdificio() {
    this.readRepartoFileService.setNextIndexEdificio();
    const prevIndex = this.indexEdificio;
    this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
    if(prevIndex == this.indexEdificio){
      //Termino el reparto
      this.router.navigate(['final-reparto']);
    }
    this.edificioActual = this.readRepartoFileService.getEdificioActual();
    this.totalesEdificio = this.edificioActual.totalesEdificio;
  }
  prevEdificio(){
    this.readRepartoFileService.setPrevIndexEdificio();
    this.indexEdificio = this.readRepartoFileService.getIndexEdificio();
    this.edificioActual = this.readRepartoFileService.getEdificioActual();
    this.totalesEdificio = this.edificioActual.totalesEdificio;
  }
  showEdificioSelect() {
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


