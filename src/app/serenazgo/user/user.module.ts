import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MydashboardComponent } from './mydashboard/mydashboard.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ProfileComponent,
    MydashboardComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
