import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  badge: boolean = false;
  routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.subscribeToRouterEvents();
  }
  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  subscribeToRouterEvents() {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event.routerEvent) {
        if (event.routerEvent.url === '/serenazgo/usuarios/list' || event.routerEvent.urlAfterRedirects === '/serenazgo/usuarios/list') {
          this.badge = true;
        } else {
          this.badge = false;
        }
      }
    });
  }
}
