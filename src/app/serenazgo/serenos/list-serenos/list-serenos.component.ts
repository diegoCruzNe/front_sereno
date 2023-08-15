import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { SerenosService } from '../services/serenos.service';

import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatSort, Sort } from '@angular/material/sort';
import { Police } from 'src/app/interfaces/police.interface';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-serenos',
  templateUrl: './list-serenos.component.html',
  styleUrls: ['./list-serenos.component.css'],
})
export class ListSerenosComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'apellidos', 'genero', 'edad', 'iconos', 'fk_patrullaje', 'imagen'];
  dataSource: MatTableDataSource<Police>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serenoService: SerenosService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listarSerenos();
  }

  ngAfterViewInit(): void {}

  listarSerenos() {
    this.serenoService.getSerenos().subscribe((serenos) => {
      console.log(serenos);
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

  eliminar(id: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'No podrás revertir los cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        //Swal.fire('Eliminado!', 'El sereno fue eliminado.', 'success');
        this.serenoService.deleteSerenoById(id).subscribe({
          next: (resp) => {
            Swal.fire('Eliminado!', 'El sereno fue eliminado.', 'success');
            this.listarSerenos();
          },
          error: (err) => console.error(err),
        });
      }
    });
  }
}
