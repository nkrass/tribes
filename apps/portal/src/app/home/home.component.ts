import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import { endWith, map, pluck, startWith, Subject, zip } from 'rxjs';
import { HomeSliderImages } from '../models/home-slider-images';
import { HomeSliderImagesService } from './main-slider/home-slider-images.service';

import { WithContext, WebSite} from "schema-dts";
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../src/environments/environment'
import { SEOService, BrandDefaultMeta } from '../../app/shared/seoservice.service';
import { ProductGender, ProductRegion, ProductsListGQL, ProductsListQuery, ReviewsListGQL, ReviewsListQuery } from '@tribes/data-access';
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
  providers: [RxState],
})
export class HomeComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  public resizedImgUrl = resizedImgUrl

  private readonly unsubscribe$ = new Subject();
  public sliderImages: HomeSliderImages[] = [];
  public schema: WithContext<WebSite>;
  public meta = BrandDefaultMeta
  reviews$ = this.state.select('reviews');
  products$ = this.state.select('products');
  isLoading$ = this.state.select('isLoading');
  constructor(
    private state: RxState<HomeComponentState>,
    private homeSliderImagesService: HomeSliderImagesService,
    private router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private seo: SEOService,
    private productsGql: ProductsListGQL,
    private reviewsGql: ReviewsListGQL
  ) {
    this.state.connect(zip([
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Women, region: ProductRegion.Ru }}).pipe(pluck('data', 'products')),
      this.productsGql.fetch({input: {limit: 6, gender: ProductGender.Men, region: ProductRegion.Ru }}).pipe(pluck('data', 'products'))
    ]).pipe(
        map(([products_w, products_m]) => ([...products_w, ...products_m])),
        map((products) => ({products, isLoading: false})),
        startWith({isLoading: true}),
        endWith({isLoading: false})
      )
    );
    this.state.connect('reviews', this.reviewsGql.fetch({input: {promoRating: "promo", limit: 10}}).pipe(pluck('data', 'reviews')));

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
          'sourceOrganization': '?????? ???????????? / TRIBES LLC',
          'description': description
        },
        { 
          '@type': 'ImageObject',
          'url': this.staticAssetsUrl + 'static/img/home/slider/slider-02.jpg',
          'sourceOrganization': '?????? ???????????? / TRIBES LLC',
          'description': description
        },
        {
          '@type': 'ImageObject',
          'url': this.staticAssetsUrl + 'static/img/home/slider/slider-03.jpg',
          'sourceOrganization': '?????? ???????????? / TRIBES LLC',
          'description': description
        }
      ]
    };
  }
}
