import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location.service';
import { DialogUbicationComponent } from './dialog-ubication/dialog-ubication.component';

@Component({
  selector: 'app-miruta',
  templateUrl: './miruta.component.html',
  styleUrls: ['./miruta.component.css'],
})
export class MirutaComponent implements OnInit, OnDestroy {
  subs1$ = new Subscription();
  infoPos?: GeolocationPosition;

  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getLocationBroswer();
  }

  getLocationBroswer() {
    this.subs1$ = this.locationService.getUserLocationObs().subscribe({
      next: (pos) => {
        console.log(pos);
        this.infoPos = pos;
      },
      error: (err) => {
        console.log(err);
        this.openDialogPermissions();
      },
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
