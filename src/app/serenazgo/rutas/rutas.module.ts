import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { MirutaComponent } from './miruta/miruta.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DialogUbicationComponent } from './miruta/dialog-ubication/dialog-ubication.component';

@NgModule({
  declarations: [MirutaComponent, DialogUbicationComponent],
  imports: [CommonModule, RutasRoutingModule, MaterialModule],
})
export class RutasModule {}
