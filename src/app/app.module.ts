import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatMenuModule, MatSelectModule,
  MatInputModule, MatFormFieldModule, MatDialogModule, MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {FormsModule} from '@angular/forms';
import {CookieService} from 'angular2-cookie/core';
import { SelectDialogComponent } from './select-repartidor-dialog/select-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    HomeComponent,
    SelectDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // Material Design
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    MatMenuModule, MatSelectModule, FormsModule, MatInputModule,
    MatFormFieldModule, MatDialogModule, MatListModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [SelectDialogComponent]
})
export class AppModule {
  constructor(private _cookieService:CookieService){}
}
