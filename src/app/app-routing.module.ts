import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DetalleRepartoComponent} from './components/detalle-reparto/detalle-reparto.component';
import {TotalesComponent} from './components/totales/totales.component';
import {FinalRepartoComponent} from './components/final-reparto/final-reparto.component';
import {TotalesDelRepartidorComponent} from './components/totales-del-repartidor/totales-del-repartidor.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login' , component: LoginComponent, data: { state: 'login' }},
  {path: 'home' , component: HomeComponent, data: { state: 'home' }},
  {path: 'home/:error' , component: HomeComponent, data: { state: 'home' }},
  {path: 'detalle-reparto' , component: DetalleRepartoComponent, data: { state: 'detalle-reparto' }},
  {path: 'totales-del-repartidor/:repId' , component: TotalesDelRepartidorComponent, data: { state: 'totales-del-repartidor' }},
  {path: 'final-reparto' , component: FinalRepartoComponent, data: { state: 'final-reparto' }}
];
export const routableComponents = [
  LoginComponent,
  HomeComponent,
  DetalleRepartoComponent,
  TotalesDelRepartidorComponent,
  FinalRepartoComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



