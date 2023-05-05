import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(valor: number): any {
    let unidad: string = '';

    switch (valor) {
      case 1:
        unidad = 'Camioneta';
        break;
      case 2:
        unidad = 'Auto';
        break;
      case 3:
        unidad = 'Moto';
        break;
      case 4:
        unidad = 'Camion.';
        break;
      default:
        unidad = 'Unidad';
        break;
    }
    return unidad;
  }
}
