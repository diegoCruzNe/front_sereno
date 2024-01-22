import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-ubication',
  templateUrl: './dialog-ubication.component.html',
  styleUrls: ['./dialog-ubication.component.css'],
})
export class DialogUbicationComponent {
  constructor(public dialogRef: MatDialogRef<DialogUbicationComponent>) {}
}
