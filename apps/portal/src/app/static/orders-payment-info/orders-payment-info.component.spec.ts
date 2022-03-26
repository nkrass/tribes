import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrdersPaymentInfoComponent } from './orders-payment-info.component';

describe('OrdersPaymentInfoComponent', () => {
  let component: OrdersPaymentInfoComponent;
  let fixture: ComponentFixture<OrdersPaymentInfoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersPaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
