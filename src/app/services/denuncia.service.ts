import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListDenuncias } from '../interfaces/listDenuncias.interface';
import { RegisDenuncia } from '../interfaces/regisDenuncia.interface';

interface ResDenuncia {
  ok: boolean;
  msg: string;
  idDenuncia?: number;
}

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

  getListDenunciasByDate(date: string) {
    return this.http.get<ListDenuncias>(`${base_url}/denuncia/buscar_by_date`, {
      headers: {
        'x-token': this.token,
      },
      params: { date: date },
    });
  }

  registerDenuncia(denuncia: RegisDenuncia): Observable<ResDenuncia> {
    return this.http.post<ResDenuncia>(
      `${base_url}/denuncia`,
      denuncia,
      this.headers
    );
  }
}
