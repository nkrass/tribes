import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-orders-payment-info',
  templateUrl: './orders-payment-info.component.html',
  styleUrls: ['./orders-payment-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPaymentInfoComponent implements OnInit {
  public staticAssetsUrl = staticAssetsUrl
  constructor() { }

  ngOnInit(): void {
  }

}
