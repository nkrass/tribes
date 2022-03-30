import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  // @Input() public product!: Product;
  @Input() public count: number|null|undefined = 1;
  @Input() public priceBase: number|null|undefined = 0;
  @Input() public priceSale: number|null|undefined = 0;
  @Input() public sku: string|null|undefined = '';
}
