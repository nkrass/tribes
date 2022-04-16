import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsListQuery } from '@tribes/data-access';
import { PlaceholderImage } from '../placeholders/product.placeholder';
import SwiperCore, { Pagination, Navigation, SwiperOptions} from "swiper";
SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'tribes-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ProductListItemComponent {
  public placeholderImage: string = PlaceholderImage
  
  public swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    zoom: false,
    navigation: true,
    pagination: true,
    cssMode: false,
    breakpoints: {
      '320': { slidesPerView: 1 },
      '960': { slidesPerView: 1 }
    },
    
  };
  
  @Input() product: ProductsListQuery['products'][0]
  @Input() isLoading: boolean
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}
}
