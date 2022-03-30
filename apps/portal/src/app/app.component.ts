import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { OffcanvasService } from './core/shared/offcanvas.service';
import { Router, NavigationEnd, ActivatedRoute  } from '@angular/router';
import { filter, map, mergeMap, tap, Observable } from 'rxjs';
import { SEOService } from './shared/seoservice.service';
import { CartService } from './cart/shared/cart.service';
import { AnalyticsService } from './shared/analytics.service';
import { AppGlobalState, APP_GLOBAL_STATE } from './app-global.state';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'tribes-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class AppComponent {
  navigationEnd$: Observable<NavigationEnd> = this.router.events.pipe(filter((event: any) => {
    return event instanceof NavigationEnd
  }))
  setupSeo$ = this.navigationEnd$.pipe(
    map(() => this.activatedRoute),
    map((route) => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }),
    // filter((route) => route.outlet === 'primary'),
    mergeMap((route) => route.data),
    map(data => {
      this._seoService.setTitle(data['title']);
      this._seoService.currentRouteData$.next(data as any)
      this._seoService.setCanonicalURL();
      this._seoService.setMeta(data);
    })
   )

  constructor(
    private cdr: ChangeDetectorRef,
    public offcanvasService: OffcanvasService,
    private _seoService: SEOService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private analytics: AnalyticsService,
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
    ) {
      //setup history
      this.globalState.connect(this.navigationEnd$, (state, event) => {
        const routerHistory = state.routerHistory? [...state.routerHistory, event.urlAfterRedirects] : [event.urlAfterRedirects]
        if (event.urlAfterRedirects !== '/'){
          return {...state, canNavigateBack: true, routerHistory, showCart: false}
        } else {
          return {...state, canNavigateBack: false, showCart: false, routerHistory}
        }
      })
      //ru analytics
      this.globalState.hold(this.navigationEnd$.pipe(tap(this.analytics.pageView)))
      //setup SEO
      this.globalState.hold(this.setupSeo$)
    }
}
