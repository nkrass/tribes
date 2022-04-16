import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoriesComponent{
  @Input() staticAssetsUrl: string = 'https://cdn.mytribes.ru/'
}
