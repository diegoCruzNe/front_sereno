import { Injectable } from '@angular/core';
import { of, interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public useLocation?: [number, number];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    /* this.getUserLocation() */
  }

  public async getUserLocationPromise(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.latitude, coords.longitude];
          resolve(this.useLocation);
        },
        (err) => {
          alert('No se pudo obtener la ubicación del usuario');
          console.log(err);
          reject();
        }
      );
    });
  }

  public getUserLocationObs() {
    return new Observable<GeolocationPosition>((observer) => {
      const watchPositionId = navigator.geolocation.watchPosition(
        (pos) => observer.next(pos),
        (err) => observer.error(err)
      );

      return () => {
        navigator.geolocation.clearWatch(watchPositionId);
      };
    });
  }

  // function than return a position observable
}

// navigator.geolocation -> emite valores mientras se va moviendo
