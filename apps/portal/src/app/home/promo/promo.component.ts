import { Component, Input } from '@angular/core';
import { Promo } from '../../models/promo.model';

@Component({
  selector: 'tribes-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent {
  @Input() public promo!: Promo;
}
