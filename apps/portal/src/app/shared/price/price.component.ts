import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  // @Input() public product!: Product;
  @Input() public count = 1;
  @Input() public priceBase = 0;
  @Input() public priceSale = 0;
  @Input() public sku = '';
}
