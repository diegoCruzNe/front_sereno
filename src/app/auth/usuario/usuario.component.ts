import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
})
export class UsuarioComponent implements OnInit {
  hide1 = true;
  hide2 = true;
  startDate = new Date(1990, 0, 1);
  enviado = false;

  public registro = this.fb.group(
    {
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      nacimiento: ['', Validators.required],
      contrasena: ['', Validators.required],
      contrasena2: ['', Validators.required],
      direccion: [''],
      correo: [''],
      telefono: ['', [Validators.pattern('^[0-9]*$')]], 
      sexo: ['', Validators.required],
      adicional: [''],
    },
    { validators: this.validarPassword } 
  );

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerUser() {
    this.enviado = true;
    if (this.registro.invalid) {
      return;
    }

    const registroDudlicado = { ...this.registro.value };
    // Backend = MM-DD-YYYY
    registroDudlicado.nacimiento = this.datePipe.transform(registroDudlicado.nacimiento.toString(),'MM-dd-yyyy'); 

    /* this.loginService.crearUsuario(registroDudlicado).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),  
      complete: () => console.log('Obs completado'),
    }); */
  }

  validarPassword(form: FormGroup) {
    const pass1 = form.get('contrasena');
    const pass2 = form.get('contrasena2');

    if (pass1?.value === pass2?.value) {pass2?.setErrors(null)} 
    else {pass2?.setErrors({ passNotMatch: true })}
  }

  alertaOk(mensaje: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `${mensaje}`,
      showConfirmButton: false,
      timer: 1500,
    }).then(() => this.router.navigate(['./serenazgo']));
  }
}
