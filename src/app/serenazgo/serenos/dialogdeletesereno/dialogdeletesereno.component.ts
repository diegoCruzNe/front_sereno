import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogdeletesereno',
  templateUrl: './dialogdeletesereno.component.html',
  styleUrls: ['./dialogdeletesereno.component.css'],
})
export class DialogdeleteserenoComponent {
  constructor(public dialogRef: MatDialogRef<DialogdeleteserenoComponent>) {}
}
