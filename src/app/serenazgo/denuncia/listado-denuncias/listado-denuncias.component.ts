import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, map, merge, of, pipe, startWith, switchMap } from 'rxjs';
import { Denuncias } from 'src/app/interfaces/denuncias.interface';
import { ListDenuncias } from 'src/app/interfaces/listDenuncias.interface';
import { DenunciaService } from 'src/app/services/denuncia.service';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Component({
  selector: 'app-listado-denuncias',
  templateUrl: './listado-denuncias.component.html',
  styleUrls: ['./listado-denuncias.component.css'],
})
export class ListadoDenunciasComponent implements AfterViewInit {
  columnas = ['id_denuncia', 'fecha', 'hora', 'delito'];
  exampleDatabase!: ExampleHttpDatabase | null;
  data: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  resultsLength: number = 1;

  constructor(private _httpClient: HttpClient) {}

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._httpClient);

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.exampleDatabase!.getRepoIssues(
            this.paginator.pageIndex + 1
          ).pipe(catchError(() => of(null)));
        }),
        map((data: any) => {
          this.resultsLength = data.total;
          return data.denuncias;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}

export class ExampleHttpDatabase {
  constructor(private _httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return { headers: { 'x-token': this.token } };
  }

  getRepoIssues(page?: number, limit?: number) {
    let params = new HttpParams();

    if (page !== undefined) params = params.set('page', page.toString());
    if (limit !== undefined) params = params.set('limit', limit.toString());

    return this._httpClient.get<ListDenuncias>(`${base_url}/denuncia`, {
      headers: {
        'x-token': this.token,
      },
      params,
    });
  }
}
