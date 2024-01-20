import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RenewUsuario } from 'src/app/interfaces/renewToken.interface';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  myBehaviorSubject = new BehaviorSubject<RenewUsuario | null>(null);

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  private setBehaviorSubject(value: RenewUsuario | null) {
    this.myBehaviorSubject.next(value);
  }

  getBehaviorSubject() {
    return this.myBehaviorSubject.asObservable();
  }

  cleanBehaviorSubject() {
    this.myBehaviorSubject.next(null);
  }

  login(formData: { dni: string; password: string }) {
    return this.http
      .post(`${base_url}/auth`, formData)
      .pipe(tap((res: any) => localStorage.setItem('token', res.token)));
  }

  validarToken(): Observable<boolean> {
    return this.http
      .get<RenewUsuario>(`${base_url}/auth`, {
        headers: { 'x-token': this.token || '' },
      })
      .pipe(
        tap((res) => {
          this.setBehaviorSubject(res);
        }),
        map((value: RenewUsuario) => {
          return value.ok;
        }),
        catchError((res) => {
          return of(false);
        })
      );
  }

  getDataUser(): Observable<RenewUsuario> {
    return this.http.get<RenewUsuario>(`${base_url}/auth`, {
      headers: { 'x-token': this.token || '' },
    });
  }

  crearUsuario(objUsuario: Usuario) {
    return this.http.post(`${base_url}/usuarios`, objUsuario);
  }
}
