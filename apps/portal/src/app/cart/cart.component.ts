import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { CartService } from '@tribes/cart';
import { AnalyticsService } from '@tribes/analytics'
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from '@tribes/global-state';
import { CartItems, CartQuery, CartStatus } from '@tribes/data-access';

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
  public showDistributor = true
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

  public onClearCart(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart(CartStatus.Closed)

  }

  public removeItem(event: Event,  barcode: CartItems['barcode']|any) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Подтверждаете удаление")) {
      this.cartService.deleteItems([barcode])
    }
  }

  public updateAmount(barcode: CartItems['barcode']|any, newQuantity: number) {
    this.cartService.updateCartItemsAmount(barcode, newQuantity);
  }
}
