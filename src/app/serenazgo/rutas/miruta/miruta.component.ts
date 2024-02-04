import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription,  take } from 'rxjs';
import { last } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { DialogUbicationComponent } from './dialog-ubication/dialog-ubication.component';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-miruta',
  templateUrl: './miruta.component.html',
  styleUrls: ['./miruta.component.css'],
})
export class MirutaComponent implements OnInit, OnDestroy { 
  wsUrl = environment.wsUrl;
  subs1$ = new Subscription();
  subs2$ = new Subscription();
  infoPos?: GeolocationPosition;
  myMap?: google.maps.Map;
  subject = webSocket(this.wsUrl);

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.onPermissionsChange();
    this.getLocationBroswer();
    this.subject.subscribe(console.log);
  }

  async loadMap(lat: number = 0, lng: number = 0) {
    let markers: google.maps.Marker[] = [];

    this.myMap = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        center: { lat, lng },
        zoom: 2,
        mapTypeId: 'roadmap',
        disableDefaultUI: true,
        draggableCursor: 'default',
      }
    );

    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate!.addEventListener('click', (ev) => {
      this.updateMapWithCurrentLocation(markers);
    });
  }

  updateMapWithCurrentLocation(markers: google.maps.Marker[]) {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.sendMyUbication(pos);

      markers.forEach((marker) => marker.setMap(null));

      markers.push(
        new google.maps.Marker({
          position: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          },
          map: this.myMap,
        })
      );

      this.myMap?.panTo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });

      if (markers.length > 0) markers.splice(0, markers.length - 1);
    });
  }

  getLocationBroswer() {
    this.subs1$ = this.locationService
      .getUserLocationObs()
      .pipe(take(1))
      .subscribe({
        next: (pos) => {
          this.infoPos = pos;

          const loader = new Loader({
            apiKey: environment.api_maps,
            libraries: ['places'],
          });

          loader
            .importLibrary('maps')
            .then(() => {
              this.loadMap(pos.coords.latitude, pos.coords.longitude);
            })
            .then(() => {
              const element: HTMLElement = document.getElementById(
                'btnUpdate'
              ) as HTMLElement;

              setTimeout(() => element.click(), 1200);
            });
        },
        error: (err) => this.openDialogPermissions(),
      });
  }

  sendMyUbication(pos: GeolocationPosition) {
    const info = {
      time: pos.timestamp,
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };

    this.subject.next('ws send');

   /*  this.subject.pipe( last() ).subscribe({
      next: (msg) => console.log('message received: ' + msg),
    }); */
  }

  updateUbication() {
    this.subs2$ = this.locationService
      .getUserLocationObs()
      .pipe(take(1))
      .subscribe({
        next: (pos) => {},
        error: () => this.openDialogPermissions(),
      });
  }

  onPermissionsChange() {
    //console.log('onPermissionsChange');
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
    this.subs2$.unsubscribe();
    //this.locationService.disconnectSocket();
    this.subject.complete();
  }
}
