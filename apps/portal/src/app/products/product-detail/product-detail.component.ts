import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map, pluck, startWith, tap  } from 'rxjs';
import { SEOService } from '../../shared/seoservice.service';
import { AnalyticsService } from '@tribes/analytics'
import { RxState } from '@rx-angular/state';
import { ProductGQL, ProductQuery } from '@tribes/data-access';
import { ProductMock } from '@tribes/ui';
import { Product as SchemaProduct, WithContext } from 'schema-dts';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

interface ProductState {
  product: ProductQuery['product']
  isLoading: boolean,
  schema: WithContext<SchemaProduct>
}

@Component({
  selector: 'tribes-product',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ProductDetailComponent {
  readonly staticAssetsUrl = staticAssetsUrl
  readonly vm$ = this.state.select()
  public promotions = { marketplace: undefined, promocode: undefined, rate: undefined, redirect: false}
  public setup_promotions(){
    const {pr, rd, mp, rt} = this.route.snapshot.queryParams
    this.promotions.marketplace = mp
    this.promotions.promocode = pr
    this.promotions.rate = rt
    this.promotions.redirect = !!rd
    if (this.promotions.redirect === true) {
      const wbId = this.state.get('product')?.externalId?.find(e => e.name === 'wildberries')?.id
      this.analytics.redirectTo('https://www.wildberries.ru/catalog/'+ wbId +'/detail.aspx?targetUrl=BP')
    }
  }

  constructor(
    private route: ActivatedRoute,
    private seo: SEOService,
    private analytics: AnalyticsService,
    private productGql: ProductGQL,
    private state: RxState<ProductState>
  ) {
    const fetchProductOnUrlChange$ = this.route.paramMap.pipe(
      switchMap((params) => this.productGql.fetch({ input: { 'sku': params.get('id') as string} }).pipe(
        pluck('data', 'product'),
        map( (product) => ({product, isLoading: false, schema: this.seo.buildProductSeoAndSchema(product)}) ),
        tap( ({product}) => {
          this.analytics.viewContent( product.barcodes.map(barcode => ({ barcode, price: product.priceSale, quantity: 1 })))
          this.setup_promotions()
        }),
      )),
      startWith({
        isLoading: true,
        product: ProductMock
      })
    )
    this.state.connect(fetchProductOnUrlChange$)
  }
}
