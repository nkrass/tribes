import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode, SwiperOptions } from "swiper";
import { ReviewsListQuery } from '@tribes/data-access';
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

@Component({
  selector: 'tribes-reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: [ './reviews-slider.component.scss' ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsSliderComponent {
  @Input() public reviews?: ReviewsListQuery['reviews'];
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'
  @Input() showProductLink = true
  public currentSlide = 0;
  public imagesLoaded: string[] = []
  @Input() sliderConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: true,
    pagination: true,
    cssMode: false,
    breakpoints: {
      '320': { slidesPerView: 1 },
      '960': { slidesPerView: 1 }
    }
  };
}
