import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

export interface CaterogiaDelito {
  tipo_delito: string;
  delito: Delito[];
}

export interface Delito {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root',
})
export class DelitoService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  getDelitosPorCategoria(): Observable<CaterogiaDelito[]> {
    return this.http.get<CaterogiaDelito[]>(`${base_url}/delito`, this.headers);
  }
}
