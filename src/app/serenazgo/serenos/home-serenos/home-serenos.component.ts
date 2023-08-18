import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-serenos',
  templateUrl: './home-serenos.component.html',
  styleUrls: ['./home-serenos.component.css'],
})
export class HomeSerenosComponent implements OnInit, OnDestroy {
  badge: boolean = false;
  private routerSubscription!: Subscription;

  constructor(private router: Router) {}

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.verRuta();
  }

  verRuta() {
    this.routerSubscription = this.router.events.subscribe((event: any) => {
      if (event.routerEvent) {
        if (event.routerEvent.url === '/serenazgo/serenos/list' || event.routerEvent.urlAfterRedirects === '/serenazgo/serenos/list') {
          this.badge = true;
        } else this.badge = false;
      }
    });     
  }
}
