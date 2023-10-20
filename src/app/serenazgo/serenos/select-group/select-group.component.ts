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
import {MatSnackBar} from '@angular/material/snack-bar';

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
  fk_patrullaje: number | null = null;


  constructor(
    private patrullajeService: PatrullajeService,
    private activatedRoute: ActivatedRoute,
    private serenosService: SerenosService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
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
            this.fk_patrullaje = sereno.fk_patrullaje || null;
            this.sereno = sereno;
          }
        },
      });
  }

  savePatrullaje(arreglo: any){
    this.serenosService
      .updateSerenoPatrullaje(
        arreglo[arreglo.length - 1].id_patrullaje,
        this.id_sereno
      )
      .subscribe({
        next: (res: any) => {
          if (res.ok) {
            this.snackBar.open('Actualizado 😀', 'Ok');
            setTimeout(() => {
              this.router.navigate(['/serenazgo/serenos/list']);
            }, 1000);
          }
        },
      });
  }

  savePatrullajeSinPatrullaje(){
    this.serenosService
      .updateSerenoPatrullaje(null, this.id_sereno)
      .subscribe({
        next: (res: any) => {
          if (res.ok) {
            this.snackBar.open('Actualizado 😀', 'Ok');
            setTimeout(() => {
              this.router.navigate(['/serenazgo/serenos/list']);
            }, 1000);
          }
        },
      });
  }
}
