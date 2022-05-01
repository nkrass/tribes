import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { CartService } from '@tribes/cart';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from '@tribes/global-state';
import { Barcode } from '@tribes/data-access';

@Component({
  selector: 'tribes-toolbar-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ToolbarCartComponent {
  public readonly showCart$ = this.globalState.select('showCart');
  readonly cart$ = this.globalState.select('cart')

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
  ) {}


  public onRemoveItem(event: Event, item: Barcode) {
    event.stopPropagation();
    this.cartService.deleteItems([item])
  }

}
