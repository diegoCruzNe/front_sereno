import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciaRoutingModule } from './denuncia-routing.module';
import { ListadoDenunciasComponent } from './listado-denuncias/listado-denuncias.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HoraDenunciaPipe } from '../pipes/hora-denuncia.pipe';

@NgModule({
  declarations: [ListadoDenunciasComponent, HoraDenunciaPipe],
  imports: [CommonModule, DenunciaRoutingModule, MaterialModule],
})
export class DenunciaModule {}
