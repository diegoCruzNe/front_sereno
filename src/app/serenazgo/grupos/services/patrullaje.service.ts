import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { getPatrullaje } from 'src/app/interfaces/getPatrullaje.interface';

@Injectable({
  providedIn: 'root',
})
export class PatrullajeService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  get token(): string { return localStorage.getItem('token') || '' }
  get headers() { return { headers: { 'x-token': this.token } } }

  getPatrullaje(): Observable<getPatrullaje[]> {
    return this.http.get<getPatrullaje[]>(`${this.url}/patrullaje`, this.headers);
  }
}
