import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UnidadRoutingModule } from './unidad-routing.module';
import { HomeUnidadComponent } from './home-unidad/home-unidad.component';
import { ListaUnidadComponent } from './lista-unidad/lista-unidad.component';

import { MaterialModule } from 'src/app/material/material.module';
import { ImgPipe } from './pipes/img.pipe';
import { DialogaddeditComponent } from './dialogaddedit/dialogaddedit.component';

@NgModule({
  declarations: [
    HomeUnidadComponent,
    ListaUnidadComponent,
    ImgPipe,
    DialogaddeditComponent,
  ],
  imports: [CommonModule, UnidadRoutingModule, MaterialModule, ReactiveFormsModule ],
})
export class UnidadModule {}
