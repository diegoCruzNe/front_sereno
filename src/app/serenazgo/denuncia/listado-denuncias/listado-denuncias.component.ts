import { Component, ViewChild, AfterViewInit, Injectable } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, merge, startWith, switchMap } from 'rxjs';
import { Denuncias } from 'src/app/interfaces/denuncias.interface';
import { ListDenuncias } from 'src/app/interfaces/listDenuncias.interface';
import { DenunciaService } from 'src/app/services/denuncia.service';

@Component({
  selector: 'app-listado-denuncias',
  templateUrl: './listado-denuncias.component.html',
  styleUrls: ['./listado-denuncias.component.css'],
})
export class ListadoDenunciasComponent implements AfterViewInit {
  columnas = ['id_denuncia', 'fecha', 'hora', 'delito', 'estado'];
  data: Denuncias[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  resultsLength: number = 0;
  isLoadingResults: boolean = true;
  pageSize: number = 10;
  enablePagination: boolean = false;

  constructor(
    private denunciaService: DenunciaService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.denunciaService.getListDenuncias(
            this.paginator.pageIndex + 1
          );
        }),
        map((data: ListDenuncias) => {
          this.isLoadingResults = false;
          this.resultsLength = data.total;
          return data.denuncias;
        })
      )
      .subscribe((response) => {
        this.data = response;
      });
  }

  applyFilter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const filterValue = (event.target as HTMLInputElement).value;
      this.denunciaService
        .getListDenunciasByDate(filterValue)
        .subscribe((response) => {
          if (response.total === 0) {
            this.snackBar.open('No hay denuncias 😕', 'Ok', {
              duration: 2000,
            });
            this.getData();
          } else if (response.total > 0) {
            // todo: fix backend
            console.log(response.denuncias[0].estado);
            this.data = response.denuncias;
            this.resultsLength = response.total;
            this.pageSize = 1;
            this.enablePagination = true;
          }
        });
    }
  }
}

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Denuncias por página: ';
  override nextPageLabel: string = 'Siguiente';
  override previousPageLabel: string = 'Anterior';
  override firstPageLabel: string = 'Primera página';
  override lastPageLabel: string = 'Última página';
}
