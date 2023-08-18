import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PatrullajeService } from '../../grupos/services/patrullaje.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SerenosService } from '../services/serenos.service';
import { Police } from 'src/app/interfaces/police.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

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
  sereno!: any;
  form: FormGroup;
  id_sereno!: number;

  constructor(
    private patrullajeService: PatrullajeService,
    private activatedRoute: ActivatedRoute,
    private serenosService: SerenosService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.patrullajes = new MatTableDataSource();
    this.form = fb.group({
      fk_patrullaje: [''],
    });
  }

  ngOnInit() {
    this.getDataSereno();
    this.getPatrullajesDet();
  }

  getPatrullajesDet() {
    this.patrullajeService
      .getPatrullajeDetalles()
      .subscribe((res_patru: PatrullajeDetails[]) => {
        // console.log(res_patru)
        this.patrullajes.data = res_patru;
        this.patrullajes.sort = this.sort;
        this.patrullajes.paginator = this.paginator;
      });
  }

  getDataSereno(){
    this.activatedRoute.params
      .pipe(
        tap((val: any) => this.id_sereno = val.id),
        switchMap((par: Params) => this.serenosService.getSerenoById(par['id'])),
      )
      .subscribe({
        next: (sereno: Police) => {
          if (!sereno) this.router.navigate(['/serenazgo/serenos/addgroup']);
          else {
            // console.log(sereno);
            this.sereno = sereno;
          }
        },
      });
  }

  savePatrullaje(arreglo: any){
    // console.log(arreglo[arreglo.length  - 1].id_patrullaje);
    this.serenosService.updateSerenoPatrullaje(
      arreglo[arreglo.length - 1].id_patrullaje,
      this.id_sereno
    ).subscribe({
      next: (res) => {
        // TODO 
      }
    });
  }
}
