import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
import { Router } from '@angular/router';
import { PlaceholderImage } from '../shared/product-placeholder.mock';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode } from "swiper";
import { ProductsListQuery } from '@tribes/data-access';
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProductsListItemComponent {
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
}
