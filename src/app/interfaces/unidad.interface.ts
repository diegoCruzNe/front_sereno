export interface Unidad {
  id_unidad?: number;
  placa: string;
  descripcion: string;
  estado: number;
  fk_tipo_unidad: number;
  imagen?: string;
}
