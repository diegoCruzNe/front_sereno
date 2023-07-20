import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TurnosService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTurnos() {
    return this.http.get(`${this.url}/turnos`);
  }
}
