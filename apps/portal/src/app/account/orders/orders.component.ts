import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderService } from './shared/order.service';

import { Order } from '../../models/order.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'tribes-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  public orders: Order[] = [];
  private readonly unsubscribe$ = new Subject();

  constructor(public orderService: OrderService) {}

  ngOnInit() {
    // this.orderService.getOrders()
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((orders: Order[]) => {
    //     this.orders = orders
    //   });
  }

  ngOnDestroy() {
    // this.unsubscribe$.next(null);
    // this.unsubscribe$.complete();
  }
}
