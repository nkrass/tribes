import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { CartService } from '../../../../cart/shared/cart.service';
import { takeUntil } from 'rxjs';
import { Barcode, CartQuery } from 'gql/types';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from 'app/app-global.state';

@Component({
  selector: 'app-toolbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ToolbarCartComponent implements OnInit, OnDestroy {

  private readonly unsubscribe$ = new Subject();
  public toolbarShow$ = this.cartService.cartShow$
  readonly cart$ = this.globalState.select('cart')

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
  ) {}

  ngOnInit() {
    // this.cartService.cart$
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((cart: Cart) => {
    //     this.cart = cart
    //     this.cdr.markForCheck()
    //   })
    // this.cartService.cartShow$
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(bool => {
    //     this.toolbarShow = bool
    //   })
  }

  public onRemoveItem(event: any, item: Barcode) {
    event.stopPropagation();
    this.cartService.deleteItems([item])
  }
  // public toggleToolbar(){
  //   if(this.toolbarShow) this.toolbarShow = false
  //   else this.toolbarShow = true
  // }
  
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
