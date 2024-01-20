import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../auth/services/login.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.loginService.validarToken().pipe(
      map((res: boolean) => !res),
      tap((res: boolean) => { 
        if (!res) this.router.navigateByUrl('/serenazgo'); 
      })
    );
  }
}
