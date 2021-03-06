import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { interval, map, pluck, startWith, Subject, switchMap, take, tap } from 'rxjs';
import { SEOService } from '../shared/seoservice.service';
import { Product as SchemaProduct, WithContext } from 'schema-dts';
import { environment } from '../../../src/environments/environment'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';

import { RxState } from '@rx-angular/state';
import { ProductGQL, ProductQuery } from '@tribes/data-access';
import { AnalyticsService } from '@tribes/analytics';

const staticAssetsUrl = environment.staticAssetsUrl
// const cdnUrl = environment.cdnUrl

interface ProductState {
  product: ProductQuery['product']
  isLoading: boolean
  urlSKU: string
  schema: WithContext<SchemaProduct>
}

@Component({
  selector: 'tribes-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class RedirectComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();

  readonly product$ = this.state.select('product');
  readonly urlSKU$ =this.state.select('urlSKU')

  public REDIRECT_TIMEOUT_SEC = 3;
  public countdown: number = this.REDIRECT_TIMEOUT_SEC - 1
  public btn_disabled = true
  public get redirect_address(){
    return 'https://www.wildberries.ru/catalog/'+ this.state.get('product').externalId?.[0].id +'/detail.aspx?targetUrl=BP'
  }
  public promotions = { marketplace: undefined, promocode: undefined, rate: undefined, redirect: false}
  
  public setup_promotions(){
    const {pr, rd, mp, rt} = this.route.snapshot.queryParams
    this.promotions.marketplace = mp
    this.promotions.promocode = pr
    this.promotions.rate = rt
    const content = `${this.REDIRECT_TIMEOUT_SEC};URL='${this.redirect_address}'`
    this.meta.addTag({'http-equiv': 'refresh', url: this.redirect_address, content})
    this.analytics.redirectTo(this.redirect_address)
    this.loadJsScript(this.redirect_address)
  }
  constructor(
    private route: ActivatedRoute,
    private seo: SEOService,
    private cdr: ChangeDetectorRef,
    private analytics: AnalyticsService,
    private renderer: Renderer2,
    private meta: Meta,
    private productGql: ProductGQL,
    private state: RxState<ProductState>,
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID,
    @Inject(DOCUMENT) private doc: Document
  ) {
    const fetchProductOnUrlChange$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log('params', params)
        return this.productGql.fetch({ input: { 'sku': params.get('id') as string } }).pipe(
          pluck('data', 'product'),
          tap((product) => {
            this.analytics.viewContent( product.barcodes.map(barcode => ({ barcode, price: product.priceSale, quantity: 1 })))
          }),
          map((product) => { 
            // const schema = this.buildSchema({product})
           return { product, isLoading: false, urlSKU: params.get('id') as string, schema: this.seo.buildProductSeoAndSchema(product)} 
          }),
          
          startWith({isLoading: true, urlSKU: params.get('id') as string })
        )
      })
    )
    this.state.connect(fetchProductOnUrlChange$)
  }
  public loadJsScript(redirect_address: string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `setTimeout(function(){
      window.location.href = "${redirect_address}";
    }, ${this.REDIRECT_TIMEOUT_SEC * 1000});`
    this.renderer.appendChild(this.doc.body, script);
  }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      interval(1000).pipe(take(this.REDIRECT_TIMEOUT_SEC), map(i => {
        this.countdown  = this.REDIRECT_TIMEOUT_SEC - (i as number);
        if (this.countdown < 1) { this.btn_disabled = false  }
      })).subscribe(() => {
        this.cdr.markForCheck()
      })
    }
  }
  
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
