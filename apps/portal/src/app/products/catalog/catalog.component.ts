import { Component, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { switchMap, map, pluck, startWith, Subject, tap, } from 'rxjs';
import { CartService } from '../../cart/shared/cart.service';
import { SEOService } from '../../shared/seoservice.service';
import { ItemList, Product as SchemaProduct, WithContext } from 'schema-dts';
import { environment } from '../../../environments/environment'
import { AnalyticsService } from '../../shared/analytics.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MessageService } from '../../messages/message.service';
import { RxState } from '@rx-angular/state';
import { CategoriesListQuery, ProductGQL } from '@tribes/data-access';

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
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID,
    private productGql: ProductGQL,
    private state: RxState<ProductState>
  ) {
    const fetchProductOnUrlChange$ = this.route.paramMap.pipe(
      switchMap((params) => {
        return this.productGql.watch({ input: { 'sku': params.get('id') as string } }).valueChanges.pipe(
          pluck('data', 'product'),
          map((product) => {
           return { product, isLoading: false, urlSKU: params.get('id') as string, schema: this.seo.buildProductSeoAndSchema(product)} 
          }),
          tap(({product}) => {
            this.analytics.viewContent( product.barcodes.map(barcode => ({ barcode, price: product.priceSale, quantity: 1 })))
          }),
          
        )
      }),
      startWith({isLoading: true })
    )
    this.state.connect(fetchProductOnUrlChange$)
    // this.state.connect(this.selectSizeBtn$, this.onSelectSize.bind(this));
    // this.state.connect(this.addToCartBtn$, this.onAddToCart.bind(this))
  }
}
