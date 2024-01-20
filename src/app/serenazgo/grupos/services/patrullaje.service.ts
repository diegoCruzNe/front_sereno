import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { getPatrullaje } from 'src/app/interfaces/getPatrullaje.interface';
import { newPatrullaje } from 'src/app/interfaces/newPatrullaje.interface';

 interface PatrullajeDetails {
  id_patrullaje: number;
  descripcion: null | string;
  turno: string;
  tipo_unidad: string;
  placa: string;
  fecha_creacion: string;
  num_sere: number;
 }

interface resNewPatru {
  ok:  boolean;
  msg: string;
};

@Injectable({
  providedIn: 'root',
})
export class PatrullajeService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }
  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  getPatrullaje(): Observable<getPatrullaje[]> {
    return this.http.get<getPatrullaje[]>(`${this.url}/patrullaje`,this.headers);
  }

  newPatrullaje(patrullaje: newPatrullaje): Observable<resNewPatru> {
    return this.http.post<resNewPatru>(`${this.url}/patrullaje`, patrullaje, this.headers);
  }

  getPatrullajeDetalles(): Observable<PatrullajeDetails[]> {
    return this.http.get<PatrullajeDetails[]>(`${this.url}/patrullaje/detalles`, this.headers);
  }
}
