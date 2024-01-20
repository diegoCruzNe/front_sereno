import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { MirutaComponent } from './miruta/miruta.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [MirutaComponent],
  imports: [CommonModule, RutasRoutingModule, MaterialModule],
})
export class RutasModule {}
