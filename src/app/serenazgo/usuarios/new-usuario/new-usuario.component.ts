import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-new-usuario',
  templateUrl: './new-usuario.component.html',
  styleUrls: ['./new-usuario.component.css'],
})
export class NewUsuarioComponent {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = new FormGroup(
      {
        dni: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        nombre: new FormControl('', [Validators.required]),
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

  passwordMatchValidator(g: any) {
    const passFirst = g.get('passFirst')?.value;
    const passRepeat = g.get('passRepeat')?.value;
    if (passFirst !== passRepeat) {
      g.get('passRepeat')?.setErrors({ mismatch: true });
    }
    return null;
  }

  /* validarDni(control: FormControl) {
    const dni = control.value;
    if (dni && dni.length !== 8) {
      return { dniInvalido: true };
    }
    return null;
  } */

  createUser() {
    console.log(this.formulario);
  }
}
