import {  Component, OnInit, ViewChild } from '@angular/core';

import { SerenosService } from '../services/serenos.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Police } from 'src/app/interfaces/police.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DialogdeleteserenoComponent } from '../dialogdeletesereno/dialogdeletesereno.component';

@Component({
  selector: 'app-list-serenos',
  templateUrl: './list-serenos.component.html',
  styleUrls: ['./list-serenos.component.css'],
})
export class ListSerenosComponent implements OnInit {
  columnas = [
    'nombre',
    'apellidos',
    'genero',
    'edad',
    'iconos',
    'fk_patrullaje',
    'imagen',
  ];
  dataSource: MatTableDataSource<Police>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serenoService: SerenosService, public dialog: MatDialog, private snackBar: MatSnackBar,) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listarSerenos();
  }


  listarSerenos() {
    this.serenoService.getSerenos().subscribe((serenos) => {
      this.dataSource.data = serenos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogdeleteserenoComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.serenoService.deleteSerenoById(id).subscribe({
          next: (resp) => {
            this.snackBar.open('Sereno eliminado 👍', 'Ok', { duration: 3000 });
            this.listarSerenos();
          },
          error: (err) => console.error(err),
        })
      }
    });
  }
}
