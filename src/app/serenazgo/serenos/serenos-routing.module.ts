import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddeditSerenosComponent } from './addedit-serenos/addedit-serenos.component';
import { HomeSerenosComponent } from './home-serenos/home-serenos.component';
import { ListSerenosComponent } from './list-serenos/list-serenos.component';

const routes: Routes = [
  {
    path: '',
    component: HomeSerenosComponent,
    children: [
      { path: 'list', component: ListSerenosComponent },
      { path: 'addedit', component: AddeditSerenosComponent },
      { path: 'editar/:id', component: AddeditSerenosComponent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerenosRoutingModule {}
