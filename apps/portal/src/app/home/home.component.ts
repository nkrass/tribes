import { Component, OnDestroy, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { combineLatest, map, pluck, Subject, takeUntil, zip } from 'rxjs';
import { HomeSliderImages } from '../models/home-slider-images';
import { HomeSliderImagesService } from './main-slider/home-slider-images.service';

import { WithContext, WebSite} from "schema-dts";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../src/environments/environment'
import { SEOService, BrandDefaultMeta } from '../../app/shared/seoservice.service';
import { ProductGender, ProductsListGQL, ProductsListQuery, ReviewsListGQL, ReviewsListQuery } from '@tribes/data-access';
import { resizedImgUrl } from '../shared/utils/utils.utils';
import { RxState } from '@rx-angular/state';
const staticAssetsUrl = environment.staticAssetsUrl

interface HomeComponentState {
  products: ProductsListQuery['products'];
  isLoading: boolean;
  reviews: ReviewsListQuery['reviews'];
}
@Component({
  selector: 'tribes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class HomeComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  public resizedImgUrl = resizedImgUrl

  private readonly unsubscribe$ = new Subject();
  public sliderImages: HomeSliderImages[] = [];
  public schema: WithContext<WebSite>;
  public meta = BrandDefaultMeta

  constructor(
    private state: RxState<HomeComponentState>,
    private homeSliderImagesService: HomeSliderImagesService,
    private router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private seo: SEOService,
    private productsGql: ProductsListGQL,
    private reviewsGql: ReviewsListGQL
  ) {
    this.state.connect('products', zip([
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Women }}).pipe(pluck('data', 'products')),
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Men }}).pipe(pluck('data', 'products'))
    ]).pipe(
        map(([products_w, products_m]) => ([...products_w, ...products_m]))
      )
    );
    this.state.connect('reviews', this.reviewsGql.fetch({input: {all: true, limit: 10}}).pipe(pluck('data', 'reviews')));
    
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
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Women }}).pipe(pluck('data', 'products')),
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Men }}).pipe(pluck('data', 'products')),
      // this.productService.getProducts({page: 1, limit: 12, sort: ESortingBehaviour["date_desc"], by_model: 1}),
      this.homeSliderImagesService.getSliderImages(),
      this.seo.currentRouteData$
    ]).pipe(takeUntil(this.unsubscribe$))
    .subscribe(([products_w, products_m, slides, meta]) => {
      this.products =  [...products_w, ...products_m]
      this.sliderImages = slides
      this.meta = meta
      
      this.cdr.markForCheck()
    })
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
