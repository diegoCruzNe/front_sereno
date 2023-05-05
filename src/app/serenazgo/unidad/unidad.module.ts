import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadRoutingModule } from './unidad-routing.module';
import { HomeUnidadComponent } from './home-unidad/home-unidad.component';
import { ListaUnidadComponent } from './lista-unidad/lista-unidad.component';

import { MaterialModule } from 'src/app/material/material.module';
import { ImgPipe } from './pipes/img.pipe';

@NgModule({
  declarations: [HomeUnidadComponent, ListaUnidadComponent, ImgPipe],
  imports: [CommonModule, UnidadRoutingModule, MaterialModule],
})
export class UnidadModule {}
