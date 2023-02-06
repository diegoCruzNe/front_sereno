import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidad',
})
export class UnidadPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Habilitado' : 'Deshabilitado';
  }
}
