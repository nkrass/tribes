import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { Subject, debounceTime ,  distinctUntilChanged ,  filter ,  map,  switchMap, takeUntil, BehaviorSubject, iif, defaultIfEmpty } from 'rxjs';

import { ProductService } from '../../../products/shared/product.service';

import { environment } from '../../../../../src/environments/environment'
import { OffcanvasService } from 'app/core/shared/offcanvas.service';
import { Product } from '../../../../../api/components/product/product.model';
import { ESortingBehaviour } from '../../../../../api/components/products/products.interface';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  public staticAssetsUrl: string = staticAssetsUrl
  public products: any[] = [];
  private readonly unsubscribe$ = new Subject();
  public term$ = new Subject<string>();
  public cross_sale: Product[] = []
  public visible: boolean = false

  constructor(
    private productService: ProductService, 
    private cdr: ChangeDetectorRef,
    public offcanvasService: OffcanvasService
    
  ) {}

  ngOnInit() {
    this.offcanvasService.offcanvasNavigationState$.pipe(takeUntil(this.unsubscribe$)).subscribe(state => {
      this.visible = state.search_visible;
      this.cdr.markForCheck()
    })
    this.term$.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        filter((term) => term.length > 2),
        // switchMap((term) => this.search(term)),
        // map(res => this.products = res.products), //disabled
        takeUntil(this.unsubscribe$),
      )
      .subscribe((results) => {
        this.cdr.markForCheck()
      });
    // this.productService.getProducts({page: 1, limit: 6, sort: ESortingBehaviour["date_desc"] })
    //   .pipe(
    //     map(res => this.products = res.products),
    //     takeUntil(this.unsubscribe$)
    //   )
    //   .subscribe(res => {
    //       this.cdr.markForCheck()
    //   })
    
  }
  

  public toggleSearch() {
    const state = this.offcanvasService.offcanvasNavigationState$.getValue()
    state.search_visible = !state.search_visible
    this.offcanvasService.toggleOffcanvasNavigation(state)
  }

  public showSearch() {
    const state = this.offcanvasService.offcanvasNavigationState$.getValue()
    state.search_visible = false
    this.offcanvasService.toggleOffcanvasNavigation(state)
  }

  public closeSearch() {
    const state = this.offcanvasService.offcanvasNavigationState$.getValue()
    state.search_visible = false
    this.offcanvasService.toggleOffcanvasNavigation(state)
  }
  
  public search(term: string) {
    return this.productService.findProducts(term);
  }

  public onSearchInput(event: any) {
    let term = event.target.value;
    if (term.length > 2) {
      this.term$.next(term);
    } else {
      this.products = [];
      this.term$.next('');
    }
  }

  ngOnDestroy(){
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
