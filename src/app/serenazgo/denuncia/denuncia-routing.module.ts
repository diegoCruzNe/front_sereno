import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoDenunciasComponent } from './listado-denuncias/listado-denuncias.component';
import { RegistrarDenunciaComponent } from './registrar-denuncia/registrar-denuncia.component';

const routes: Routes = [
  { path: 'listado', component: ListadoDenunciasComponent },
  { path: 'registrar', component: RegistrarDenunciaComponent },
  { path: '**', redirectTo: 'listado' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DenunciaRoutingModule {}
