import { Component, OnInit, Input, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';

import { Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainSliderComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  @Input() public items: any[] = [];
  public currentSlide: number = 0;
  public imagesLoaded: string[] = [];

  public onImageLoad(e: any) {
    this.imagesLoaded.push(e.target.src);
  }
  ngOnInit() {
    this.currentSlide = 0;
    this.imagesLoaded = [];
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
