import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';
import { ProductQuery, ProductsListQuery } from '@tribes/data-access';

const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: [
    './product-widget.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductWidgetComponent implements OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();

  
  @Input() public widgetTitle: string|undefined|null = '';
  @Input() public product!: ProductsListQuery['products'][0]
  @Input() public displayMode: 'group'|'all' = 'group';
  
  product_variants!: ProductQuery['product']['variants']
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  navigateToProduct(event:any){
    this.router.navigate(['/product', this.product.sku])
  }

  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
