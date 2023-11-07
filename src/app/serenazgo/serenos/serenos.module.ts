import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { SerenosRoutingModule } from './serenos-routing.module';
import { HomeSerenosComponent } from './home-serenos/home-serenos.component';
import { AddeditSerenosComponent } from './addedit-serenos/addedit-serenos.component';
import { ListSerenosComponent } from './list-serenos/list-serenos.component';

import { MaterialModule } from 'src/app/material/material.module';

import { EdadPipe } from './pipes/edad.pipe';
import { VerserenoComponent } from './versereno/versereno.component';
import { SelectGroupComponent } from './select-group/select-group.component';
import { DialogdeleteserenoComponent } from './dialogdeletesereno/dialogdeletesereno.component';


@NgModule({
  declarations: [
    HomeSerenosComponent,
    AddeditSerenosComponent,
    ListSerenosComponent,
    EdadPipe,
    VerserenoComponent,
    SelectGroupComponent,
    DialogdeleteserenoComponent,
  ],
  imports: [
    CommonModule,
    SerenosRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],

  providers: [DatePipe],
})
export class SerenosModule {}
