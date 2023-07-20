import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './listado/listado.component';
import { AgregarComponent } from './agregar/agregar.component';

const routes: Routes = [
  { path: 'listado', component: ListadoComponent },
  { path: 'nuevo', component: AgregarComponent },
  { path: '**', redirectTo: 'listado'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposRoutingModule {}