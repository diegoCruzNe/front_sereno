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
    return this.http.put(`${base_url}/usuarios/${id}`, usuario, this.headers);
  }

  changeMyPassword(pass: any) {
    return this.http.post(`${base_url}/usuarios_changemypassword`, pass, this.headers);
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${base_url}/usuarios`, this.headers);
  }

  updateUserFromRootOrAdmin(usuario: Usuario, id: number) {
    return this.http.patch(`${base_url}/usuarios/${id}`, usuario, this.headers);
  }

  getUserById(id: number): Observable<Usuario> { 
    return this.http.get<Usuario>(`${base_url}/usuarios/${id}`, this.headers);
  }

  getUserByDni(dni: any): Observable<any> {
    return this.http.get(`${base_url}/usuarios_dni/${dni}`, this.headers);
  }
}
