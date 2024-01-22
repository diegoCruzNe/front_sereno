import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, take } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { DialogUbicationComponent } from './dialog-ubication/dialog-ubication.component';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-miruta',
  templateUrl: './miruta.component.html',
  styleUrls: ['./miruta.component.css'],
})
export class MirutaComponent implements OnInit, OnDestroy {
  subs1$ = new Subscription();
  infoPos?: GeolocationPosition;
  myMap?: google.maps.Map;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.onPermissionsChange();
    this.getLocationBroswer();
  }






  async loadMap(lat: number = 0, lng: number = 0) {
    let markers: google.maps.Marker[] = [
      new google.maps.Marker({
        position: {
          lat:  -6.834839409165937 ,
          lng: -79.93054838055778 ,
        }
      }),

      new google.maps.Marker({
        position: {
          lat:  -6.831004461555615, 
          lng: -79.93938894129602 ,
        }
      }),
    ];
    const { AdvancedMarkerElement } = 
      await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    this.myMap = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat, lng },
        zoom: 11,
        mapId: '4504f8b37365c3d0',
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        draggableCursor: 'default',
      }
    );

     markers.forEach((marker) => marker.setMap(null));

    markers.forEach((marker, i)=> {
       const marcador = new AdvancedMarkerElement({
        position: marker.getPosition(),
        map: this.myMap,
       })
    })

    new google.maps.Marker({
      position: { lat, lng },
      map: this.myMap,
    });

    this.myMap.panTo({ lat, lng });
  }









  getLocationBroswer() {
    this.subs1$ = this.locationService
      .getUserLocationObs()
      .pipe(take(1))
      .subscribe({
        next: (pos) => {
          // console.log(pos);
          this.infoPos = pos;

          const loader = new Loader({
            apiKey: environment.api_maps,
            libraries: ['places'],
          });

          loader.importLibrary('maps').then(() => {
            this.loadMap(pos.coords.latitude, pos.coords.longitude);
          });
        },
        error: (err) => {
          // console.log(err);
          this.openDialogPermissions();
        }
      });
  }

  updateUbication() {
    this.locationService
      .getUserLocationObs()
      .pipe(take(1))
      .subscribe({
        next: (pos) => {
          console.log(pos);
        },
        error: () => this.openDialogPermissions(),
      });
  }

  onPermissionsChange() {
    console.log('onPermissionsChange');
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') return this.openDialogPermissions();
    });
  }

  openDialogPermissions() {
    const dialogRef = this.dialog.open(DialogUbicationComponent, {
      disableClose: true,
    });
  }

  ngOnDestroy() {
    this.subs1$.unsubscribe();
  }
}
