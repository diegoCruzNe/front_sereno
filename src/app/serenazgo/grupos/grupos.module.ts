import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRoutingModule } from './grupos-routing.module';
import { ListadoComponent } from './listado/listado.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TablaComponent } from './tabla/tabla.component';
import { AgregarComponent } from './agregar/agregar.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListadoComponent, TablaComponent, AgregarComponent],
  imports: [
    CommonModule,
    GruposRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
})
export class GruposModule {}
