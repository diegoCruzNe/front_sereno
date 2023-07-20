import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUnidadesAvailables(turno: number){
    return this.http.get(`${this.url}/unidades/availables/${turno}`);
  }
}
