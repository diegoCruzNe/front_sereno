import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horaDenuncia',
})
export class HoraDenunciaPipe implements PipeTransform {
  transform(hora: string): string {
    // Verifica si la cadena de entrada tiene el formato correcto
    if (/^\d{2}:\d{2}$/.test(hora)) {
      // Divide la cadena en horas y minutos
      const [horas, minutos] = hora.split(':');

      // Convierte las horas a un formato de 12 horas
      let horas12 = parseInt(horas, 10);
      const ampm = horas12 >= 12 ? 'pm' : 'am';
      horas12 = horas12 % 12 || 12;

      // Devuelve la cadena formateada
      return `${String(horas12).padStart(2, '0')}:${minutos} ${ampm}`;
    } else {
      // Si el formato es incorrecto, devuelve la cadena original
      return hora;
    }
  }
}
