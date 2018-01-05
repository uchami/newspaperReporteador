import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {ComponentNamer} from '../app.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SelectDialogComponent} from '../select-repartidor-dialog/select-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentNamer implements OnInit {

  constructor(public dialog: MatDialog) { super(); }
  anim = false;
  selectedRepartidor = null;
  repartidores = [{"name":"Braian", "value": 0},
    {"name":"Juan", "value": 1},
    {"name":"Pedro", "value": 2},
    {"name":"Pepe", "value": 3},
    {"name":"En parada", "value": 4},
    {"name":"Juanchi", "value": 5},
    {"name":"El de la bici", "value": 6},
    {"name":"Jose", "value": 7},
    {"name":"Jose", "value": 8},
    {"name":"Jose", "value": 9},
    {"name":"Jose", "value": 10},
    {"name":"Jose", "value": 11},
    {"name":"Jose", "value": 12},
    {"name":"Jose", "value": 13},
    {"name":"Jose", "value": 14},
    {"name":"Jose", "value": 15},
    {"name":"Jose", "value": 16},
    {"name":"Jose", "value": 17},
    {"name":"Jose", "value": 18},
    {"name":"Jose", "value": 19},
    {"name":"Jose", "value": 20},
    {"name":"Jose", "value": 21}];
  ngOnInit() {
  }
  openDialog(): void {
    let selectDialogRef = this.dialog.open(SelectDialogComponent, {
      data: {
        title: "¿Quién sos?",
        options: this.repartidores
      }
    });
    selectDialogRef.afterClosed().subscribe(result => {
      if(result != null) this.selectedRepartidor = this.repartidores.find(r => r.value == result).name;
    });
  }

}
