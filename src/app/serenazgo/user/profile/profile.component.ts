import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/auth/services/login.service';
import { RenewUsuario } from 'src/app/interfaces/renewToken.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { CustomvalidationService } from 'src/app/services/customvalidation.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  badgeEdit: boolean = true;
  formulario: FormGroup;
  formPass: FormGroup;
  id_user!: number;
  image_user!: string;
  badgePass: boolean = true;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private snackBar: MatSnackBar,
    private customValidation: CustomvalidationService
  ) {
    this.formulario = fb.group({
      dni: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      nacimiento: ['', [Validators.required]],
      direccion: [''],
      sexo: ['', [Validators.required]],
      telefono: [''],
    });

    this.formPass = fb.group(
      {
        oldPass: ['', [Validators.required]],
        newPass: ['', [Validators.required, Validators.minLength(6)]],
        confirmPass: ['', [Validators.required]],
      },
      { 
        validators: this.controlValuesAreEqual('newPass', 'confirmPass')
      } 
    );
  }

  ngOnInit() {
    this.getDataUser();
    this.formulario.disable();
    this.formPass.disable();
  }

  getDataUser() {
    this.loginService.getDataUser().subscribe((res: RenewUsuario) => {
      this.id_user = res.usuario.id_usuario!;
      const fecha = new Date(res.usuario.nacimiento);

      this.image_user = res.usuario.foto || 'no-image';
      this.formulario.patchValue({
        dni: res.usuario.dni,
        nombre: res.usuario.nombre,
        apellidos: res.usuario.apellido,
        correo: res.usuario.correo,
        nacimiento: new Date(
          fecha.getTime() + Math.abs(fecha.getTimezoneOffset() * 60000)
        ),
        direccion: res.usuario.direccion,
        sexo: res.usuario.sexo === 'femenino' ? '1' : '0',
        telefono: res.usuario.telefono,
      });
    });
  }

  edit() {
    this.formulario.enable();
    this.formulario.get('dni')?.disable();
    this.badgeEdit = false;
  }

  save() {
    this.formulario.disable();
    this.formulario.get('dni')?.disable();
    this.badgeEdit = true;
    this.updateProfile();
  }

  updateProfile() {
    const { dni, nombre, apellidos, sexo, telefono, correo, direccion } =
      this.formulario.value;
    const fecha = new Date(this.formulario.value.nacimiento);

    const usuario = {
      dni,
      nombre,
      apellidos,
      correo,
      nacimiento: new Date(
        fecha.getTime() + Math.abs(fecha.getTimezoneOffset() * 60000)
      ),
      direccion,
      sexo: sexo === '0' ? 'masculino' : 'femenino',
      telefono,
    };

    this.usuarioService
      .updateMyProfile(usuario, this.id_user)
      .subscribe((res: any) => {
        if (res.ok) {
          this.snackBar.open('Actualizado 😀', 'Ok');
          this.getDataUser();
        }
      });
  }

  edit_pass() {
    this.formPass.enable();
    this.badgePass = false;
  }

  updatePass() {
    //if (this.formPass.invalid) return;
    this.badgePass = true;
    this.formPass.disable();
    console.log(this.formPass)
  }

  controlValuesAreEqual(controlNameA: string, controlNameB: string): ValidatorFn {
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
