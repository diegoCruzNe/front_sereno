import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SerenoComponent } from './sereno/sereno.component';
import { UnidadComponent } from './unidad/unidad.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'sereno', component: SerenoComponent },
      { path: 'unidad', component: UnidadComponent },
      {
        path: 'serenos',
        loadChildren: () =>
          import('./serenos/serenos.module').then((m) => m.SerenosModule),
      },
      { path: '**', redirectTo: 'sereno' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerenazgoRoutingModule {}
