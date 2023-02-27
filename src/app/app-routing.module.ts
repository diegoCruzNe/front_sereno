import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'serenazgo',
    loadChildren: () =>
      import('./serenazgo/serenazgo.module').then((m) => m.SerenazgoModule),
  },
  {
    path: '**',
    redirectTo: 'serenazgo',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
