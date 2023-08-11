import { Component, OnInit } from '@angular/core';
import { PatrullajeService } from '../../grupos/services/patrullaje.service';
import { MatTableDataSource } from '@angular/material/table';

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
  colum_patru: string[] = ['turno', 'unidad', 'tipo_uni', 'num_sere'];
  clickedFilas: PatrullajeDetails[] = [];
  patrullajes: MatTableDataSource<PatrullajeDetails>;

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
        console.log(res_patru);
      });
  }
}
