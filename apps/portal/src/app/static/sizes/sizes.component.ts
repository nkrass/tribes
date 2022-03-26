import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'app/products/shared/product.service';
import { ESortingBehaviour } from 'app/products/shared/ui.service';
import { Subject, map, takeUntil } from 'rxjs';
import { Product } from '../../../../api/components/product/product.model';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizessComponent implements OnInit, OnDestroy {
  public staticAssetsUrl = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  cross_sale_men: Product[] = []
  cross_sale_women: Product[] = []
  constructor(
    private cdr: ChangeDetectorRef,
    private productService: ProductService,
  ) { }

  ngOnInit() {
    this.productService.getProducts({page: 1, limit: 6, sort: ESortingBehaviour["date_desc"], gender: 'men' })
    .pipe(
      map(res => this.cross_sale_men = res.products),
      takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.cdr.markForCheck()
    })
    this.productService.getProducts({page: 1, limit: 6, sort: ESortingBehaviour["date_desc"], gender:'women' })
    .pipe(
      map(res => this.cross_sale_women = res.products),
      takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.cdr.markForCheck()
    })
  }

  
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
