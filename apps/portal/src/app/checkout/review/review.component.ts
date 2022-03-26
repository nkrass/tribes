import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs';

import { CheckoutService } from '../shared/checkout.service';
import { CartService } from '../../cart/shared/cart.service';
import { MessageService } from '../../messages/message.service';
import { OrderService } from '../../account/orders/shared/order.service';

import { Customer } from '../../models/customer.model';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { AnalyticsService } from 'app/shared/analytics.service'
import { CartQuery, CartStatus } from 'gql/types';

@Component({
  selector: 'tribes-checkout-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewComponent implements OnInit, OnDestroy {
  total!: number;
  cart!: CartQuery['cart'];
  customer: Customer = this.checkoutService.getOrderInProgress().customer;
  paymentMethod!: string;
  unsubscribe$ = new Subject();
  user!: User;


  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private analytics: AnalyticsService
  ) {}

  ngOnInit() {
    this.cartService.cart$.pipe(
      map(cart => {
        this.cart = cart,
        this.checkoutService.setOrderItems(this.cart.cartItems)
      }),
      switchMap(_ => this.checkoutService.orderInProgressChanged),
      map(order => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
        this.total = order.shippingMethod.fee + this.cart.cartItems.reduce((acc, item) => acc + item.price! * item.quantity!, 0); 
      }),
      takeUntil(this.unsubscribe$),
    )
    .subscribe(_ => {
      this.cdr.markForCheck()
    })
  }

  public onBack() {
    this.checkoutService.previousStep();
  }

  public onCompleteOrder() {
    const userUid = this.user?.uid;
    const order = this.checkoutService.getOrderInProgress();
    const total = this.total
    this.checkoutService.setOrderItems(this.cart.cartItems);
    this.submitUserOrder(order, total, userUid)
  }

  private submitUserOrder(order: Order, total: number, userUid?: string) {
    this.orderService
      .placeOrder(order, total, userUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
          this.cartService.clearCart(CartStatus.Closed);
          this.checkoutService.resetSteps();
          const order_number = response.number
          this.analytics.purchase( this.cart.cartItems, order_number);
          this.router.navigate(['/order-complete']);
        },
        (error) => {
          this.messageService.addError('Заказ не был отправлен. Попробуйте снова.');
        }
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
