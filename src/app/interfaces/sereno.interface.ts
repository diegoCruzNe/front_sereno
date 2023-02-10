export interface Sereno {
  id_sereno?: number;
  dni: string;
  nombre: string;
  apellidos: string;
  genero?: boolean;
  celular?: string;
  correo?: string;
  direccion?: string;
  nacimiento: Date;
  imagen?: string;
}
