import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DetalleRepartoComponent} from './components/detalle-reparto/detalle-reparto.component';
import {TotalesComponent} from './components/totales/totales.component';
import {FinalRepartoComponent} from './components/final-reparto/final-reparto.component';


const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'home/:error' , component: HomeComponent},
  {path: 'detalle-reparto' , component: DetalleRepartoComponent},
  {path: 'totales' , component: TotalesComponent},
  {path: 'final-reparto' , component: FinalRepartoComponent}
];
export const routableComponents = [
  LoginComponent,
  HomeComponent,
  DetalleRepartoComponent,
  TotalesComponent,
  FinalRepartoComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

