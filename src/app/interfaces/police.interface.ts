export interface Police {
  id_sereno?: number;
  dni: string;
  nombre: string;
  apellidos: string;
  genero?: boolean;
  celular?: string;
  correo?: string;
  direccion?: string;
  nacimiento: string;
  imagen?: string;
  edad: number;
  fk_patrullaje?: number;
}
