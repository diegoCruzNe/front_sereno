import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/serenazgo');
      },
      error: (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }
}
