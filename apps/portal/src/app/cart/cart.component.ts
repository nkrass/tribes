import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CartService } from './shared/cart.service';
import { AnalyticsService } from '../shared/analytics.service'
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { CartItems, CartQuery, CartStatus } from 'gql/types';
import { AppGlobalState, APP_GLOBAL_STATE } from '../app-global.state';

interface CartState {
  cart: CartQuery['cart']
}
@Component({
  selector: 'tribes-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  public showDistributor: boolean = true
  readonly cart$ = this.globalState.select('cart')

  constructor(
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private analytics: AnalyticsService,
    private router: Router
  ){
    // this.connect('cart', this.globalState.select('cart'))
  }
  initCheckout(){
    this.analytics.initiateCheckout(this.globalState.get('cart').cartItems)
    this.router.navigate(['/checkout'])
  }
  // goBack() {}
  public onSelectShop(shop: string){
    if (shop === 'mytribes'){
      this.showDistributor = false
    } else {
      this.showDistributor = true
      // this.scrollToTop()
    }
    this.cdr.detectChanges()
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
  public onClearCart(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart(CartStatus.Closed)

  }

  public removeItem(event: any, barcode: CartItems['barcode']) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Подтверждаете удаление")) {
      this.cartService.deleteItems([barcode])
    }
  }

  public updateAmount(barcode: CartItems['barcode'], newQuantity: number) {
    this.cartService.updateCartItemsAmount(barcode, newQuantity);
  }


  // public checkAmount(item: CartItem) {
  //   this.cartService.updateItemAmount(
  //     this.get('cart'),
  //     item,
  //     item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
  //   );
  // }
}
