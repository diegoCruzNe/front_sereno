import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.url}/unidades`);
  }

  get getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // get headers(){ return { headers: {'x-token': this.token,},};}

  actualizarUnidad(form: any, id: number): Observable<{ok: string, unidad: Unidad}> {
     return this.http.put<any>(`${this.url}/unidades/${id}`, form);
  }

  crearUnidad(unidad: any) {
    return this.http.post(`${this.url}/unidades`, unidad);
  }

  getUnidadPorId(id: number): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.url}/unidades/${id}`);
  }
}
