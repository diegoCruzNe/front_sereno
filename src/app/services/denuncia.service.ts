import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListDenuncias } from '../interfaces/listDenuncias.interface';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  getListDenuncias(page?: number, limit?: number): Observable<ListDenuncias> {
    let params = new HttpParams();

    if (page !== undefined) params = params.set('page', page.toString());
    if (limit !== undefined) params = params.set('limit', limit.toString());

    return this.http.get<ListDenuncias>(`${base_url}/denuncia`, {
      headers: {
        'x-token': this.token,
      },
      params,
    });
  }
}
