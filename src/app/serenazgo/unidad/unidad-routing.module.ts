import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeUnidadComponent } from './home-unidad/home-unidad.component';
import { ListaUnidadComponent } from './lista-unidad/lista-unidad.component';

const routes: Routes = [
  { path: '', component: HomeUnidadComponent, 
  children: [
      { path: 'list', component: ListaUnidadComponent },
      { path: '**', redirectTo: 'list' },
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnidadRoutingModule {}
