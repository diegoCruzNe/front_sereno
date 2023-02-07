import { Component, OnInit } from '@angular/core';
import { Sereno } from 'src/app/interfaces/sereno.interface';
import { SerenosService } from '../services/serenos.service';

@Component({
  selector: 'app-list-serenos',
  templateUrl: './list-serenos.component.html',
  styleUrls: ['./list-serenos.component.css'],
})
export class ListSerenosComponent implements OnInit {
  listSerenos: Sereno[] = [];

  constructor(private serenoService: SerenosService) {}

  ngOnInit(): void {
    this.listarSerenos();
  }

  listarSerenos() {
    this.serenoService.getSerenos().subscribe((serenos) => {
      this.listSerenos = serenos;
    });
  }
}
