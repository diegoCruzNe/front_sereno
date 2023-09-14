import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
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
}
