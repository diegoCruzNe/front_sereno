import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { UsuariosideditService } from 'src/app/services/usuariosidedit.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id_user: number;
  formulario: FormGroup;
  changeType: boolean = false;

  constructor(
    private usuariosIdEditService: UsuariosideditService,
    private router: Router,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.id_user = usuariosIdEditService.getId();
    this.formulario = fb.group(
      {
        dni: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        correo: [''],
        nacimiento: ['', [Validators.required]],
        direccion: [''],
        telefono: [''],
        sexo: ['', [Validators.required]],
        fk_tipo_us: ['', [Validators.required]],
        contrasena: [''],
        contrasenaRepeat: [''],
      },
      {
        validators: this.controlValuesAreEqual(
          'contrasena',
          'contrasenaRepeat'
        ),
      }
    );
  }

  ngOnInit(): void {
    if (this.id_user === 0) this.router.navigate(['/serenazgo/usuarios/list']);
    else this.getUser();
    this.userType();
  }

  getUser() {
    this.usuariosService.getUserById(this.id_user).subscribe({
      next: (user) => {
        this.formulario.patchValue({
          dni: user.dni,
          nombre: user.nombre,
          apellido: user.apellido,
          correo: user.correo,
          nacimiento: user.nacimiento,
          direccion: user.direccion,
          telefono: user.telefono,
          sexo: user.sexo,
          fk_tipo_us: user.fk_tipo_us === 3 ? '3' : '2',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  userType() {
    this.loginService.getDataUser().subscribe((res) => {
      if (res.usuario.fk_tipo_us === 1) {
        this.changeType = true;
      }
    });
  }

  updateProfile() {
    const {
      apellido,
      contrasenaRepeat,
      correo,
      direccion,
      dni,
      fk_tipo_us,
      nombre,
      sexo,
      telefono,
      contrasena,
    } = this.formulario.value;
    const fecha = new Date(this.formulario.value.nacimiento);

    const usuario: any = {
      dni,
      nombre,
      apellidos: apellido,
      correo,
      nacimiento: `${fecha.getFullYear()}-${
        fecha.getMonth() + 1
      }-${fecha.getDate()}`,
      direccion,
      sexo,
      telefono,
      fk_tipo_us: parseInt(fk_tipo_us),
    };

    if (contrasena !== '') {
      usuario.contrasena = contrasena;
    }

    this.usuariosService
      .updateUserFromRootOrAdmin(usuario, this.id_user)
      .subscribe({
        next: (resp: any) => {
          this.snackBar.open(`${resp.msg} 👍`, 'Ok', { duration: 3000 });
          this.router.navigate(['/serenazgo/usuarios/list']);
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open(`Ocurrió un error ⛔`, 'Ok', { duration: 3000 });
        },
      });
  }

  controlValuesAreEqual(
    controlNameA: string,
    controlNameB: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const valueControlA = formGroup.get(controlNameA)?.value;
      const valueControlB = formGroup.get(controlNameB)?.value;

      if (valueControlA === valueControlB) {
        return null;
      } else {
        return { dontMatch: true };
      }
    };
  }
}
