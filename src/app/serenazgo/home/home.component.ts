import { MediaMatcher } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  HostBinding,
  AfterContentInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faCarSide,
  faPeopleGroup,
  faPersonMilitaryPointing,
  faUsersGear,
  faUserLock,
  faRoute,
} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {
  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;
  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  faCarSide = faCarSide;
  faUsersGear = faUsersGear;
  faUserLock = faUserLock;
  faPeopleGroup = faPeopleGroup;
  faPersonMilitaryPointing = faPersonMilitaryPointing;
  faRoute = faRoute;
  permissionsUser: boolean = false;
  permissionsSereno: boolean = false;
  subscription1$ = new Subscription();
  subscription2$ = new Subscription();
  subscription3$ = new Subscription();

  constructor(
    private overlay: OverlayContainer,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private loginService: LoginService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 800px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getUserType();
    this.slideToggle();
    const ls = localStorage.getItem('tema');
    if (ls === 'true') {
      //this.className = this.darkClassName;
      this.overlay.getContainerElement().classList.add(this.darkClassName);
      this.toggleControl.setValue(true);
    }
    this.getBehaviorSubject();
  }

  getUserType() {
    this.subscription1$ = this.loginService
      .getDataUser()
      .subscribe((res: any) => {
        if (res.usuario.fk_tipo_us === 1 || res.usuario.fk_tipo_us === 2)
          this.permissionsUser = true;
      });
  }

  ngAfterContentInit() {}

  changeTheme(val: boolean) {
    this.className = val ? this.darkClassName : this.lightClassName;
    if (val)
      this.overlay.getContainerElement().classList.add(this.darkClassName);
    else
      this.overlay.getContainerElement().classList.remove(this.darkClassName);
  }

  slideToggle() {
    this.subscription2$ = this.toggleControl.valueChanges.subscribe(
      (res: any) => {
        localStorage.setItem('tema', res);
        this.changeTheme(res);
      }
    );
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.subscription1$.unsubscribe();
    this.subscription2$.unsubscribe();
    this.subscription3$.unsubscribe();
  }

  getBehaviorSubject() {
    this.subscription3$ = this.loginService
      .getBehaviorSubject()
      .subscribe((res) => {
        if (res?.usuario.fk_tipo_us === 3) this.permissionsSereno = true;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth');
    this.loginService.cleanBehaviorSubject();
  }
}
