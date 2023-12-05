import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DenunciaRoutingModule } from './denuncia-routing.module';
import {
  CustomMatPaginatorIntl,
  ListadoDenunciasComponent,
} from './listado-denuncias/listado-denuncias.component';
import { MaterialModule } from 'src/app/material/material.module';
import { HoraDenunciaPipe } from '../pipes/hora-denuncia.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { RegistrarDenunciaComponent } from './registrar-denuncia/registrar-denuncia.component';

@NgModule({
  declarations: [ListadoDenunciasComponent, HoraDenunciaPipe, RegistrarDenunciaComponent],
  imports: [CommonModule, DenunciaRoutingModule, MaterialModule],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }],
})
export class DenunciaModule {}
