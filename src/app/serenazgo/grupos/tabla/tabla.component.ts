import { Component, Input, OnInit, OnChanges, ViewChild  } from '@angular/core';
import { PatrullajeService } from '../services/patrullaje.service';
import { getPatrullaje } from 'src/app/interfaces/getPatrullaje.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css'],
})
export class TablaComponent implements OnInit, OnChanges {
  @Input() filtrado!: string;
  fuentaData: MatTableDataSource<getPatrullaje>;
  @ViewChild(MatPaginator) paginacion!: MatPaginator;
  @ViewChild(MatSort) ordenar!: MatSort;
  columnas = ['tipo_unidad', 'placa', 'descripcion', 'turno', 'estado', 'num_ser'];

  constructor(private patrullajeService: PatrullajeService) {
    this.fuentaData = new MatTableDataSource();
  }

  ngOnInit() {}

  ngOnChanges(changes: any) {
    if (changes.filtrado.currentValue === '1') {} 
    else if (changes.filtrado.currentValue === '2') {} 
    else {
      this.patrullajeService.getPatrullaje().subscribe({
        next: (listPatru: getPatrullaje[]) => {
          this.fuentaData.data = listPatru;
          this.fuentaData.paginator = this.paginacion;
          this.fuentaData.sort = this.ordenar;
          this.paginacion._intl.itemsPerPageLabel = 'Patrullajes';
        },
        error: (err) => console.log(err),
      });
    }
  }
}
