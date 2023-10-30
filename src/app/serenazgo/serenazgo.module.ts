import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerenazgoRoutingModule } from './serenazgo-routing.module';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from '../material/material.module';
import { SerenoComponent } from './sereno/sereno.component';
import { UnidadPipe } from './pipes/unidad.pipe';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  //UserAgePipe
  declarations: [HomeComponent, SerenoComponent, UnidadPipe],
  imports: [
    CommonModule,
    SerenazgoRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class SerenazgoModule {}
