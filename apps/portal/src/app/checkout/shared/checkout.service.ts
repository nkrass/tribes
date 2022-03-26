import { Injectable, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';
import { Customer } from '../../models/customer.model';
import { BehaviorSubject } from 'rxjs';
import { CartQuery } from 'gql/types';

export const enum EDeliveryMethod {
  "courier" = "courier",
  "wildberries" = "wildberries"
}

@Injectable()
export class CheckoutService {
  private orderInProgress: Order = new Order({})
  // public orderInProgressChanged: EventEmitter<Order> = new EventEmitter<Order>();
  public orderInProgressChanged = new BehaviorSubject(this.orderInProgress)
  // public stepChanged: EventEmitter<number> = new EventEmitter<number>();
  public activeStep: number = 0
  public stepChanged = new BehaviorSubject(this.activeStep)
  public deliveryMethod$ = new BehaviorSubject(EDeliveryMethod['wildberries']);

  constructor() {
  }

  public gotoStep(number: number) {
    this.activeStep = number;
    // this.stepChanged.emit(this.activeStep);
    this.stepChanged.next(this.activeStep)
  }

  public nextStep() {
    this.activeStep++;
    // this.stepChanged.emit(this.activeStep);
    this.stepChanged.next(this.activeStep)
  }

  previousStep() {
    this.activeStep--;
    // this.stepChanged.emit(this.activeStep);
    this.stepChanged.next(this.activeStep)
  }

  public resetSteps() {
    this.activeStep = 0;
    this.stepChanged.next(this.activeStep)
  }

  public setCustomer(customer: Customer) {
    this.orderInProgress.customer = customer;
    // this.orderInProgressChanged.emit(this.orderInProgress);
    this.orderInProgressChanged.next(this.orderInProgress)
  }

  public setShippingMethod(shippingMethod: {value: string, fee: number}) {
    this.orderInProgress.shippingMethod = shippingMethod;
    this.deliveryMethod$.next(shippingMethod.value as any)
    // this.orderInProgressChanged.emit(this.orderInProgress);
    this.orderInProgressChanged.next(this.orderInProgress)
  }

  public setOrderItems(items: CartQuery['cart']['cartItems']) {
    this.orderInProgress.items = items;
    // this.orderInProgressChanged.emit(this.orderInProgress);
    this.orderInProgressChanged.next(this.orderInProgress)
  }

  public getOrderInProgress() {
    return this.orderInProgress;
  }

  public setPaymentMethod(paymentMethod: string) {
    this.orderInProgress.paymentMethod = paymentMethod;
    // this.orderInProgressChanged.emit(this.orderInProgress);
    this.orderInProgressChanged.next(this.orderInProgress)
  }
}
