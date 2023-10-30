import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userTipouser',
})
export class UserTipouserPipe implements PipeTransform {
  transform(tipo_us: number): string {
    if (tipo_us === 1) return 'Root';
    else if (tipo_us === 2) return 'Administrador';
    else return 'Operador';
  }
}
