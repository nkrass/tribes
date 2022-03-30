import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Inject
} from '@angular/core';
import { RxState } from "@rx-angular/state";
import { Subject, debounceTime,  distinctUntilChanged,  filter, BehaviorSubject, pluck, switchMap } from 'rxjs';

import { environment } from '../../../../../src/environments/environment'
import { OffcanvasService } from '../../shared/offcanvas.service';
import { AppGlobalState, APP_GLOBAL_STATE } from '../../../app-global.state';
import { PlaceholderImage } from '../../../products/shared/product-placeholder.mock';
import { ProductsListGQL, ProductsListQuery } from '@tribes/data-access';

const staticAssetsUrl = environment.staticAssetsUrl

interface SearchComponentState {
  products: ProductsListQuery['products']
}
@Component({
  selector: 'tribes-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class SearchComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  public placeholderImage: string = PlaceholderImage
  public searchTerm$ = new Subject<string>();

  toggleSearch$ = new BehaviorSubject<boolean>(false)
  showSearch$ = this.globalState.select('showSearch')
  products$ = this.state.select('products')
  constructor(
    private cdr: ChangeDetectorRef,
    public offcanvasService: OffcanvasService,
    @Inject(APP_GLOBAL_STATE) private globalState: RxState<AppGlobalState>,
    private state: RxState<SearchComponentState>,
    private productsGql: ProductsListGQL
  ) {
    const products$ = this.searchTerm$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      filter((term) => term.length > 2),
      switchMap(str => this.productsGql.fetch({ input: { all: true, title: str } }).pipe(pluck('data', 'products')))
    )
    this.globalState.connect('showSearch', this.toggleSearch$.asObservable())
    this.state.connect('products', products$)
  }
}
