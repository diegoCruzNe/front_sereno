import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SerenoComponent } from './sereno/sereno.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'sereno', component: SerenoComponent },
      { path: 'serenos', loadChildren: () => import('./serenos/serenos.module').then((m) => m.SerenosModule)},
      { path: 'unidades', loadChildren: () => import('./unidad/unidad.module').then((m) => m.UnidadModule)},
      { path: 'grupos', loadChildren: () => import('./grupos/grupos.module').then((m) => m.GruposModule)},
      { path: '**', redirectTo: 'unidades' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerenazgoRoutingModule {}
