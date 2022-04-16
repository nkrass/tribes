import { Component, ViewChild, TemplateRef, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, PLATFORM_ID, Inject, ViewChildren, QueryList, ViewEncapsulation, Input } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { CartService } from '../../../../../apps/portal/src/app/cart/shared/cart.service';

import { AnalyticsService } from '../../../../../apps/portal/src/app/shared/analytics.service'
import { DOCUMENT } from '@angular/common';
import { RxState } from '@rx-angular/state';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode, SwiperOptions } from "swiper";
import { ProductQuery } from '@tribes/data-access';
import { ColorsDictionary } from '@tribes/colors-dictionary';
import { ProductMock } from '../placeholders/product.placeholder';
import { Router } from '@angular/router';
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

interface ProductState {
  selectedSizes: string[]
  modalRouterLink: string[]
}

@Component({
  selector: 'tribes-product-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ProductDetailsComponent {
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'

  @ViewChild('productExtraInfoTabs', { static: false }) productExtraInfoTabs!: TabsetComponent;
  @ViewChildren("checkboxes") checkboxes!: QueryList<ElementRef>
  @Input('product') product: ProductQuery['product']
  @Input('isLoading') isLoading: boolean
  
  readonly selectedSizes$ = this.state.select('selectedSizes')
  readonly selectSizeBtn$ = new Subject();
  readonly addToCartBtn$ = new Subject();

  public modalRef?: BsModalRef
  public colorsDict = ColorsDictionary.getColorName

  public swiperConfig: SwiperOptions = {
    slidesPerView: 2.5,
    spaceBetween: 0,
    zoom: true,
    mousewheel: true,
    direction: 'horizontal',
    freeMode: true,
    grabCursor: true,
    navigation: true,
    pagination: true,
    cssMode: false,
    breakpoints: {
      '320': { slidesPerView: 1 },
      '960': { slidesPerView: 2.5 }
    }
  };

  public swiperVariantsConfig: SwiperOptions = {
    ...this.swiperConfig, 
    slidesPerView: 7,
    zoom: false,
    breakpoints: {
      '320': { slidesPerView: 4 },
      '960': { slidesPerView: 7 }
    }
  };
  constructor(
    private cartService: CartService,
    private elRef: ElementRef,
    private router: Router,
    private modalService: BsModalService,
    private analytics: AnalyticsService,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID,
    private state: RxState<ProductState>

  ) {
    this.state.set({ selectedSizes: [] })
    this.state.connect(this.selectSizeBtn$, this.onSelectSize.bind(this));
    this.state.connect(this.addToCartBtn$, this.onAddToCart.bind(this))
  }
  private onSelectSize(state: ProductState, event: any){
    const barcode: string = event.target.dataset.barcode
      const { selectedSizes } = state
      const checked = event.target.checked
      if (checked){
        !selectedSizes.includes(barcode) && selectedSizes.push(barcode);
        const barcodes = this.product.barcodes.filter(b => b.barcode === barcode)
        const cartItems = barcodes.map(barcode => ({ barcode, quantity: 1, price: this.product.priceSale }))
        this.analytics.sizeClick(cartItems)
      } else {
        selectedSizes.includes(barcode) && selectedSizes.splice(selectedSizes.indexOf(barcode), 1)
      }
      return {...state, selectedSizes}
  }
  onVariantClick(sku: string, template: TemplateRef<any>) {
    if (this.state.get("selectedSizes").length === 0) this.router.navigate(['/product', sku])
    else {
      this.state.set({modalRouterLink: ['/product', sku]})
      this.modalRef = this.modalService.show(template, {
      })
    }
  }
  onVariantModalClose(type: string){
    this.modalRef?.hide()
    if (type = 'addToCart') { 
      this.addToCartBtn$.next({})
      this.router.navigate(this.state.get('modalRouterLink'))
    } else if (type = 'proceedWithout') {
      this.state.set({ selectedSizes: [] })
      this.router.navigate(this.state.get('modalRouterLink'))
    } else {}
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class:'container',
    });
  }
  scrollTo(id: string){
    this.elRef.nativeElement.querySelector('#' + id).scrollIntoView();
  }
  public selectTab(tabId: number) {
    this.productExtraInfoTabs.tabs[tabId].active = true;
  }

  private onAddToCart(state: ProductState, event: any) {
    const { selectedSizes } = state
    const barcodes = selectedSizes.map(e => this.product.barcodes.find(b => b.barcode === e))
    const cartItems = barcodes.map(barcode => ({ barcode, quantity: 1, price: this.product.priceSale, }))
    this.cartService.addItems(cartItems)
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    return {...state, selectedSizes: []}
  }
}
