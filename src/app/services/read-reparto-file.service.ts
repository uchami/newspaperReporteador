import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';
import {IReparto} from '../interfaces/IReparto';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';

@Injectable()
export class ReadRepartoFileService {
  reparto: IReparto;
  noHayArchivo = false;
  repartidorId: number;
  indexEdificio: number;
  lengthEdificios: number;
  opts: CookieOptionsArgs = {
    expires: this.addDays(new Date(), 15)
  };

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  addDays(date, days) {
    const one_day = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + (days * one_day));
  }

  getReparto(): Observable<IReparto> {
    let obs: Observable<IReparto>;
    let localReparto = JSON.parse(localStorage.getItem('reparto'));
    if(localReparto && this.repartoIsValid(localReparto)) {
      obs = Observable.of(localReparto);
      this.reparto = localReparto;
    } else {
      obs = this.http.get<IReparto>('./assets/files/ListadoDeReparto3.Txt');
      obs.subscribe(data => {
          this.reparto = data;
          localStorage.setItem('reparto', JSON.stringify(data));
        },
        (err) => {
          if (err.status == 404) {
            this.reparto = null;
            this.noHayArchivo = true;
          }
        });
    }
    return obs;
  }

  repartoIsValid(reparto) {
    const fechaReparto = reparto.cabeceraReporte.fechaDeReparto.split('/');
    const today = new Date();
    today.setHours(0,0,0,0);
    return ( today == new Date(fechaReparto[2],fechaReparto[1]-1, fechaReparto[0]));
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
    const edificios = this.getRepartidorById(repId).edificios;
    for (let i = 0; i <  edificios.length; i++){
      res.push({"name":edificios[i].direccion, "value": i});
    }
    this.lengthEdificios = edificios.length;
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
    if(this.indexEdificio >= this.lengthEdificios){
      this.indexEdificio--;
    }
    this.cookieService.remove("indexEdificio");
    this.cookieService.put("indexEdificio", this.indexEdificio.toString(), this.opts);
  }
  setPrevIndexEdificio() {
    this.indexEdificio--;
    if(this.indexEdificio < 0){
      this.indexEdificio = 0;
    }
    this.cookieService.remove('indexEdificio');
    this.cookieService.put('indexEdificio', this.indexEdificio.toString(), this.opts);
  }

  getEdificioActual() {
    const repId = this.getRepartidorId();
    const indexEd = this.getIndexEdificio();
    const edActual = Object.create(this.getRepartidorById(repId).edificios[indexEd]);
    let direc = edActual.direccion;
    direc = direc.slice(0, direc.lastIndexOf(' '));
    edActual.direccion = direc + edActual.direccion.replace(direc, '').bold();
    return edActual;
  }
  getRepartidorById(repId) {
    return this.reparto.cuerpoReporte.repartidores.find(r=> r.repartidorId == repId);
  }
  getTotalesPorRepartidor(repId) {
    return this.getRepartidorById(repId).totalesRepartidor;
  }
  getRepartidorName(repId) {
    const rep = this.getRepartidorById(repId);
    if(rep != null){
      return rep.nombreRepartidor;
    } else {
      return null;
    }
  }
}


