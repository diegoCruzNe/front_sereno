import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsuariosideditService {
  private id: number = 0;

  setId(id: number) {
    this.id = id;
  }

  getId() {
    return this.id;
  }
}
