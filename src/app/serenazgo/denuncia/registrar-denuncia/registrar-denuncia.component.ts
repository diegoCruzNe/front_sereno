import { Component, OnInit } from '@angular/core';
import { DelitoService } from 'src/app/services/delito.service';

export interface CaterogiaDelito {
  tipo_delito: string;
  delito: Delito[];
}

export interface Delito {
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registrar-denuncia',
  templateUrl: './registrar-denuncia.component.html',
  styleUrls: ['./registrar-denuncia.component.css'],
})
export class RegistrarDenunciaComponent implements OnInit {
  grupos_delitos: CaterogiaDelito[] = [];

  constructor(private delitoService: DelitoService) {}

  ngOnInit() {
    this.getDelitosPorCategoria();
  }

  getDelitosPorCategoria() {
    this.delitoService
      .getDelitosPorCategoria()
      .subscribe((delito_res: CaterogiaDelito[]) => {
        this.grupos_delitos = delito_res;
      });
  }
}
