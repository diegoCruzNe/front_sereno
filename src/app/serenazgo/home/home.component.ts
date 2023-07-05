import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';

  constructor(
    private overlay: OverlayContainer,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    //! TODO Almacenar tema en localstorage
    this.slideToggle();
    let ls = localStorage.getItem('modoTema');
  }

  changeTheme(algo: boolean) {
    this.className = algo ? this.darkClassName : this.lightClassName;
    if (algo) {
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
    }
  }

  slideToggle() {
    this.toggleControl.valueChanges.subscribe((res: any) => {
      localStorage.setItem('modoTema', res.toString());
      this.changeTheme(res);
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
  }
}
