import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'serenazgo', canActivate: [LoginGuard], loadChildren: () => import('./serenazgo/serenazgo.module').then((m) => m.SerenazgoModule) },
  { path: 'auth', canActivate: [AuthGuard], loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  { path: '**', redirectTo: 'auth' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
