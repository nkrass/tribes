import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subject } from 'rxjs';

import { environment } from '../../../../src/environments/environment'
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { ProductsListQuery } from 'gql/types';
import { PlaceholderImage } from '../shared/product-placeholder.mock';
// import { Product } from 'gql/types';

const staticAssetsUrl = environment.staticAssetsUrl


// interface CompoentState{
//   product: Product
// }

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: [
    './products-list-item.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [RxState]
})
export class ProductsListItemComponent implements OnInit, OnDestroy, AfterViewInit {
  public staticAssetsUrl: string = staticAssetsUrl
  public placeholderImage: string = PlaceholderImage
  
  private readonly unsubscribe$ = new Subject();
  
  @Input() public product!: ProductsListQuery['products'][0]
  @Input() public isLoading!: boolean

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    // private state: RxState<CompoentState>
  ) {
  }
  navigateToProduct(event:any){
    this.router.navigate(['/product', this.product.sku])
  }

  ngOnInit() {
    // this.cdr.markForCheck();
  }
  ngAfterViewInit() {
    // this.cdr.markForCheck();
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
