import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAge',
})
export class UserAgePipe implements PipeTransform {
  transform(nacimiento: string): number {
    const dateNacimiento = new Date(nacimiento);
    const hoy = new Date();
    const edad = hoy.getFullYear() - dateNacimiento.getFullYear();

    // Comprobar si el cumpleaños ya pasó este año
    if (
      hoy.getMonth() < dateNacimiento.getMonth() ||
      (hoy.getMonth() === dateNacimiento.getMonth() &&
        hoy.getDate() < dateNacimiento.getDate())
    ) {
      return edad - 1;
    }
    return edad;
  }
}
