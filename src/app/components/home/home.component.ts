import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {ComponentNamer} from '../../app.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import 'rxjs/add/operator/takeWhile';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentNamer implements OnInit {
  anim = false;
  selectedRepartidor = null;
  selectedRepartidorId = null;
  repartidores = [];

  nombreParada = '';
  fechaListado = '';
  ordenamiento = '';

  constructor(public dialog: MatDialog, private readRepartoFileService: ReadRepartoFileService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.repartidores = this.readRepartoFileService.getRepartidores();
      var cabecera = this.readRepartoFileService.getCabeceraReporte();
      this.nombreParada = cabecera.nombreParada;
      this.fechaListado = cabecera.fechaDeReparto;
      this.ordenamiento = cabecera.orden.replace('ORDENADO POR: ','');
    });
  }
  openDialog(): void {
    let selectDialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        title: '¿Quién sos?',
        options: this.repartidores
      }
    });
    selectDialogRef.afterClosed().subscribe(result => {
      if(result != null){
          this.selectedRepartidor = this.repartidores.find(r => r.value == result).name;
          this.selectedRepartidorId = result;
          if(this.selectedRepartidor.length > 30){
              this.selectedRepartidor = this.selectedRepartidor.substr(0,26) + '...';
          }
      }
    });
  }
  startReparto(){
    if(this.selectedRepartidorId != null){
      this.readRepartoFileService.setRepartidorId(this.selectedRepartidorId);
      this.readRepartoFileService.setIndexEdificio(0);
      this.anim = true;
      //Timer (wait until animation ended to navigate)
      var goOn = true;
      Observable.interval(1500)
        .takeWhile(() => goOn)
        .subscribe(i => {
          this.router.navigate(['detalle-reparto']);
          goOn = false;
        });
    } else {
      console.log("No selecciono repartidor");
    }
  }

}
