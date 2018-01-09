import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DetalleRepartoComponent} from './components/detalle-reparto/detalle-reparto.component';

const routes: Routes = [
  {path: '' , component: LoginComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'detalle-reparto' , component: DetalleRepartoComponent}
];
export const routableComponents = [
  LoginComponent,
  HomeComponent,
  DetalleRepartoComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

