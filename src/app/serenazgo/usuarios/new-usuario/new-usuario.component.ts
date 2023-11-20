import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    private usuariosService: UsuariosService
  ) {
    this.formulario = new FormGroup(
      {
        dni: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          this.existsDni,
        ]),
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
    console.log(this.formulario.controls['dni']);
  }
}
