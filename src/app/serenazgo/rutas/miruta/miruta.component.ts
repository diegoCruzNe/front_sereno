import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-miruta',
  templateUrl: './miruta.component.html',
  styleUrls: ['./miruta.component.css'],
})
export class MirutaComponent implements OnInit, OnDestroy {
  subs1$ = new Subscription();
  infoPos?: GeolocationPosition;

  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getLocationBroswer();
  }

  getLocationBroswer() {
    this.subs1$ = this.locationService.getUserLocationObs().subscribe((pos) => {
      console.log(pos.coords);
      this.infoPos = pos;
    });
  }

  ngOnDestroy() {
    this.subs1$.unsubscribe();
  }
}
