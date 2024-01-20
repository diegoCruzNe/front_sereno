import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from 'src/app/auth/services/login.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuariosideditService } from '../../../services/usuariosidedit.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  columnas = [
    'nombre',
    'apellido',
    'nacimiento',
    'sexo',
    'fk_tipo_us',
    'foto',
    'iconos',
  ];
  dataSource: MatTableDataSource<Usuario>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  myTypeUser: number = 3;
  subscription1$ = new Subscription();
  subscription2$ = new Subscription();

  constructor(
    private usuariosService: UsuariosService,
    private loginService: LoginService,
    private usuariosIdEditService: UsuariosideditService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.getInfoMyUser();
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.subscription1$ = this.usuariosService
      .getAllUsers()
      .subscribe((usuario: Usuario[]) => {
        this.dataSource.data = usuario;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  getInfoMyUser() {
    this.subscription2$ = this.loginService
      .getDataUser()
      .subscribe((user: any) => {
        this.myTypeUser = user.usuario.fk_tipo_us;
      });
  }

  sendId(id: number) {
    this.usuariosIdEditService.setId(id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
  }
}
