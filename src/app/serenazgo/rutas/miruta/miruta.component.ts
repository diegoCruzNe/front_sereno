import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-miruta',
  templateUrl: './miruta.component.html',
  styleUrls: ['./miruta.component.css'],
})
export class MirutaComponent implements OnInit {
  constructor(private locationService: LocationService) {}

  ngOnInit() {
    this.getLocationBroswer();
  }

  getLocationBroswer() {
    navigator.geolocation.watchPosition((resp) => {
      console.log(resp.coords);
      console.log(resp.timestamp);
    });
  }
}
