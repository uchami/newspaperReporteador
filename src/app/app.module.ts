import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, MatMenuModule, MatSelectModule,
        MatInputModule, MatFormFieldModule } from '@angular/material';

import { AppComponent } from './app.component';
import {AppRoutingModule, routableComponents} from './app-routing.module';
import { HomeComponent } from './home/home.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    routableComponents,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    // Material Design
    BrowserAnimationsModule, MatButtonModule, MatCheckboxModule,
    MatMenuModule, MatSelectModule, FormsModule, MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }