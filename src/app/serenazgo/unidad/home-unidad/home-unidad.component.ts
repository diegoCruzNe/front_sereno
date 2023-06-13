import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogaddeditComponent } from '../dialogaddedit/dialogaddedit.component';

@Component({
  selector: 'app-home-unidad',
  templateUrl: './home-unidad.component.html',
  styleUrls: ['./home-unidad.component.css'],
})
export class HomeUnidadComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogaddeditComponent, {
      width: '350px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(console.log);
  }
}
