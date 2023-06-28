import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DialogaddeditComponent } from '../dialogaddedit/dialogaddedit.component';
import { DialogaddeditService } from '../services/dialogaddedit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-unidad',
  templateUrl: './home-unidad.component.html',
  styleUrls: ['./home-unidad.component.css'],
})
export class HomeUnidadComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogaddeditService: DialogaddeditService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog
      .open(DialogaddeditComponent, {
        width: '300px',
        height: '470px',
        disableClose: true,
        data: { id: undefined, badge: false },
      })
      .afterClosed()
      .subscribe(res =>{
        if (res) {
          this.recargarOutlet();
          return
        }
      });
     //dialogRef.afterClosed().subscribe((res) => {});
  }

  recargarOutlet() {
    setTimeout(() => {
      this.router
      .navigateByUrl('/serenazgo/serenos/list', { skipLocationChange: true }) 
      .then(() => this.router.navigate(['/serenazgo/unidades/list']));
    }, 1900);
    
  }
}
