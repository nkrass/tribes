import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../shared/checkout.service';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-checkout-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  public staticAssetsUrl: string = staticAssetsUrl;
  public paypalLoggedIn = false;
  public paymentMethods: string[] = ['Безналично (картой)', 'Наличными'];
  public formPayment: FormGroup = new FormGroup({
    'paymentMethod': new FormControl(this.paymentMethods[0], Validators.required)
  })
  constructor(private checkoutService: CheckoutService) { }

  public onPaypalLogin(event: Event) {
    this.paypalLoggedIn = true;
  }

  public onBack() {
    this.checkoutService.previousStep();
  }

  public onContinue() {
    this.checkoutService.setPaymentMethod(this.formPayment.controls['paymentMethod'].value);
    this.checkoutService.nextStep();
  }

}
