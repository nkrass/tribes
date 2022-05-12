import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

import { Subject } from 'rxjs';

import { CheckoutService } from './shared/checkout.service';
import { takeUntil } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'tribes-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject();
  public steps: string[] = [];
  public activeStep: number = this.checkoutService.activeStep;

  constructor(
    private checkoutService: CheckoutService,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: typeof PLATFORM_ID
  ) {}

  ngOnInit() {
    // this.steps = ['1. Адрес', '2. Доставка', '3. Оплата', '4. Информация'];
    this.checkoutService.stepChanged
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((step: number) => {
        this.activeStep = step;
        this.cdr.detectChanges()
        // this.scrollToTop()
      });
  }
  // scrollToTop() {
  //   if (isPlatformBrowser(this.platformId)){
  //     (function smoothscroll() {
  //       const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
  //       if (currentScroll > 0) {
  //           window.requestAnimationFrame(smoothscroll);
  //           window.scrollTo(0, currentScroll - (currentScroll / 8));
  //       }
  //   })();
  //   }
    
  // }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
