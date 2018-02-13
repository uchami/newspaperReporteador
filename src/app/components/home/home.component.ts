import {AfterContentInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import {MessageDialogComponent} from '../message-dialog/message-dialog.component';


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


    const predefinedRepId = parseInt(this.route.snapshot.paramMap.get('repId'));
    if(predefinedRepId && predefinedRepId != -1) {
      this.selectedRepartidorId = predefinedRepId;
    }

    let error = this.route.snapshot.paramMap.get('error');
    if (parseInt(error) == 404) {
      setTimeout(() => {
        const fileNotFoundRef = this.dialog.open(MessageDialogComponent, {
          data: {
            title: 'El reparto para hoy no está!<br>',
            message: 'Comunicate con quien maneje el programa y pedile que lo suba.<br> ' +
            'Cuando estés listo recargá la aplicación.',
            buttonText: 'Recargar página'
          }, disableClose: true
        });
        fileNotFoundRef.afterClosed().subscribe(result => {
          localStorage.removeItem('reparto');
          this.router.navigate(['home/'+ predefinedRepId]);
        });
      }, 0);
    }
    else{
      this.readRepartoFileService.getReparto(true).subscribe( data => {
        this.selectedRepartidor = this.readRepartoFileService.getRepartidorName(this.selectedRepartidorId);
        this.repartidores = this.readRepartoFileService.getRepartidores();
        const cabecera = this.readRepartoFileService.getCabeceraReporte();
        this.nombreParada = cabecera.nombreParada;
        this.fechaListado = cabecera.fechaDeReparto;
        this.ordenamiento = cabecera.orden.replace('ORDENADO POR: ','');
      }, (err) => {
        if (this.readRepartoFileService.noHayArchivo){
          this.router.navigate(['home/-1/404']);
        }
      });
    }
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

  goTotalesDelRepartidor() {
    if(this.selectedRepartidorId != null) {
      this.router.navigate(['totales-del-repartidor/' + this.selectedRepartidorId]);
    } else {
      this.repartidorNotSelected();
    }
  }

  repartidorNotSelected() {
    this.dialog.open(MessageDialogComponent, {
      data: {
        title: 'No sabemos quién sos!<br>',
        message: 'Elegí un repartidor para continuar',
        buttonText: 'Entendido'
      }
    });
  }
}
