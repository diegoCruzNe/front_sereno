import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuariosGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  /* canActivate(): any {
    return this.loginService
      .getDataUser()
      .pipe(map((res: any) => res.usuario.fk_tipo_us))
      .subscribe((res) => {
        if (res === 1 || res === 2) {
          this.router.navigateByUrl('/serenazgo/usuarios');
        } else {
          this.router.navigateByUrl('/serenazgo/');
        }
      });
  } */

  canActivate(): Observable<boolean> {
    return this.loginService.getDataUser().pipe(
      map((res: any) => res.usuario.fk_tipo_us),
      map((res) => res === 1 || res === 2)
    );
  }
}
