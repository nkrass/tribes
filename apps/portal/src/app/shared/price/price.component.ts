import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '../../../../api/components/product/product.model';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceComponent {
  // @Input() public product!: Product;
  @Input() public count: number = 1;
  @Input() public priceBase: number = 0;
  @Input() public priceSale: number = 0;
  @Input() public sku: string = '';

}
