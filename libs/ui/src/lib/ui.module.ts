import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { SwiperModule } from 'swiper/angular';
import { ReviewsSliderComponent } from './reviews-slider/reviews-slider.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RatingStarsComponent } from './rating-stars/rating-stars.component';
import {RouterModule} from '@angular/router';
import { PriceComponent } from './price/price.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { SizesComponent } from './sizes/sizes.component';
import { SectionDividerComponent } from './section-divider/section-divider.component';
import { BrandAdvantagesComponent } from './brand-advantages/brand-advantages.component';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';

@NgModule({
  imports: [
    CommonModule, SwiperModule, LazyLoadImageModule, RouterModule,
    LetModule, PushModule
  ],
  declarations: [
    ProductListItemComponent,
    ReviewsSliderComponent,
    ProductDetailsComponent,
    RatingStarsComponent,
    PriceComponent, 
    SizesComponent,
    SectionDividerComponent,
    BrandAdvantagesComponent,
    GenderFilterComponent,
    ProductCategoriesComponent
  ],
  exports: [
    ProductListItemComponent,
    ReviewsSliderComponent,
    ProductDetailsComponent,
    RatingStarsComponent,
    PriceComponent,
    SizesComponent,
    SectionDividerComponent,
    BrandAdvantagesComponent,
    GenderFilterComponent,
    ProductCategoriesComponent
  ],
})
export class UiModule {}
