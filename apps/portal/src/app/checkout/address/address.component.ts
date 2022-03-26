import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { AuthService } from '../../account/shared/auth.service';
import { CheckoutService } from '../shared/checkout.service';
import { map, switchMap, takeUntil } from 'rxjs';
import { User } from '../../../app/models/user.model';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Customer } from 'app/models/customer.model';
import { CartService } from 'app/cart/shared/cart.service';
import { Order } from 'app/models/order.model';
import { OrderService } from 'app/account/orders/shared/order.service';
import { Router } from '@angular/router';
import { AnalyticsService } from 'app/shared/analytics.service';
import { MessageService } from 'app/messages/message.service';
import { CartQuery, CartStatus } from 'gql/types';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat.International;
	preferredCountries: CountryISO[] = [CountryISO.Russia, CountryISO.Kazakhstan, CountryISO.Germany, CountryISO.Belarus, CountryISO.France, CountryISO.Poland, CountryISO.Singapore, CountryISO.Indonesia];
	// phoneForm = new FormGroup({
	// 	phone: new FormControl(undefined, [Validators.required])
	// })

  public user?: User;
  public formAddress!: FormGroup;
  public countries: string[] = ['Россия', 'Україна', 'Беларусь', 'France', 'Polska', 'Deutschland','Singapore'];
  total!: number;
  cart!: CartQuery['cart']
  customer: Customer = this.checkoutService.getOrderInProgress().customer;
  paymentMethod!: string;
  
  constructor(
    private checkoutService: CheckoutService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private messageService: MessageService,
    private analytics: AnalyticsService
  ) {
    // this.phoneForm.valueChanges.pipe().subscribe(val => {

    // })
  }

  ngOnInit() {
    //config order
    this.cartService.cart$.pipe(
      takeUntil(this.unsubscribe$),
      map(cart => {
        this.cart = cart
        this.checkoutService.setOrderItems(cart.cartItems)
        this.checkoutService.setShippingMethod({
          value: 'courier',
          fee: 1500
        });
        this.checkoutService.setPaymentMethod('card')
      }),
      switchMap(_ => this.authService.user),
      map(user => {
        this.user = user;
        this.initFormGroup();
      }),
      switchMap(_ => this.checkoutService.orderInProgressChanged),
      map(order => {
        this.customer = order.customer;
        this.paymentMethod = order.paymentMethod;
        this.total = order.shippingMethod.fee + this.cart.totalAmount 
      })
    ).subscribe(_ => {
      this.cdr.detectChanges()
    })
    // this.formAddress.valueChanges.subscribe(e => console.log(e))
  }

  private initFormGroup() {
    this.formAddress = new FormGroup({
      firstname: new FormControl(
        this.user && this.user.firstName,
        Validators.required
      ),
      lastname: new FormControl(
        this.user && this.user.lastName,
        Validators.required
      ),
      patronymic: new FormControl(
        this.user && this.user.patronymic
      ),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null, Validators.required),
      zip: new FormControl(null),
      city: new FormControl(null, Validators.required),
      email: new FormControl(
        this.user && this.user.email,
        [Validators.email,
        Validators.required]
      ),
      phone: new FormControl(null, [Validators.required]),
      company: new FormControl(null),
      country: new FormControl({ value: this.countries[0], disabled: false })
    });
  }

  public onContinue() {
    const customer = Customer.FromCustomerForm(this.formAddress.value)
    this.checkoutService.setCustomer(customer);
    this.checkoutService.nextStep();
  }
  private submitUserOrder(order: Order, total: number, userUid?: string) {
    this.orderService
      .placeOrder(order, total, userUid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (response) => {
          this.cartService.clearCart(CartStatus.Closed);
          this.checkoutService.resetSteps();
          this.router.navigate(['/order-complete']);
          const order_number = response.number
          this.analytics.purchase( this.cart.cartItems, order_number)
        },
        (error) => {
          this.messageService.addError('Заказ не был отправлен. Попробуйте снова.');
        }
      );
  }
  public onCompleteOrder() {
    const customer = Customer.FromCustomerForm(this.formAddress.value)
    this.checkoutService.setCustomer(customer);
    const userUid = this.user?.uid;
    const order = this.checkoutService.getOrderInProgress();
    const total = this.total
    this.checkoutService.setOrderItems(this.cart.cartItems);
    this.submitUserOrder(order, total, userUid)
  }
  // Debug: Fill Form Helper MEthod
  public onFillForm(event: Event) {
    event.preventDefault();
    this.formAddress.setValue({
      firstname: 'Иван',
      lastname: 'Иванов',
      patronymic: 'Иванович',
      address1: 'Проектируемый проезд, д. 27',
      address2: '',
      zip: 111140,
      city: 'Москва',
      email: 'ivanov.ivan@mail.ru',
      phone: '+79991234567',
      company: '',
      country: 'Россия'
    });
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}