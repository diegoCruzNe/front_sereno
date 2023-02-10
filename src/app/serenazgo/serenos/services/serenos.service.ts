import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerenosService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSerenos(): Observable<Sereno[]> {
    return this.http.get<Sereno[]>(`${this.url}/serenos`);
  }

  addSereno(sereno: Sereno): Observable<Sereno> {
    return this.http.post<Sereno>(`${this.url}/serenos`, sereno);
  }
}
