import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CheckoutService, EDeliveryMethod } from '../shared/checkout.service';
import { Customer } from '../../models/customer.model';

export const SippingMethods = [
  {
    method: 'Покупка на сайте Wildberries - доставка курьером или в пункт выдачи',
    time: '2 - 4 дня',
    fee: 400,
    value: 'wildberries'
  },
  {
    method: 'Доставка курьерской службой',
    time: '3-6 дня',
    fee: 1500,
    value: 'courier'
  }
];

@Component({
  selector: 'tribes-checkout-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  public shippingMethods = SippingMethods;
  public formShipping: FormGroup = new FormGroup({
    'shippingMethod': new FormControl(this.shippingMethods[0].value, Validators.required)
  });
  

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit() {}
  public updateCosts(event: any){
    this.checkoutService.deliveryMethod$.next(this.formShipping.controls.shippingMethod.value)
  }
  public onBack() {
    this.checkoutService.previousStep();
  }

  public onContinue() {
    this.checkoutService.setShippingMethod({
      value: this.formShipping.controls.shippingMethod.value,
      fee: SippingMethods.filter(e => e.value === this.formShipping.controls.shippingMethod.value)[0].fee
    });
    this.checkoutService.nextStep();
  }

}
