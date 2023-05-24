import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(formData: { dni: string; password: string }): Observable<any> {
    return this.http.post<any>(`${base_url}/auth`, formData);
  }

  crearUsuario(objUsuario: Usuario) {
    return this.http.post(`${base_url}/usuarios`, objUsuario);
  }
}
