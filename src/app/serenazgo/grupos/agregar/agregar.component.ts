import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../services/turnos.service';
import { UnidadService } from '../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatrullajeService } from '../services/patrullaje.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css'],
})

export class AgregarComponent implements OnInit {
  arr_turno: any = [];
  // badge_select: boolean = true;
  arr_unidades: any = [];
  form!: FormGroup;

  constructor(
    private turnoService: TurnosService,
    private unidadService: UnidadService,
    private patrullajeService: PatrullajeService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = fb.group({
      turno: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      desc: [''],
    });
  }

  ngOnInit() {
    this.form.get('unidad')?.disable();
    this.getTurnos();
  }

  getTurnos() {
    this.turnoService
      .getTurnos()
      .subscribe((turnos) => (this.arr_turno = turnos));
  }

  getTurno(selectedValue: any) {
    this.form.get('unidad')?.reset('');
    if (selectedValue) {
      this.form.get('unidad')?.enable();
    }
    this.unidadService
      .getUnidadesAvailables(selectedValue)
      .subscribe((unidades) => (this.arr_unidades = unidades));
  }

  addPatrullaje() {
    this.patrullajeService.newPatrullaje(this.form.value).subscribe({
      next: (res) => {
        this.form.reset();
        this.snackBar.open('Patrullaje agregado 👍', 'Ok', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        let newUnidades = this.arr_unidades.filter(
          (unidad: any) => unidad.id_unidad !== this.form.get('unidad')?.value
        );
        this.arr_unidades = newUnidades;
        this.snackBar.open(`${err.error.msg} ⛔`, 'Ok', { duration: 2000 });
      },
    });
  }
}
