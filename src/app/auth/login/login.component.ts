import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  public loginForm = this.fb.group({
    // /^\d{8}$/
    dni: ['00000007', [Validators.required, Validators.pattern(/^\d{8}$/)]],
    password: ['123456', [Validators.required]],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login() {
    this.loginService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/serenazgo');
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open("Error", "Ok", {
          duration: 2500
        });
      },
    });
  }
}
