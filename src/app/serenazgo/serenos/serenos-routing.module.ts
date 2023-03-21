import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeditSerenosComponent } from './addedit-serenos/addedit-serenos.component';
import { HomeSerenosComponent } from './home-serenos/home-serenos.component';
import { ListSerenosComponent } from './list-serenos/list-serenos.component';
import { VerserenoComponent } from './versereno/versereno.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSerenosComponent,
    children: [
      { path: 'list', component: ListSerenosComponent },
      { path: 'addedit', component: AddeditSerenosComponent },
      { path: 'editar/:id', component: AddeditSerenosComponent },
      { path: 'versereno/:id', component: VerserenoComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerenosRoutingModule {}
