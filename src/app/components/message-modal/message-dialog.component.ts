import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MessageDialogComponent implements OnInit {
  message = '';
  buttonText = '';
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.buttonText = data.buttonText;
  }
  ngOnInit() {
  }
  closeModal() {
    this.dialogRef.close();
  }
}
