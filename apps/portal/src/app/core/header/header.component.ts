import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { OffcanvasService } from '../shared/offcanvas.service';
import { takeUntil } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
import { NavigationService } from '../../../app/shared/navigation.service';
import { CartService } from '../../../app/cart/shared/cart.service';
import { AppGlobalState, APP_GLOBAL_STATE } from 'app/app-global.state';
import { RxState } from '@rx-angular/state';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  public isCollapsed: boolean = true
  public canNavigateBack$ = this.navigation.canNavigateBack$
  public searchVisible: boolean = true

  readonly cart$ = this.globalState.select('cart')

  constructor(
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
    private authService: AuthService,
    private router: Router,
    private offcanvasService: OffcanvasService,
    private cdr: ChangeDetectorRef,
    private navigation: NavigationService,
    private cartService: CartService
  ) {

  }
  back(): void {
    this.navigation.back()
  }
  ngOnInit() {
    
    this.offcanvasService.offcanvasNavigationState$.pipe(takeUntil(this.unsubscribe$))
      .subscribe(state => {
        this.isCollapsed = !state.menu_visible;
        this.searchVisible = state.search_visible
        this.cdr.markForCheck();
      })
    // this.authService.user
    // .pipe(takeUntil(this.unsubscribe$))
    // .subscribe((user) => {
    //   this.user = user;
    //   this.cdr.markForCheck()
    // });
  }

  public onLogOut(e: Event) {
    // this.authService.signOut();
    this.router.navigate(['/register-login']);
    e.preventDefault();
  }

  public openSearch(e: Event) {
    const current_state = this.offcanvasService.offcanvasNavigationState$.getValue()
    current_state.search_visible = true
    this.offcanvasService.toggleOffcanvasNavigation(current_state);
    e.preventDefault();
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
