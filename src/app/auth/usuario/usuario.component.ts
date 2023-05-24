import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../services/login.service';

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

  registro2 = new FormGroup(
    {
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
      contrasena2: new FormControl('', Validators.required),
      direccion: new FormControl(''),
      correo: new FormControl(''),
      telefono: new FormControl(''),
      sexo: new FormControl('', Validators.required),
      adicional: new FormControl(''),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  public registro = this.fb.group(
    {
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nacimiento: ['', Validators.required],
      contrasena: ['', Validators.required],
      contrasena2: ['', Validators.required],
      direccion: [''],
      correo: [''],
      telefono: [],
      sexo: ['', Validators.required],
      adicional: [''],
    },
    {
      validators: this.validarPassword,
    }
  );

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {}

  registerUser() {
    this.enviado = true;
    if (this.registro.invalid) {
      return;
    }
    console.log('pasa formulario ok');
    console.log(this.registro.value);

    const register2 = { ...this.registro.value };
    console.log(register2);

    /* this.loginService.crearUsuario(this.registro.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => console.log(err),
      complete: () => console.log('Obs completado'),
    }); */
  }

  passwordMatchValidator(data: any) {
    const pass1 = data.get('contrasena');
    const pass2 = data.get('contrasena2');

    if (pass1?.value === pass2?.value) {
      pass2?.setErrors(null);
    } else {
      pass2?.setErrors({ passNotMatch: true });
    }
  }

  validarPassword(form: FormGroup) {
    const pass1 = form.get('contrasena');
    const pass2 = form.get('contrasena2');

    if (pass1?.value === pass2?.value) {
      pass2?.setErrors(null);
    } else {
      pass2?.setErrors({ passNotMatch: true });
    }
  }
}
