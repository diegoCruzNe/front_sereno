import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-serenos',
  templateUrl: './home-serenos.component.html',
  styleUrls: ['./home-serenos.component.css'],
})
export class HomeSerenosComponent implements OnInit {
  badge: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verRuta();
  }

  verRuta() {
    this.router.events.subscribe((event: any) => {
      if (event.routerEvent) {
        if (event.routerEvent.url === '/serenazgo/serenos/list' || event.routerEvent.urlAfterRedirects === '/serenazgo/serenos/list') {
          this.badge = true;
        } else this.badge = false;
      }
    });     
  }
}
