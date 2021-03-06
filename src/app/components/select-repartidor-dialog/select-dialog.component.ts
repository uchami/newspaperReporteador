import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ComponentNamer} from '../../app.component';

@Component({
  selector: 'app-select-dialog',
  templateUrl: './select-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./select-dialog.component.css']
})
export class SelectDialogComponent extends ComponentNamer implements OnInit {

  options = [];
  title = "";
  selectedOptions;

  constructor(public dialogRef: MatDialogRef<SelectDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    this.title = data.title;
    this.options = data.options;
  }

  ngOnInit() {
  }
  closeModal(){
    this.selected(null);
  }

  selected(value){
    this.dialogRef.close(value);
  }
}
