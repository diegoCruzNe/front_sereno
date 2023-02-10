import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { SerenosService } from '../services/serenos.service';

@Component({
  selector: 'app-addedit-serenos',
  templateUrl: './addedit-serenos.component.html',
  styleUrls: ['./addedit-serenos.component.css'],
})
export class AddeditSerenosComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serenoService: SerenosService,
    private router: Router
  ) {
    this.form = fb.group({
      dni: ['', [Validators.required]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      genero: ['', Validators.required],
      celular: [''],
      correo: [''],
      direccion: [''],
      nacimiento: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  addEditSereno() {
    const sereno: Sereno = {
      dni: this.form.value.dni,
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      genero: this.form.value.genero,
      celular: this.form.value.celular,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      nacimiento: this.form.value.nacimiento,
    };

    console.log(sereno);
    console.log(this.form.invalid);
  }

  btnCancelar() {
    this.router.navigate(['./serenazgo/serenos/list']);
  }
}
