import {Component, Inject, OnInit} from '@angular/core';
import {ComponentNamer} from '../app.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ComponentNamer implements OnInit {

  constructor(public dialog: MatDialog) { super(); }
  anim = false;
  ngOnInit() {
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(SelectRepartidorDialog, {
      width: '250px',
      height: '80vh',
      data: { name: "Elegir repartidor", animal: "a" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      //this.animal = result;
    });
  }

}
@Component({
  selector: 'dialog-select-repartidor',
  templateUrl: 'dialog-select-repartidor.html',
})
export class SelectRepartidorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
