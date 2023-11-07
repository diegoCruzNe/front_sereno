import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { SerenosService } from '../services/serenos.service';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addedit-serenos',
  templateUrl: './addedit-serenos.component.html',
  styleUrls: ['./addedit-serenos.component.css'],
})
export class AddeditSerenosComponent implements OnInit {
  form: UntypedFormGroup;
  fechaHoy = new Date();
  flag: boolean = false; /* True = Agregar | False = Editar */

  constructor(
    private fb: UntypedFormBuilder,
    private serenoService: SerenosService,
    private router: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.form = fb.group({
      dni: ['', [Validators.required]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      celular: [''],
      correo: [''],
      direccion: [''],
      nacimiento: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      this.flag = true;
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.serenoService.getSerenoById(id)))
      .subscribe((sereno: any) => {
        const fecha = new Date(sereno.nacimiento);

        this.form.patchValue({
          dni: sereno.dni,
          nombre: sereno.nombre,
          apellidos: sereno.apellidos,
          genero: sereno.genero === 1 ? '1' : '0',
          celular: sereno.celular,
          correo: sereno.correo,
          direccion: sereno.direccion,
          nacimiento: new Date(
            fecha.getTime() + Math.abs(fecha.getTimezoneOffset() * 60000)
          ),
        });
      });
  }

  addEditSereno() {
    const sereno: Sereno = {
      dni: this.form.value.dni.toString(),
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      genero: Number(this.form.value.genero),
      celular: this.form.value.celular,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      nacimiento: this.datePipe.transform(
        this.form.value.nacimiento.toString(),
        'yyyy-MM-dd'
      )!,
    };

    if (this.flag) {
      this.serenoService.addSereno(sereno).subscribe({
        next: (res) => {
          this.snackBar.open('Sereno agregado 👍', 'Ok', { duration: 2000});
          setTimeout( () => this.router.navigate(['./serenazgo/serenos/list']), 2500 );
        },
        error: (err) => console.log(err),
      });
    } else {
      this.activatedRoute.params
        .pipe(
          switchMap(({ id }) => this.serenoService.updateSerenoById(id, sereno))
        )
        .subscribe({
          next: (res) => {
            this.snackBar.open('Sereno editado 😀', 'Ok', { duration: 2000});
            setTimeout( () => this.router.navigate(['./serenazgo/serenos/list']), 2500 );
          },
          error: (err) => console.log(err),
        });
    }
  }

  btnCancelar() {
    this.router.navigate(['./serenazgo/serenos/list']);
  }

}
