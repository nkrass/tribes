import { Component, ViewChild, TemplateRef, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { switchMap, map, pluck, startWith, Subject, tap  } from 'rxjs';
import { CartService } from '../../cart/shared/cart.service';
import { SEOService } from '../../shared/seoservice.service';
import { Product as SchemaProduct, WithContext } from 'schema-dts';
import { environment } from '../../../../src/environments/environment'
import { AnalyticsService } from '../../shared/analytics.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { MessageService } from '../../messages/message.service';
import { RxState } from '@rx-angular/state';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode } from "swiper";
import { ProductMock } from '../shared/product-placeholder.mock';
import { CartQuery, ProductGQL, ProductQuery } from '@tribes/data-access';
import { ColorsDictionary } from 'libs/colors-dictionary/src';
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

const staticAssetsUrl = environment.staticAssetsUrl
const cdnUrl = environment.cdnUrl

interface ProductState {
  product: ProductQuery['product']
  isLoading: boolean
  urlSKU: string
  schema: WithContext<SchemaProduct>
  cart: CartQuery['cart'],
  selectedSizes: string[]
}

@Component({
  selector: 'tribes-product-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ProductDetailComponent {
  public staticAssetsUrl: string = staticAssetsUrl

  @ViewChild('productExtraInfoTabs', { static: false }) productExtraInfoTabs!: TabsetComponent;
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>
  
  readonly schema$ = this.state.select('schema');
  readonly isLoading$ = this.state.select('isLoading');
  readonly product$ = this.state.select('product');
  readonly urlSKU$ =this.state.select('urlSKU')
  readonly selectedSizes$ = this.state.select('selectedSizes')
  readonly selectSizeBtn$ = new Subject();
  readonly addToCartBtn$ = new Subject();

  public modalRef?: BsModalRef

  public colorsDict = ColorsDictionary.getColorName

  public promotions = { marketplace: undefined, promocode: undefined, rate: undefined, redirect: false}
  public setup_promotions(){
    const {pr, rd, mp, rt} = this.route.snapshot.queryParams
    this.promotions.marketplace = mp
    this.promotions.promocode = pr
    this.promotions.rate = rt
    this.promotions.redirect = !!rd
    if (this.promotions.redirect === true) {
      this.analytics.redirectTo('https://www.wildberries.ru/catalog/'+ (this.state.get('product') as any).wildberriesId +'/detail.aspx?targetUrl=BP')
    }
  }
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
        return this.productGql.watch({ input: { 'sku': params.get('id') as string} }).valueChanges.pipe(
          pluck('data', 'product'),
          map((product) => {
           return { product, isLoading: false, urlSKU: params.get('id') as string, schema: this.seo.buildProductSeoAndSchema(product)} 
          }),
          tap(({product}) => {
            this.analytics.viewContent( product.barcodes.map(barcode => ({ barcode, price: product.priceSale, quantity: 1 })))
            this.setup_promotions()
          }),
          
        )
      }),
      startWith({isLoading: true, urlSKU: this.route.snapshot.paramMap.get('id') as string, selectedSizes: [], product: ProductMock })
    )
    this.state.connect(fetchProductOnUrlChange$)
    this.state.connect(this.selectSizeBtn$, this.onSelectSize.bind(this));
    this.state.connect(this.addToCartBtn$, this.onAddToCart.bind(this))
  }
  private onSelectSize(state: ProductState, event: any){
    const barcode: string = event.target.dataset.barcode
      const { selectedSizes, product } = state
      const checked = event.target.checked
      if (checked){
        !selectedSizes.includes(barcode) && selectedSizes.push(barcode);
        const barcodes = product.barcodes.filter(b => b.barcode === barcode)
        const cartItems = barcodes.map(barcode => ({ barcode, quantity: 1, price: product.priceSale }))
        this.analytics.sizeClick(cartItems)
      } else {
        selectedSizes.includes(barcode) && selectedSizes.splice(selectedSizes.indexOf(barcode), 1)
      }
      return {...state, selectedSizes}
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class:'container'
    });
  }
  scrollTo(id: string){
    this.elRef.nativeElement.querySelector('#' + id).scrollIntoView();
  }
  // scrollToTop() {
    // if (isPlatformBrowser(this.platformId)){
    //   (function smoothscroll() {
    //     const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    //     if (currentScroll > 0) {
    //         window.requestAnimationFrame(smoothscroll);
    //         window.scrollTo(0, currentScroll - (currentScroll / 8));
    //     }
    //   })();
    // }
  // }
  public selectTab(tabId: number) {
    this.productExtraInfoTabs.tabs[tabId].active = true;
  }

  private onAddToCart(state: ProductState, event: any) {
    const { product, selectedSizes } = state
    const barcodes = selectedSizes.map(e => product.barcodes.find(b => b.barcode === e))
    const cartItems = barcodes.map(barcode => ({ barcode, quantity: 1, price: product.priceSale, }))
    // this.cartService.cartShow$.next(true)
    this.cartService.addItems(cartItems)
    // this.analytics.addToCart(cartItems)
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.messageService.add('Товар добавлен в корзину');
    return {...state, selectedSizes: []}
  }
}
