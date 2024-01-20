import { Injectable, OnDestroy } from '@angular/core';
import { LoginService } from '../auth/services/login.service';
import { RenewUsuario } from '../interfaces/renewToken.interface';
import { Router } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MisrutasGuard implements OnDestroy {
  private canActivateCondition$: Observable<boolean> = new Observable();

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(): Observable<boolean> {
    this.canActivateCondition$ = this.loginService.getBehaviorSubject().pipe(
      map((res) => res?.usuario.fk_tipo_us),
      map((resp) => resp === 3),
      tap((result) => {
        if (!result) this.router.navigateByUrl('/serenazgo/user/profile');
      })
    );

    return this.canActivateCondition$ || of(false);
  }

  ngOnDestroy() {}
}
