import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SerenosRoutingModule } from './serenos-routing.module';
import { HomeSerenosComponent } from './home-serenos/home-serenos.component';
import { AddeditSerenosComponent } from './addedit-serenos/addedit-serenos.component';
import { ListSerenosComponent } from './list-serenos/list-serenos.component';

import { MaterialModule } from 'src/app/material/material.module';

import { EdadPipe } from './pipes/edad.pipe';

@NgModule({
  declarations: [
    HomeSerenosComponent,
    AddeditSerenosComponent,
    ListSerenosComponent,
    EdadPipe,
  ],
  imports: [
    CommonModule,
    SerenosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SerenosModule {}
