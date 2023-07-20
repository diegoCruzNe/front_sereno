import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../services/turnos.service';
import { UnidadService } from '../services/unidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      turno: ['', [Validators.required]],
      unidad: ['', [Validators.required]],
      descripcion: [''],
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
    // this.form.get('unidad').reset('');
    this.form.get('unidad')?.reset('');
    if (selectedValue) {
      this.form.get('unidad')?.enable();
    }
    this.unidadService
      .getUnidadesAvailables(selectedValue)
      .subscribe((unidades) => (this.arr_unidades = unidades));
  }

  addPatrullaje(){
    console.log(this.form.value);
  }
}
