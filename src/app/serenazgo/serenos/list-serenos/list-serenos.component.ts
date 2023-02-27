import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
} from '@angular/core';
import { Sereno } from 'src/app/interfaces/sereno.interface';

import { SerenosService } from '../services/serenos.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { Police } from 'src/app/interfaces/police.interface';

@Component({
  selector: 'app-list-serenos',
  templateUrl: './list-serenos.component.html',
  styleUrls: ['./list-serenos.component.css'],
})
export class ListSerenosComponent implements OnInit, AfterViewInit {
  columnas = ['nombre', 'apellidos', 'genero', 'edad', 'iconos', 'imagen'];
  dataSource: MatTableDataSource<Police>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private serenoService: SerenosService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.listarSerenos();
  }

  ngAfterViewInit(): void {}

  listarSerenos() {
    this.serenoService.getSerenos().subscribe((serenos) => {
      this.dataSource.data = serenos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
