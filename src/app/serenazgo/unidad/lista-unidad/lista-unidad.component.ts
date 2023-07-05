import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { UnidadService } from '../services/unidad.service';
import { Unidad } from 'src/app/interfaces/unidad.interface';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogaddeditComponent } from '../dialogaddedit/dialogaddedit.component';
import { DialogaddeditService } from '../services/dialogaddedit.service';

@Component({
  selector: 'app-lista-unidad',
  templateUrl: './lista-unidad.component.html',
  styleUrls: ['./lista-unidad.component.css'],
})
export class ListaUnidadComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  obs!: Observable<any>;
  dataSource!: MatTableDataSource<Unidad>;
  pageEvent!: PageEvent;
  accent: string = 'accent';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private unidadService: UnidadService,
    public dialog: MatDialog,
    private dialogaddeditService: DialogaddeditService
  ) {}

  ngOnInit(): any {
    this.listarUnidades();
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(
      DialogaddeditComponent,
      {
        width: '275px',
        height: '545px',
        disableClose: true,
        data: { id },
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.listarUnidades();
      }
    });
  }

  listarUnidades() {
    this.unidadService.getUnidades().subscribe((res: Unidad[]) => {
      this.dataSource = new MatTableDataSource<Unidad>(res);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    });
  }

  applyFilter(event: Event) {
    //TODO: Más filtros
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
