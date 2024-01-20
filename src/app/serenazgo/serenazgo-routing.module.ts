import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SerenoComponent } from './sereno/sereno.component';
import { UsuariosGuard } from '../guards/usuarios.guard';
import { DenunciasGuard } from '../guards/denuncias.guard';
import { MisrutasGuard } from '../guards/misrutas.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'sereno', component: SerenoComponent },
      { path: 'serenos', loadChildren: () => import('./serenos/serenos.module').then((m) => m.SerenosModule) },
      { path: 'unidades', loadChildren: () => import('./unidad/unidad.module').then((m) => m.UnidadModule) },
      { path: 'grupos', loadChildren: () => import('./grupos/grupos.module').then((m) => m.GruposModule) },
      { path: 'user', loadChildren: () => import('./user/user.module').then((m) => m.UserModule) },
      { path: 'rutas', canActivate: [MisrutasGuard], loadChildren: () => import('./rutas/rutas.module').then((m) => m.RutasModule) },
      { path: 'usuarios', canActivate: [UsuariosGuard], loadChildren: () => import('./usuarios/usuarios.module').then((m) => m.UsuariosModule) },
      { path: 'denuncia', canActivate: [DenunciasGuard], loadChildren: () => import("./denuncia/denuncia.module").then((m) => m.DenunciaModule) },
      { path: '**', redirectTo: 'denuncia' },   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SerenazgoRoutingModule {}
