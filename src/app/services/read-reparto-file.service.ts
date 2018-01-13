import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {IReparto} from '../interfaces/IReparto';
import {CookieService} from 'angular2-cookie/core';

@Injectable()
export class ReadRepartoFileService {

  reparto : IReparto;
  repartidorId : number;
  indexEdificio : number;
  lengthEdficios: number;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }
  getReparto(): Observable<any> {
    var obs = this.http.get<IReparto>("./assets/files/ListadoDeReparto2.Txt");
    obs.subscribe(data => {
      this.reparto = data;
    });
    return obs;
  }

  getRepartidores() {
    var res = [];
    var repartidores = this.reparto.cuerpoReporte.repartidores;
    for (var i = 0; i <  repartidores.length; i++){
     res.push({"name":repartidores[i].nombreRepartidor, "value": repartidores[i].repartidorId});
   }
   return res;
  }

  getEdificios() {
    var repId = this.getRepartidorId();
    var res = [];
    console.log(this.reparto.cuerpoReporte.repartidores.find(r => r.repartidorId == repId));
    var edificios = this.reparto.cuerpoReporte.repartidores.find(r => r.repartidorId == repId).edificios;
    for (var i = 0; i <  edificios.length; i++){
      res.push({"name":edificios[i].direccion, "value": i});
    }
    this.lengthEdficios = edificios.length;
    return res;
  }

  getCabeceraReporte() {
    return this.reparto.cabeceraReporte;
  }

  getRepartidorId(){
    if(this.repartidorId != null){
    } else if(this.cookieService.get("repartidorId").length > 0) {
      this.repartidorId = parseInt(this.cookieService.get("repartidorId"));
    }
    return this.repartidorId;
  }
  setRepartidorId(id:number){
    this.repartidorId = id;
    this.cookieService.remove("repartidorId");
    this.cookieService.put("repartidorId", id.toString());
  }

  getIndexEdificio(){
    if(this.indexEdificio != null){
    } else if(this.cookieService.get("indexEdificio").length > 0) {
      this.indexEdificio = parseInt(this.cookieService.get("indexEdificio"));
    } else {
      this.indexEdificio = 0;
    }
    return this.indexEdificio;
  }
  setIndexEdificio(index:number){
    this.indexEdificio = index;
    this.cookieService.remove("indexEdificio");
    this.cookieService.put("indexEdificio", index.toString());
  }
  setNextIndexEdificio(){
    this.indexEdificio++;
    if(this.indexEdificio >= this.lengthEdficios){
      this.indexEdificio--;
    }
    this.cookieService.remove("indexEdificio");
    this.cookieService.put("indexEdificio", this.indexEdificio.toString());
  }
  setPrevIndexEdificio(){
    this.indexEdificio--;
    if(this.indexEdificio < 0){
      this.indexEdificio = 0;
    }
    this.cookieService.remove("indexEdificio");
    this.cookieService.put("indexEdificio", this.indexEdificio.toString());
  }

  getEdificioActual(){
    var repId = this.getRepartidorId();
    var indexEd = this.getIndexEdificio();
    var edActual = Object.create(this.reparto.cuerpoReporte.repartidores.find(r => r.repartidorId == repId).edificios[indexEd]);
    var direc = edActual.direccion;
    direc = direc.slice(0, direc.lastIndexOf(" "));
    edActual.direccion = direc + edActual.direccion.replace(direc, "").bold();
    return edActual;
  }
}


