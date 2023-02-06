import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unidad } from '../interfaces/unidad.interface';

@Injectable({
  providedIn: 'root',
})
export class UnidadService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(`${this.url}/unidades`);
  }
}
