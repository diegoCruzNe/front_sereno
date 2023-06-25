import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogaddeditService {
  constructor() {}

  parametros(id?: number) {
    return {
      width: '300px',
      height: '470px',
      disableClose: true,
      data: { id },
    };
  }
}
