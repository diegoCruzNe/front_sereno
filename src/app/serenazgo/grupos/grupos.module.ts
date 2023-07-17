import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TablaComponent } from './tabla/tabla.component';

@NgModule({
  declarations: [ListadoComponent, TablaComponent],
  imports: [CommonModule, GruposRoutingModule, MaterialModule],
})
export class GruposModule {}
