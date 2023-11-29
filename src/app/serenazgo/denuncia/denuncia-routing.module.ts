import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDenunciasComponent } from './listado-denuncias/listado-denuncias.component';

const routes: Routes = [
  { path: 'listado', component: ListadoDenunciasComponent },
  { path: '**', redirectTo: 'listado' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DenunciaRoutingModule {}
