import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UnidadService } from '../services/unidad.service';
import Swal from 'sweetalert2';
import { Unidad } from 'src/app/interfaces/unidad.interface';

@Component({
  selector: 'app-dialogaddedit',
  templateUrl: './dialogaddedit.component.html',
  styleUrls: ['./dialogaddedit.component.css'],
})
export class DialogaddeditComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private unidadService: UnidadService,
    public dialogRef: MatDialogRef<DialogaddeditComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any
  ) {
    this.form = this.fb.group({
      // /^[A-Za-z]{3}\d{3}$/
      placa: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}\d{3}$/)],],
      estado: ['', Validators.required],
      tipo_unidad: ['', Validators.required],
      descripcion: [''],
    });
  }

  ngOnInit() {
    if (this.data.id === undefined) return;
    else {
      this.unidadService.getUnidadPorId(this.data.id).subscribe({
        next: (unidad) => {
          this.form.patchValue({
            placa: unidad[0].placa,
            estado: unidad[0].estado ? '0' : '1',
            tipo_unidad: unidad[0].fk_tipo_unidad.toString(),
            descripcion: unidad[0].descripcion,
          });
        },
      });
    }
  }

  addEditUnidad() {
    if (this.data.id) {
      // Actualizar unidad
      const unidad = {
        placa: this.form.value.placa,
        desc: this.form.value.descripcion,
        estado: parseInt(this.form.value.estado) === 1 ? 0 : 1,
        tipo_uni: parseInt(this.form.value.tipo_unidad),
      };
      this.unidadService.actualizarUnidad(unidad, this.data.id).subscribe({
        next: (res: { ok: string; unidad: Unidad }) => {
          Swal.fire({
            position: 'center', icon: 'success', title: 'Editado', showConfirmButton: false, timer: 1300
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error', title: 'Oops...', text: `${err.error.msg}` || 'Ocurrió un error'
          });
        },
      });
    } else {
      // Crear unidad
      const { descripcion, estado, placa, tipo_unidad } = this.form.value;
      const unidad = {
        placa, desc: descripcion, estado: parseInt(estado), tipo_uni: parseInt(tipo_unidad),
      };

      this.unidadService.crearUnidad(unidad).subscribe({
        next: (res) => {
          this.dialogRef.close(true);
          Swal.fire({
            position: 'center', icon: 'success', title: 'Guardado con éxito', showConfirmButton: false, timer: 2000,
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error', title: 'Oops...', text: `${err.error.msg}` || 'Ocurrió un error',
          });
        },
      });
    }
  }
}
