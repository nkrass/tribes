import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductService } from 'app/products/shared/product.service';
import { Product } from '../../../../api/components/product/product.model';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-returns-and-refunds',
  templateUrl: './returns-and-refunds.component.html',
  styleUrls: ['./returns-and-refunds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnsAndRefundsComponent implements OnInit {
  public staticAssetsUrl = staticAssetsUrl
  cross_sale_men: Product[] = []

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
   
  }

}
