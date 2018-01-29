import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {EventEmitter, NgModule} from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatSelectModule,
  MatInputModule, MatFormFieldModule, MatDialogModule, MatListModule,
  MatTableModule
} from '@angular/material';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import { SelectDialogComponent } from './components/select-repartidor-dialog/select-dialog.component';
import {ReadRepartoFileService} from './services/read-reparto-file.service';
import {HttpClientModule} from '@angular/common/http';
import {DetalleRepartoComponent } from './components/detalle-reparto/detalle-reparto.component';
import {DetalleEdificioComponent } from './components/detalle-edificio/detalle-edificio.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TotalesComponent } from './components/totales/totales.component';
import {FinalRepartoComponent} from './components/final-reparto/final-reparto.component';
import {MessageDialogComponent } from './components/message-modal/message-dialog.component';
import { TotalesDelRepartidorComponent } from './components/totales-del-repartidor/totales-del-repartidor.component';
import {AuthGuard} from './_guards';
import {LoginService} from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    HomeComponent,
    SelectDialogComponent,
    DetalleRepartoComponent,
    DetalleEdificioComponent,
    TotalesComponent,
    FinalRepartoComponent,
    MessageDialogComponent,
    TotalesDelRepartidorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    // Material Design
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    MatMenuModule, MatSelectModule, FormsModule, MatInputModule,
    MatFormFieldModule, MatDialogModule, MatListModule, MatTableModule
  ],
  providers: [CookieService, ReadRepartoFileService, HttpClientModule, DetalleEdificioComponent, AuthGuard, LoginService],
  bootstrap: [AppComponent],
  entryComponents: [SelectDialogComponent, MessageDialogComponent]
})

export class AppModule {
  constructor() {}
}
