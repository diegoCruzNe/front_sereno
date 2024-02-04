export interface RegisDenuncia {
  detalles: string;
  direccion: string;
  lat: number;
  lng: number;
  fecha?: string;
  delito: number;
  denunciante?: number;
  usuario: number;
  patrullaje?: number;
}
