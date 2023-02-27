import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Police } from 'src/app/interfaces/police.interface';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SerenosService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSerenos(): Observable<Police[]> {
    return this.http.get<Police[]>(`${this.url}/serenos`);
  }

  addSereno(sereno: Sereno): Observable<Sereno> {
    return this.http.post<Sereno>(`${this.url}/serenos`, sereno);
  }

  getSerenoById(id: number): Observable<Police> {
    return this.http.get<Police>(`${this.url}/serenos/${id}`);
  }
}
