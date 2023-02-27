import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home-serenos',
  templateUrl: './home-serenos.component.html',
  styleUrls: ['./home-serenos.component.css'],
})
export class HomeSerenosComponent implements OnInit {
  badge = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.verRuta();
  }

  verRuta() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        event.url === '/serenazgo/serenos/addedit'
          ? (this.badge = false)
          : (this.badge = true);
      }
    });

    this.router.url === '/serenazgo/serenos/addedit'
      ? (this.badge = false)
      : (this.badge = true);
  }
}
