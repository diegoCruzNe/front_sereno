import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuariosideditService } from 'src/app/services/usuariosidedit.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  id_user: number;

  constructor(
    private usuariosIdEditService: UsuariosideditService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.id_user = usuariosIdEditService.getId();
  }

  ngOnInit(): void {
    if (this.id_user === 0) this.router.navigate(['/serenazgo/usuarios/list']);
  }
}
