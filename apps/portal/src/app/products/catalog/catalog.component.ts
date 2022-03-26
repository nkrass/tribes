import { Component, Input, OnDestroy, OnInit, ViewChild, TemplateRef, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { switchMap, map, pluck, startWith, Subject, tap, filter } from 'rxjs';
import { CartService } from '../../cart/shared/cart.service';
import { SEOService } from '../../shared/seoservice.service';
import { ItemList, Product as SchemaProduct, WithContext } from 'schema-dts';
import { environment } from '../../../environments/environment'
import { AnalyticsService } from 'app/shared/analytics.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MessageService } from 'app/messages/message.service';
import { NavigationService } from 'app/shared/navigation.service';
import { RxState } from '@rx-angular/state';
import { CartQuery, CategoriesListGQL, CategoriesListQuery, ProductGQL, ProductQuery } from 'gql/types';

const staticAssetsUrl = environment.staticAssetsUrl
const cdnUrl = environment.cdnUrl


interface ProductState {
  categories: CategoriesListQuery['categories'],
  isLoading: boolean
}

@Component({
  selector: 'tribes-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: [
    './catalog.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class CatalogComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  // readonly schema$ = this.state.select('schema');
  readonly isLoading$ = this.state.select('isLoading');
  readonly categories$ = this.state.select('categories');

  readonly selectSizeBtn$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private seo: SEOService,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private modalService: BsModalService,
    private analytics: AnalyticsService,
    private messageService: MessageService,
    private navigation: NavigationService,
    @Inject(DOCUMENT) private doc: any,
    @Inject(PLATFORM_ID) private platformId: Object,
    private productGql: ProductGQL,
    private state: RxState<ProductState>
  ) {
    const fetchProductOnUrlChange$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productGql.watch({ input: { 'sku': params.get('id')! } }).valueChanges.pipe(
          pluck('data', 'product'),
          map((product) => {
           return { product, isLoading: false, urlSKU: params.get('id')!, schema: this.seo.buildProductSeoAndSchema(product)} 
          }),
          tap(({product}) => {
            this.analytics.viewContent( product.barcodes.map(barcode => ({ barcode, price: product.priceSale, quantity: 1 })))
          }),
          
        )
      }),
      startWith({isLoading: true })
    )
    // this.state.connect(fetchProductOnUrlChange$)
    // this.state.connect(this.selectSizeBtn$, this.onSelectSize.bind(this));
    // this.state.connect(this.addToCartBtn$, this.onAddToCart.bind(this))
  }
}
