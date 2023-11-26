import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css'],
})
export class NewUsuarioComponent {
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.formulario = new FormGroup(
      {
        dni: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          this.existsDni,
        ]),
        nombre: new FormControl('', [Validators.required]),
        apellido: new FormControl('', [Validators.required]),
        correo: new FormControl('', [Validators.email]),
        nacimiento: new FormControl('', [Validators.required]),
        direccion: new FormControl(''),
        sexo: new FormControl('masculino', Validators.required),
        telefono: new FormControl(''),
        passFirst: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        passRepeat: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      this.passwordMatchValidator
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passFirst = control.get('passFirst');
    const passRepeat = control.get('passRepeat');

    if (passFirst?.value !== passRepeat?.value) {
      passRepeat?.setErrors({ dontMatch: true });
    } else {
      passRepeat?.setErrors(null);
    }

    return null;
  }

  existsDni = (control: AbstractControl): { [key: string]: boolean } | null => {
    const dni: any = control.value;
    if (dni.length === 8) {
      this.usuariosService.getUserByDni(dni).subscribe((existe) => {
        if (existe.ok) {
          control.setErrors({ dniExists: true });
        } else {
          control.setErrors(null);
        }
      });
    }

    return null;
  };

  createUser() {
    const {
      dni,
      nombre,
      apellido,
      correo,
      direccion,
      sexo,
      telefono,
      passFirst,
    } = this.formulario.value;
    const fecha = new Date(this.formulario.value.nacimiento);

    const usuario: any = {
      dni,
      nombre,
      apellido,
      nacimiento: `${fecha.getFullYear()}-${
        fecha.getMonth() + 1
      }-${fecha.getDate()}`,
      contrasena: passFirst,
      correo,
      direccion,
      telefono,
      sexo,
    };

    this.usuariosService.creaeUser(usuario).subscribe({
      next: (resp: any) => {
        this.snackBar.open(`${resp.msg} 👍`, 'Ok', { duration: 3000 });
        this.router.navigate(['/serenazgo/usuarios/list']);
      },
      error: (err) => {
        console.log(err);
        if (!err.error.ok) {
          this.snackBar.open(`${err.error.msg ?? 'Ocurrió un error'} ⛔`, 'Ok', {
            duration: 3000,
          }); 
        } 
      },
    });
  }
}
