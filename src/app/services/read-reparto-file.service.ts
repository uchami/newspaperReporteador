import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IReparto} from '../interfaces/IReparto';
import {CookieOptionsArgs, CookieService} from 'angular2-cookie/core';
import {LoginService} from './login.service';

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

  constructor(private http: HttpClient, private cookieService: CookieService, private loginService: LoginService) {
  }

  addDays(date, days) {
    const one_day = 1000 * 60 * 60 * 24;
    return new Date(date.getTime() + (days * one_day));
  }

  getReparto(forceLoad: boolean = false): Observable<IReparto> {
    let obs: Observable<IReparto>;
    const localReparto = JSON.parse(localStorage.getItem('reparto'));
    if (localReparto && this.repartoIsValid(localReparto) && !forceLoad) {
      obs = Observable.of(localReparto);
      this.reparto = localReparto;
    } else {
      const today = new Date();
      const month = (today.getMonth() + 1) < 10 ? ('0' + (today.getMonth() + 1) ) : (today.getMonth() + 1);
      const date = today.getDate() < 10 ? ('0' + today.getDate()) : today.getDate();
      
      let fileName = '';
      if(this.loginService.getCurrentUser().id == 1){
        fileName = 'R20190420ABCDEFGHIJKLMNOPQRSTUV.Txt';
      }
      else{
        
        fileName += 'R';
        fileName += '' + today.getFullYear() + month + date;
        fileName += this.loginService.getCurrentUser().identificacion;
        fileName += '.Txt';
      }

      
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type','application/x-www-form-urlencoded');
      obs = this.http.get<IReparto>("http://listadodereparto.lss.com.ar/repartoAPI/obtenerReparto.php?identifier=" + fileName , {headers: headers});
      obs.subscribe(data => {
          this.reparto = data;
          localStorage.setItem('reparto', JSON.stringify(data));
        },
        (err) => {
          if (err.status == 404) {
            this.reparto = null;
            this.noHayArchivo = true;
          } else {
            if (localReparto && this.repartoIsValid(localReparto)) {
              this.reparto = localReparto;
              this.noHayArchivo = false;
            } else {
              this.reparto = null;
              this.noHayArchivo = false;
            }
          }
        });
    }
    return obs;
  }

  repartoIsValid(reparto) {
    const fechaReparto = reparto.cabeceraReporte.fechaDeReparto.split('/');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let dateReparto = new Date(fechaReparto[2], fechaReparto[1] - 1, fechaReparto[0]);
    return ((today.getDate() == dateReparto.getDate()) && (today.getMonth() == dateReparto.getMonth()) && (today.getFullYear() == dateReparto.getFullYear()));
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
      res.push({'name': edificios[i].direccion, 'value': i});
    }
    this.lengthEdificios = edificios.length;
    return res;
  }

  getCabeceraReporte() {
    return this.reparto.cabeceraReporte;
  }

  getRepartidorId() {
    if (this.repartidorId != null) {
    } else if (this.cookieService.get('repartidorId').length > 0) {
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
    if (this.indexEdificio != null) {
    } else if (this.cookieService.get('indexEdificio').length > 0) {
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
    if (this.indexEdificio >= this.lengthEdificios){
      this.indexEdificio--;
    }
    this.cookieService.remove('indexEdificio');
    this.cookieService.put('indexEdificio', this.indexEdificio.toString(), this.opts);
  }
  setPrevIndexEdificio() {
    this.indexEdificio--;
    if (this.indexEdificio < 0){
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
    return this.reparto.cuerpoReporte.repartidores.find(r => r.repartidorId == repId);
  }
  getTotalesPorRepartidor(repId) {
    return this.getRepartidorById(repId).totalesRepartidor;
  }
  getRepartidorName(repId) {
    const rep = this.getRepartidorById(repId);
    if (rep != null){
      return rep.nombreRepartidor;
    } else {
      return null;
    }
  }
  incluyeTotalesEdificio() {
    return (this.reparto.cabeceraReporte.incluyeTotalesEdificio == 1);
  }
}


