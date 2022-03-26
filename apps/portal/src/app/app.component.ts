import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OffcanvasService } from './core/shared/offcanvas.service';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent, Params } from '@angular/router';
import { filter, map, mergeMap, takeUntil, Subject } from 'rxjs';
import { SEOService } from './shared/seoservice.service';
import { CartService } from './cart/shared/cart.service';
import { AnalyticsService } from './shared/analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();

  constructor(
    private cdr: ChangeDetectorRef,
    public offcanvasService: OffcanvasService,
    private _seoService: SEOService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private analytics: AnalyticsService,
    ) {
    }
  
  ngOnInit(){
    this.router.events.pipe(
      filter((event: any) => {
        return event instanceof NavigationEnd
      }),
      map((e: NavigationEnd ) => {
        this.analytics.pageView(e)
        return e
      }),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      // filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
      takeUntil(this.unsubscribe$)
     )
    .subscribe((data) => {
      this._seoService.setTitle(data['title']);
      this._seoService.currentRouteData$.next(data as any)
      this._seoService.setCanonicalURL();
      this.offcanvasService.toggleOffcanvasNavigation({menu_visible: false, search_visible: false});
      this._seoService.setMeta(data);
      this.cartService.cartShow$.next(false);
      this.cdr.markForCheck()
     }); 
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
