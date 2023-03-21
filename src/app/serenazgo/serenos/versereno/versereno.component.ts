import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SerenosService } from '../services/serenos.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-versereno',
  templateUrl: './versereno.component.html',
  styleUrls: ['./versereno.component.css'],
})
export class VerserenoComponent implements OnInit {
  sereno: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private serenoService: SerenosService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.serenoService.getSerenoById(id)))
      .subscribe((res) => {
        this.sereno = res;
      });
  }
}
