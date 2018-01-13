import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';
import {ReadRepartoFileService} from '../../services/read-reparto-file.service';
import {ComponentNamer} from '../../app.component';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/takeWhile';
import {MessageDialogComponent} from '../message-modal/message-dialog.component';


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

  constructor(public dialog: MatDialog, private readRepartoFileService: ReadRepartoFileService, private router: Router,
              private route: ActivatedRoute) {
    super();
  }
  ngOnInit() {
    let error = this.route.snapshot.paramMap.get('error');;
    if (parseInt(error) == 404) {
      const fileNotFoundRef = this.dialog.open(MessageDialogComponent, {
        data: {
          message: 'El reparto para hoy no está!<br> Comunicate con quien maneje el programe y pedile que lo suba!<br> ' +
          'Cuando estés listo recargá la aplicación.',
          buttonText: 'Recargar página'
        },
        disableClose: true
      });
      fileNotFoundRef.afterClosed().subscribe(result => {
        this.router.navigate(['home']);
      });
    }
    this.readRepartoFileService.getReparto().subscribe( data => {
      this.repartidores = this.readRepartoFileService.getRepartidores();
      const cabecera = this.readRepartoFileService.getCabeceraReporte();
      this.nombreParada = cabecera.nombreParada;
      this.fechaListado = cabecera.fechaDeReparto;
      this.ordenamiento = cabecera.orden.replace('ORDENADO POR: ','');
    }, (err) => {
      if (this.readRepartoFileService.noHayArchivo){
        this.router.navigate(['home/404']);
      }
    });
  }
  openDialog(): void {
    const selectDialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        title: '¿Quién sos?',
        options: this.repartidores
      }
    });
    selectDialogRef.afterClosed().subscribe(result => {
      if (result != null) {
          this.selectedRepartidor = result.name;
          this.selectedRepartidorId = result.value;
          if(this.selectedRepartidor.length > 30){
              this.selectedRepartidor = this.selectedRepartidor.substr(0,26) + '...';
          }
      }
    });
  }
  startReparto(){
    if(this.selectedRepartidorId != null) {
      this.readRepartoFileService.setRepartidorId(this.selectedRepartidorId);
      this.readRepartoFileService.setIndexEdificio(0);
      this.anim = true;
      // Timer (wait until animation ended to navigate)
      var goOn = true;
      Observable.interval(1500)
        .takeWhile(() => goOn)
        .subscribe(i => {
          this.router.navigate(['detalle-reparto']);
          goOn = false;
        });
    } else {
      this.repartidorNotSelected();
    }
  }
  repartidorNotSelected() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        message: 'No sabemos quién sos!<br> Elegí un repartidor para continuar',
        buttonText: 'Entendido'
      }
    });
  }
}
