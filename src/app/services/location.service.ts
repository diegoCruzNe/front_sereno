import { Injectable } from '@angular/core';
import { of, interval, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;
const protocol = window.location.protocol.replace(':', '')
const wsBaseUrl = base_url.replace(/^https?/, protocol === 'http' ? 'ws' : 'wss').replace(/\/api$/, '');

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  public useLocation?: [number, number];
  private socket: WebSocket;

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor() {
    this.socket = new WebSocket(wsBaseUrl);
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

  public connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.onmessage = (event) => observer.next(event.data);
      this.socket.onerror = (event) => observer.error(event);
      this.socket.onclose = () => observer.complete();
    });
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }

  disconnectSocket() {
    this.socket.close();
   }
}
