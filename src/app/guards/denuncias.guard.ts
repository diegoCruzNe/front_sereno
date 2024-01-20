import { Injectable } from '@angular/core';
import { LoginService } from '../auth/services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DenunciasGuard {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate() {
    this.loginService.getDataUser().subscribe((res: any) => {
      if (res.usuario.fk_tipo_us === 3) {
        this.router.navigateByUrl('serenazgo/user/profile');
        return false;
      } else {
        return true;
      }
    });
  }
}
