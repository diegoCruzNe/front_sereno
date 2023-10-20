import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListUsersComponent } from './list-users/list-users.component';

/* const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home' },
]; */

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'list', component: ListUsersComponent },
      { path: '**', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuariosRoutingModule {}
