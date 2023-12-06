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
  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  zoom = 4;

  constructor(private delitoService: DelitoService) {}

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

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
