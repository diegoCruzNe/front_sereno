import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MirutaComponent } from './miruta/miruta.component';

const routes: Routes = [
  {
    path: '',
    component: MirutaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RutasRoutingModule {}
