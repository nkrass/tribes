import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment'
import { Router } from '@angular/router';

import { ProductQuery } from 'gql/types';

const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-product-widget',
  templateUrl: './product-widget.component.html',
  styleUrls: [
    './product-widget.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductWidgetComponent implements OnInit, OnDestroy, AfterViewInit{
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();

  
  @Input() public widgetTitle: string = '';
  @Input() public product!: ProductQuery['product']
  @Input() public displayMode: 'group'|'all' = 'group';
  
  product_variants!: ProductQuery['product']['variants']
  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}
  navigateToProduct(event:any){
    this.router.navigate(['/product', this.product.sku])
  }

  ngOnInit() {
    this.product_variants = this.product.variants;  //resizedImagesUrls(this.product.model_variants.map(e => e.images_paths[0]), 600, 800, 'fill')//.resizedImages(900, 1200,'fill')
  }
  ngAfterViewInit() {
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
