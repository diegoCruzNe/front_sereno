import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerenosRoutingModule } from './serenos-routing.module';
import { HomeSerenosComponent } from './home-serenos/home-serenos.component';
import { AddeditSerenosComponent } from './addedit-serenos/addedit-serenos.component';
import { ListSerenosComponent } from './list-serenos/list-serenos.component';

import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [
    HomeSerenosComponent,
    AddeditSerenosComponent,
    ListSerenosComponent,
  ],
  imports: [CommonModule, SerenosRoutingModule, MaterialModule],
})
export class SerenosModule {}
