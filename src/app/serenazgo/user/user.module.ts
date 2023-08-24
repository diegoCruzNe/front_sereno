import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';


@NgModule({
  declarations: [
    ProfileComponent,
    MydashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
