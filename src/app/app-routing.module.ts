import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DetalleRepartoComponent} from './components/detalle-reparto/detalle-reparto.component';
import {TotalesComponent} from './components/totales/totales.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'detalle-reparto' , component: DetalleRepartoComponent},
  {path: 'totales' , component: TotalesComponent}
];
export const routableComponents = [
  LoginComponent,
  HomeComponent,
  DetalleRepartoComponent,
  TotalesComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

