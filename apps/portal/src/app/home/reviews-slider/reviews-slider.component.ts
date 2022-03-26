import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
import { ReviewModel } from 'app/models/review.model';
import { RxState } from '@rx-angular/state';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode } from "swiper";
SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-reviews-slider',
  templateUrl: './reviews-slider.component.html',
  styleUrls: [
    './reviews-slider.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewsSliderComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  @Input() public items?: ReviewModel[];
  public currentSlide: number = 0;
  public imagesLoaded: string[] = []
  
  constructor(
    private cdr: ChangeDetectorRef,
    private elRef: ElementRef
  ){}
  // public onImageLoad(e: any) {
  //   this.imagesLoaded.push(e.target.src);
  //   this.cdr.markForCheck()
  // }
  ngOnInit() {
    this.cdr.markForCheck();
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
