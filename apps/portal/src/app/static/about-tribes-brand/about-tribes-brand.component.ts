import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BrandDefaultMeta, SEOService } from '../../../app/shared/seoservice.service';
import { takeUntil, Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-about-tribes-brand',
  templateUrl: './about-tribes-brand.component.html',
  styleUrls: ['./about-tribes-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutTribesBrandComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  public seoData!: typeof BrandDefaultMeta
  public staticAssetsUrl = staticAssetsUrl
  constructor(
    private seo: SEOService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.seo.currentRouteData$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(data => {
      this.seoData = {...data}
      this.cdr.markForCheck()
    })
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
