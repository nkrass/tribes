import { Inject, Injectable, OnDestroy, Optional, PLATFORM_ID } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { NavigationEnd } from '@angular/router';
import { catchError, combineLatest, distinctUntilChanged, filter, from, fromEvent, interval, map, of, ReplaySubject, Subject, switchMap, take, tap, timeout } from 'rxjs';
import { takeUntil } from 'rxjs';
import { waitFor } from './rxjs.extensions';
import { CartQuery } from '@tribes/data-access';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements OnDestroy {
  private readonly unsubscribe$ = new Subject();
  private eventsSource$ = new ReplaySubject<{event: string, data: unknown}>();
  private runAnalytics = isPlatformBrowser(this.platformId) && process.env['NODE_ENV'] === 'production';
  private ymID = 55558861
  public clientID?: string
  public metrics_loaded$ = new Subject();

  constructor(
    private gtmService: GoogleTagManagerService,
    private _cookieService: CookieService,
    @Inject(PLATFORM_ID) private readonly platformId: typeof PLATFORM_ID,
    @Optional() @Inject(REQUEST) private request: Request,
    @Inject(DOCUMENT) private document: Document
  ) { 
    // const that = this
    //1. wait for analytics scripts to load
    const GA_LOADED = () => window['ga'] && window['ga']?.loaded
    this.runAnalytics && combineLatest([
      fromEvent(this.document, 'yacounter55558861inited').pipe(
        // take(1),
        // tap(e => {console.log("Started loading YAM")}),
        tap(this.getYMClientID.bind(this)),
        timeout({
          first: 8000,
          with: () => of(true).pipe(tap( _ => console.log("YAM not loaded, skipping, status: ", _) ))
        })),
      interval(200).pipe(
          // tap(e => {console.log("Started loading GA")}),
          filter(GA_LOADED),
          distinctUntilChanged(),
          take(1),
          timeout({
            first: 8000,
            with: () => of(true).pipe(tap( _ => console.log("GA not loaded, skipping, status: ", _) ))
          }))
    ])
    .subscribe(() => this.metrics_loaded$.next(true))

    //2. init analytics and metrika through google tag
    this.runAnalytics && from(this.gtmService.addGtmToDom())
      .pipe(
        catchError(val => {
          this.metrics_loaded$.next(true)
          return of(val)
        }),
        // tap(()=> console.log('Analytics booting')),
        waitFor(this.metrics_loaded$),
        // tap(() => console.log('Analytics loaded')),
        switchMap(() => this.eventsSource$),
        map(e => this[e.event](e.data)),
        takeUntil(this.unsubscribe$),
    ).subscribe()
    
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
  async getYMClientID(){
    if (this.clientID) return this.clientID;
    try {
      const id = await new Promise((resolve) => {
        if (window['ym']) window['ym'](this.ymID, 'getClientID', (clientID: string) => resolve(clientID))
        else resolve(undefined)
      })
      this.clientID = id as string
    } catch(e) {
      this.clientID = undefined
    }
    return this.clientID;
  }
  getCookie(key: string) {
    return this._cookieService.get(key);
  }
  getRefQueryParam(name: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  public redirectTo(url: string){
    this.eventsSource$.next({event: '_redirectTo', data: url})
  }
  private _redirectTo(url: string){
    setTimeout(() => {
      this.document.location.href = url
    }, 3000)
  }
  public pageView(e: NavigationEnd){
    this.eventsSource$.next({event: '_pageView', data: e})
  }
  private _pageView(e: NavigationEnd){
    const gtmEvent = {
      event: 'page',
      pageName: e.url,
      utm_content: this.getRefQueryParam('utm_content'),
      utm_campaign: this.getRefQueryParam('utm_campaign'),
      utm_source: this.getRefQueryParam('utm_source'),
      utm_medium: this.getRefQueryParam('utm_medium'),
      utm_term: this.getRefQueryParam('utm_term')
    };
    this.gtmService.pushTag(gtmEvent).then(() => {
      window['ym']?.(this.ymID, 'reachGoal','ya_pageview_general')
    }).catch(() => console.log('Error in loading GTM'));
  }

  public sizeClick(items: CartQuery['cart']['cartItems']){
    this.eventsSource$.next({event: '_sizeClick', data: items})
  }
  private _sizeClick(items: CartQuery['cart']['cartItems']){
    const gtmEvent = {
      ecommerce: {
        currencyCode: items[0]?.currency || "RUB",
        click : {
          products : items.map(p => {
            return {
              id: p.barcode?.barcode,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent).catch(() => console.log('Error in loading GTM'));
  }
  public viewContent(items: CartQuery['cart']['cartItems']){
    this.eventsSource$.next({event: '_viewContent', data: items})
  }
  private _viewContent(items: CartQuery['cart']['cartItems']){
    const gtmEvent = {
      ecommerce: {
        currencyCode: items[0]?.currency || "RUB",
        detail : {
          products : items.map(p => {
            return {
              id: p.barcode?.sku,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent)
    .then(() => {
      window['fbq']?.('track', 'ViewContent', { content_ids: items.map(i=> i.barcode), content_name: items[0].barcode?.title, content_type: 'product' })
    })
    .catch(() => console.log('Error in loading GTM'));
  }
  public removeFromCart(items: CartQuery['cart']['cartItems']){
    this.eventsSource$.next({event: '_removeFromCart', data: items})
  }
  private _removeFromCart(items: CartQuery['cart']['cartItems']){
    const gtmEvent = {
      ecommerce: {
        currencyCode: items[0].currency || "RUB",
        remove : {
          products : items.map(p => {
            return {
              id: p.barcode?.barcode,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent).catch(() => console.log('Error in loading GTM'))
  }
  public addToCart(items: CartQuery['cart']['cartItems']){
    this.eventsSource$.next({event: '_addToCart', data: items})
  }
  private _addToCart(items: CartQuery['cart']['cartItems']){
    const gtmEvent = {
      // event: 'gtm-ee-event',
      // 'gtm-ee-event-category': 'Enhanced Ecommerce',
      // 'gtm-ee-event-non-interaction': false,
      ecommerce: {
        currencyCode: items[0].currency || "RUB",
        add : {
          products : items.map(p => {
            return {
              id: p.barcode?.barcode,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent).then(() => {
      window['fbq']?.('track', 'AddToCart', { 
        content_ids: items.map(i => i.barcode?.barcode),
        content_type: 'product',
        content_name: items[0].barcode?.sku, 
        currency: items[0].currency || "RUB", 
        value: items.reduce((acc, pv) => (pv.quantity as number) * (pv.price as number) + acc, 0)
      });
      window['ym']?.(this.ymID,'reachGoal','ya_addtocart')
    }).catch(() => console.log('Error in loading GTM'))
  }
  public initiateCheckout(items: CartQuery['cart']['cartItems']){//product_skus: string[], product_title: string, price: number|string){
    this.eventsSource$.next({event: '_initiateCheckout', data: items})
  }
  private _initiateCheckout(items: CartQuery['cart']['cartItems']){
    const gtmEvent = {
      ecommerce: {
        currencyCode: items[0].currency || "RUB",
        checkout : {
          products : items.map(p => {
            return {
              id: p.barcode?.barcode,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent)
    .then(() => {
      window['fbq']?.('track', 'InitiateCheckout', {
        content_ids: items.map(p => p.barcode), 
        content_name: 'CartCheckout', 
        content_type: 'product',
        currency: items[0].currency || "RUB",
        value: items.reduce((acc, pv) => (pv.quantity as number) * (pv.price as number) + acc, 0)
      });
      window['ym']?.(this.ymID,'reachGoal','ya_initiatecheckout', { order_price: items.reduce((acc, pv) => (pv.quantity as number) * (pv.price as number) + acc, 0), currency: "RUB"})
    })
    .catch(() => console.log('Error in loading GTM'))
  }

  purchase(items: CartQuery['cart']['cartItems'], trx_id: string|number){//product_skus: string[], total_amount: number|string){
    this.eventsSource$.next({event: '_purchase', data: {items, trx_id}})
  }
  _purchase(data: {items: CartQuery['cart']['cartItems'], trx_id: string|number}){
    const {trx_id, items} = data;
    const gtmEvent = {
      ecommerce: {
        currencyCode: items[0].currency || "RUB",
        actionField: {
          id: trx_id, // Transaction ID. Required for purchases and refunds.
          affiliation: this.getRefQueryParam('utm_source') || 'mytribes.ru',
          revenue: items.reduce((acc, pv) => (pv.quantity as number) * (pv.price as number) + acc, 0), // Total transaction value (incl. tax and shipping)
          // tax:'4.90',
          // 'shipping': '5.99',
          // 'coupon': 'SUMMER_SALE'
        },
        purchase : {
          products : items.map(p => {
            return {
              id: p.barcode?.barcode,
              sku: p.barcode?.sku,
              name: p.barcode?.title,
              brand: 'tribes',
              category: p.barcode?.category,
              quantity: p.quantity,
              price: p.price
            }
          })
        }
      }
    }
    this.gtmService.pushTag(gtmEvent)
    .then(() => {
      window['fbq']?.('track', 'Purchase', { 
        content_ids: items.map(i => i.barcode?.barcode),
        currency: items[0].currency || "RUB",
        value: items.reduce((acc, pv) => (pv.quantity as number) * (pv.price as number) + acc, 0),
        content_type: 'product'
      });
      window['ym']?.(this.ymID,'reachGoal','ya_purchase')
    })
    .catch(() => console.log('Error in loading GTM'))
  }
}
