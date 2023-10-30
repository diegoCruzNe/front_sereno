import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  updateMyProfile(usuario: any, id: any) {
    return this.http.put(`${base_url}/usuarios/${id}`, usuario, {
      headers: { 'x-token': this.token },
    });
  }

  changeMyPassword(pass: any) {
    return this.http.post(`${base_url}/usuarios_changemypassword`, pass, {
      headers: { 'x-token': this.token },
    });
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${base_url}/usuarios`, this.headers);
  }
}
