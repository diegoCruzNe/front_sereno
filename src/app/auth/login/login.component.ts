import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  public loginForm = this.fb.group({
    // /^\d{8}$/
    dni: ['00000011', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    password: ['123456', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe((resp) => {
      console.log(resp);
    });
  }

  /* getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Ingrese un email';
    }

    return this.email.hasError('email') ? 'Email no válido' : '';
  } */
}
