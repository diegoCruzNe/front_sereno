import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PatrullajeService } from '../../grupos/services/patrullaje.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface PatrullajeDetails {
  id_patrullaje: number;
  descripcion: null | string;
  turno: string;
  tipo_unidad: string;
  placa: string;
  fecha_creacion: string;
  num_sere: number;
}

@Component({
  selector: 'app-select-group',
  templateUrl: './select-group.component.html',
  styleUrls: ['./select-group.component.css'],
})
export class SelectGroupComponent implements OnInit {
  colum_patru: string[] = ['num_sere', 'turno', 'placa', 'tipo_unidad'];
  clickedFilas: PatrullajeDetails[] = [];
  patrullajes: MatTableDataSource<PatrullajeDetails>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private patrullajeService: PatrullajeService) {
    this.patrullajes = new MatTableDataSource();
  }

  ngOnInit() {
    this.getPatrullajesDet();
  }

  getPatrullajesDet() {
    this.patrullajeService
      .getPatrullajeDetalles()
      .subscribe((res_patru: PatrullajeDetails[]) => {
        this.patrullajes.data = res_patru;
        this.patrullajes.sort = this.sort;
        this.patrullajes.paginator = this.paginator;
      });
  }
}
