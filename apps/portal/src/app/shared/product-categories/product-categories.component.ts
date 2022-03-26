import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCategoriesComponent implements OnInit {
  public staticAssetsUrl: string = staticAssetsUrl
  constructor() { }

  ngOnInit(): void {
  }

}
