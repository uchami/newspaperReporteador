import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DetalleRepartoComponent} from './components/detalle-reparto/detalle-reparto.component';
import {FinalRepartoComponent} from './components/final-reparto/final-reparto.component';
import {TotalesDelRepartidorComponent} from './components/totales-del-repartidor/totales-del-repartidor.component';
import {AuthGuard} from './_guards';
import {Angulartics2Module} from 'angulartics2';
import {Angulartics2GoogleAnalytics} from 'angulartics2/ga';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login' , component: LoginComponent, data: { state: 'login' }},
  {path: 'home' , component: HomeComponent, data: { state: 'home' }, canActivate: [AuthGuard]},
  {path: 'home/:repId' , component: HomeComponent, data: { state: 'home'}, canActivate: [AuthGuard]},
  {path: 'home/:repId/:error' , component: HomeComponent, data: { state: 'home' }, canActivate: [AuthGuard]},
  {path: 'detalle-reparto' , component: DetalleRepartoComponent, data: { state: 'detalle-reparto' }, canActivate: [AuthGuard]},
  {path: 'totales-del-repartidor/:repId' , component: TotalesDelRepartidorComponent, data: { state: 'totales-del-repartidor' }, canActivate: [AuthGuard]},
  {path: 'final-reparto' , component: FinalRepartoComponent, data: { state: 'final-reparto' }, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
export const routableComponents = [
  LoginComponent,
  HomeComponent,
  DetalleRepartoComponent,
  TotalesDelRepartidorComponent,
  FinalRepartoComponent
];

@NgModule({
  imports: [
            RouterModule.forRoot(routes, { useHash: true }),
            Angulartics2Module.forRoot([Angulartics2GoogleAnalytics],{pageTracking: {clearIds: true}})
           ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



