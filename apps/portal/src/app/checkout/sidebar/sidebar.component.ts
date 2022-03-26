import { Component, OnInit, OnDestroy } from '@angular/core';

import { CartService } from '../../cart/shared/cart.service';
import { CheckoutService, EDeliveryMethod } from '../shared/checkout.service';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { CartQuery } from 'gql/types';

@Component({
  selector: 'app-checkout-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public cartSubtotal!: number;
  public cart!: CartQuery['cart']
  public shipping!: number;
  public orderTotal!: number;
  private readonly unsubscribe$ = new Subject();

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit() {
    this.shipping = 0
    this.cartService.cart$.pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(cart => {
        this.cart = cart
        this.cartSubtotal = cart.totalAmount
        this.orderTotal = this.cartSubtotal + this.shipping
      })
    // TODO: shipping, hardcoded for now
    this.checkoutService.deliveryMethod$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(e => {
      switch(e){
        case EDeliveryMethod.wildberries:
          this.shipping = 0;
          break;
        case EDeliveryMethod.courier:
          this.shipping = 600;
          break;
        default: 
        this.shipping = 1500;
        break;
      }
      this.orderTotal = this.cartSubtotal + this.shipping;
    })
    
    
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
