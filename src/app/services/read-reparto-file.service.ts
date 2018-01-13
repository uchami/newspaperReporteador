import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {IReparto} from '../interfaces/IReparto';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';

@Injectable()
export class ReadRepartoFileService {

  reparto: IReparto;
  noHayArchivo = false;
  repartidorId: number;
  indexEdificio: number;
  opts: CookieOptionsArgs = {
    expires: this.addDays(new Date(), 15)
  };

  addDays(date, days) {
    const one_day = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + (days * one_day));
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  getReparto(): Observable<any> {
    const obs = this.http.get<IReparto>('./assets/files/ListadoDeReparto15.txt');
    obs.subscribe(data => {
      console.log(data);
      this.reparto = data;
    },
    (err) => {
      if (err.status == 404) {
        this.reparto = null;
        this.noHayArchivo = true;
      }
      console.log(err);
    });
    return obs;
  }

  getRepartidores() {
    const res = [];
    const repartidores = this.reparto.cuerpoReporte.repartidores;
    for (let i = 0; i <  repartidores.length; i++) {
     res.push({'name': repartidores[i].nombreRepartidor, 'value': repartidores[i].repartidorId});
   }
   return res;
  }

  getEdificios() {
    const repId = this.getRepartidorId();
    const res = [];
    const edificios = this.reparto.cuerpoReporte.repartidores.find(r => r.repartidorId == repId).edificios;
    for (let i = 0; i <  edificios.length; i++) {
      res.push({'name': edificios[i].direccion, 'value': i});
    }
    return res;
  }

  getCabeceraReporte() {
    return this.reparto.cabeceraReporte;
  }

  getRepartidorId() {
    if (this.repartidorId != null) {
    } else if(this.cookieService.get('repartidorId').length > 0) {
      this.repartidorId = parseInt(this.cookieService.get('repartidorId'));
    }
    return this.repartidorId;
  }
  setRepartidorId(id: number) {
    this.repartidorId = id;
    this.cookieService.remove('repartidorId');
    this.cookieService.put('repartidorId', id.toString(), this.opts);
  }

  getIndexEdificio() {
    if(this.indexEdificio != null) {
    } else if(this.cookieService.get('indexEdificio').length > 0) {
      this.indexEdificio = parseInt(this.cookieService.get('indexEdificio'));
    } else {
      this.indexEdificio = 0;
    }
    return this.indexEdificio;
  }
  setIndexEdificio(index: number) {
    this.indexEdificio = index;
    this.cookieService.remove('indexEdificio');
    this.cookieService.put('indexEdificio', index.toString(), this.opts);
  }
  setNextIndexEdificio() {
    this.indexEdificio++;
    this.cookieService.remove('indexEdificio');
    this.cookieService.put('indexEdificio', this.indexEdificio.toString(), this.opts);
  }
  setPrevIndexEdificio() {
    this.indexEdificio--;
    this.cookieService.remove('indexEdificio');
    this.cookieService.put('indexEdificio', this.indexEdificio.toString(), this.opts);
  }

  getEdificioActual() {
    const repId = this.getRepartidorId();
    const indexEd = this.getIndexEdificio();
    const edActual = this.reparto.cuerpoReporte.repartidores[repId].edificios[indexEd];
    let direc = edActual.direccion;
    direc = direc.slice(0, direc.lastIndexOf(' '));
    edActual.direccion = direc + edActual.direccion.replace(direc, '').bold();
    return edActual;
  }
}


