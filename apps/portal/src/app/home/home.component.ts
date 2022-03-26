import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { combineLatest, pluck, Subject, takeUntil } from 'rxjs';
import { HomeSliderImages } from '../models/home-slider-images';
import { ProductService } from '../products/shared/product.service';
import { ReviewService } from '../core/shared/review.service';
import { AuthService } from '../account/shared/auth.service';
import { HomeSliderImagesService } from './main-slider/home-slider-images.service';
import { ESortingBehaviour } from '../products/shared/ui.service';

import { WithContext, WebSite} from "schema-dts";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../src/environments/environment'
import { resizedImgUrl } from '../../../api/utils';
import { SEOService, BrandDefaultMeta } from '../../app/shared/seoservice.service';
import { ProductReview } from '../../../api/components/reviews/review.model';
import { ProductsListGQL, ProductsListQuery } from 'gql/types';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  public resizedImgUrl = resizedImgUrl

  private readonly unsubscribe$ = new Subject();
  public products: ProductsListQuery['products'] = [];
  public sliderImages: HomeSliderImages[] = [];
  public reviews: ProductReview[] = []
  public schema: WithContext<WebSite>;
  public meta = BrandDefaultMeta

  constructor(
    private productService: ProductService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private homeSliderImagesService: HomeSliderImagesService,
    private router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private seo: SEOService,
    private productsGql: ProductsListGQL
  ) {
    const {description, title} = this.router.snapshot.data
    this.schema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      // name: 'TRIBES',
      description,
      name: title,
      url: 'https://mytribes.ru',
      additionalType: 'Organization',
      sameAs: [
        'https://facebook.com/tribesofficial',
        'https://twitter.com/TRIBES_Official',
        'https://www.instagram.com/tribes_brand/',
        'https://www.pinterest.ru/tribes_brand/pins/'
      ],
      // slogan: title,
      // logo: this.staticAssetsUrl + 'static/logo/logo_tribes_woodmark.svg',
      // mainEntityOfPage: 'https://mytibes.ru/about-tribes-brand',
      image: [
        {
          '@type': 'ImageObject',
          'url': this.staticAssetsUrl + 'static/img/home/slider/slider-01.jpg',
          'sourceOrganization': 'ООО ТРАЙБС / TRIBES LLC',
          'description': description
        },
        { 
          '@type': 'ImageObject',
          'url': this.staticAssetsUrl + 'static/img/home/slider/slider-02.jpg',
          'sourceOrganization': 'ООО ТРАЙБС / TRIBES LLC',
          'description': description
        },
        {
          '@type': 'ImageObject',
          'url': this.staticAssetsUrl + 'static/img/home/slider/slider-03.jpg',
          'sourceOrganization': 'ООО ТРАЙБС / TRIBES LLC',
          'description': description
        }
      ]
    };
  }
  
  ngOnInit() {
    combineLatest([
      this.productsGql.fetch({input: {limit: 6, gender: 'women' }}).pipe(pluck('data', 'products')),
      this.productsGql.fetch({input: {limit: 6, gender: 'men' }}).pipe(pluck('data', 'products')),
      // this.productService.getProducts({page: 1, limit: 12, sort: ESortingBehaviour["date_desc"], by_model: 1}),
      this.homeSliderImagesService.getSliderImages(),
      this.authService.user,
      this.reviewService.getReviews(),
      this.seo.currentRouteData$
    ]).pipe(takeUntil(this.unsubscribe$))
    .subscribe(([products_w, products_m, slides, user, reviews, meta]) => {
      this.products =  []//[...products_w, ...products_m]
      this.sliderImages = slides
      this.reviews = reviews
      this.meta = meta
      
      this.cdr.markForCheck()
    })
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
