import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: MydashboardComponent },
  { path: '**', redirectTo: 'profile' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
