
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SEOService } from '../../shared/seoservice.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  public staticAssetsUrl: string = staticAssetsUrl

  public slogan!: string
  public description!: string

  constructor(
    private seo: SEOService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.seo.currentRouteData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.slogan = data.title
        this.description = data.description
        this.cdr.markForCheck()
      })
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
