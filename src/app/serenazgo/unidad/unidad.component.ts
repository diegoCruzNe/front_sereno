import { Component, OnInit } from '@angular/core';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { UnidadService } from 'src/app/services/unidad.service';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css'],
})
export class UnidadComponent implements OnInit {
  displayedColumns: string[] = [
    'placa',
    'descripcion',
    'estado',
    'fk_tipo_unidad',
  ];
  datos: Unidad[] = [];
  constructor(private unidadServise: UnidadService) {}

  ngOnInit(): void {
    this.listarUnidades();
  }

  listarUnidades() {
    this.unidadServise.getAllUnidades().subscribe((unid) => {
      this.datos = unid;
    });
  }
}
