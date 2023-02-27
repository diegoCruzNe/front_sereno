import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { SerenosService } from '../services/serenos.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { Police } from '../../../interfaces/police.interface';

@Component({
  selector: 'app-addedit-serenos',
  templateUrl: './addedit-serenos.component.html',
  styleUrls: ['./addedit-serenos.component.css'],
})
export class AddeditSerenosComponent implements OnInit {
  form: FormGroup;
  fechaHoy = new Date();
  sereno!: Police;

  constructor(
    private fb: FormBuilder,
    private serenoService: SerenosService,
    private router: Router,
    private datePipe: DatePipe,
    private activatedRoute: ActivatedRoute
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
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.serenoService.getSerenoById(id)))
      .subscribe((sereno) => {
        this.sereno = sereno;
        this.form.patchValue({
          dni: this.sereno.dni,
        });
      });
  }

  addEditSereno() {
    const sereno: Sereno = {
      dni: this.form.value.dni.toString(),
      nombre: this.form.value.nombre,
      apellidos: this.form.value.apellidos,
      genero: this.form.value.genero,
      celular: this.form.value.celular,
      correo: this.form.value.correo,
      direccion: this.form.value.direccion,
      nacimiento: this.datePipe.transform(
        this.form.value.nacimiento.toString(),
        'yyyy-MM-dd'
      )!,
    };

    this.serenoService.addSereno(sereno).subscribe({
      next: (res) => {
        if (res) this.form.reset();
        this.alerta();
      },
      error: (err) => console.log(err),
    });
  }

  btnCancelar() {
    this.router.navigate(['./serenazgo/serenos/list']);
  }

  alerta() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Sereno agregado!`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => this.router.navigate(['./serenazgo/serenos/list']));
  }
}
