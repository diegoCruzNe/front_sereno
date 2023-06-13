import { Usuario } from "./usuario.interface";

export interface RenewUsuario {
    ok: boolean;
    token?: string;
    msg?: string;
    usuario: Usuario;
  }