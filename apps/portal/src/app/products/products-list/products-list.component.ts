import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { pluck, map, startWith, switchMap, endWith, zip, Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '../../../../src/environments/environment'
import { ProductsListGQL, CategoriesListGQL, CategoriesListQuery, ProductsListQuery } from 'gql/types';
import { RxState } from '@rx-angular/state';
import SwiperCore, { Pagination, Zoom, Navigation, Mousewheel, FreeMode } from "swiper";
import { PlaceholderImage, ProductMock } from '../shared/product-placeholder.mock';
import { GeneralColorsDictionary } from '../shared/detailed-colors.dictionary';
import { ItemList, WithContext, OfferCatalog } from 'schema-dts';

SwiperCore.use([Pagination, Zoom, Navigation, Mousewheel, FreeMode]);

const staticAssetsUrl = environment.staticAssetsUrl

interface ProductsListState {
  isLoading: boolean
  gender: string|null
  color: string|null
  size: string|null
  categories?: CategoriesListQuery['categories']
  category: string |null
  products?: ProductsListQuery['products']
  schema?: any//WithContext<OfferCatalog>
}

@Component({
  selector: 'tribes-products',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RxState
  ]
})
export class ProductsListComponent {
  staticAssetsUrl: string = staticAssetsUrl
  placeholderImage: string = PlaceholderImage
  colorDictionary = GeneralColorsDictionary
  vm$ = this.state.select()
  readonly products$ = this.state.select('products');
  readonly isLoading$ = this.state.select('isLoading');
  readonly category$ = this.state.select('category');
  readonly categories$ = this.state.select('categories');
  readonly gender$ = this.state.select('gender');
  readonly schema$ = this.state.select('schema');
  readonly color$ = this.state.select('color')
  readonly size$ = this.state.select('size')

  colorsPalette = Object.keys(GeneralColorsDictionary).map(e=> ({colorCode: e, colorTitle: GeneralColorsDictionary[e]}))
  params$ = this.route.paramMap;

  getProducts$ = (p: ParamMap): Observable<ProductsListQuery['products']> => {
    return this.productsListGQL.fetch({
      input: { 
        category: p.get('category') === 'all'? undefined : p.get('category') || undefined, 
        gender: p.get('gender') || undefined,
        color: p.get('color') || undefined,
        size: p.get('size') || undefined,
      }
    }).pipe(pluck('data', 'products'))
  }
  getCategories$ = (p: ParamMap): Observable<CategoriesListQuery['categories']> => {
    return this.categoriesList.fetch({
      gender: p.get('gender') || undefined
    }).pipe(pluck('data', 'categories'))
  }
  fetchOnUrlChange$ = this.params$.pipe(
    switchMap(p => 
      combineLatest([
        this.getProducts$(p),
        this.getCategories$(p),
      ]).pipe(
        map(([products, categories]) => {
          return {
            products,
            categories,
            schema: this.buildSchema(products),
            gender: p.get('gender'), 
            category: p.get('category'),
            color: p.get('color'),
            size: p.get('size'),
            isLoading: false
          }
        }),
        startWith({ isLoading: true, products: Array(9).fill(ProductMock) }),
        endWith({ isLoading: false })
      )
    )
  )
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsListGQL: ProductsListGQL,
    private categoriesList: CategoriesListGQL,
    private state: RxState<ProductsListState>
  ) {
    this.state.connect(this.fetchOnUrlChange$)
  }

  buildSchema(products: ProductsListQuery['products']){
    const itemListElement = [];
    for (let i=0; i< products.length; i++){
      const {sku, title, description, category, materials, color, imagesSrc, priceSale, stock} = products[i]
      const el = {
        '@type': 'ListItem',
        position: i+1,
        item: {
          '@type': 'Product',
          name: title,
          url: 'https://mytribes.ru/product/' + sku,
          description: description,
          brand: {
            '@type': 'Brand',
            'logo': this.staticAssetsUrl + 'static/img/logo/logo_tribes_woodmark.svg',
            'mainEntityOfPage': 'https://mytibes.ru/about-tribes-brand',
          },
          'sku': sku,
          hasMerchantReturnPolicy: {
            'merchantReturnLink': 'https://mytribes.ru/returns-and-refunds',
            'inStoreReturnsOffered': true,
            'merchantReturnDays': 14,
            'identifier': 'https://mytribes.ru/returns-and-refunds',
            '@id': sku
          },
          slogan: 'TRIBES - то, что модно и на каждый день',
          logo: this.staticAssetsUrl + 'static/img/logo/logo_tribes_woodmark.svg',
          material: materials?.map((m: any) => `${m.material} ${m.quantity}%`).join(', '),
          category: category,
          itemCondition: 'NewCondition',
          model: `${title} ${sku}`,
          manufacturer: 'ООО ТРАЙБС / TRIBES LLC',
          color: color,
          image: imagesSrc,
          offers: {
            price: priceSale,
            priceCurrency: 'RUB',
            availability: stock! > 0 ? 'InStock' : 'LimitedAvailability',
            '@id': 'https://mytribes.ru/product/' + sku,
            sku, url: 'https://mytribes.ru/product/' + sku
          }
        }
      }
      itemListElement.push(el)
    }
    const url = 'https://mytribes.ru' + '/' + this.route.snapshot.url.map(u=> u.path).join('/')
    const description = this.route.snapshot.data.description
    const name = this.route.snapshot.data.title
    return {
      '@context': 'https://schema.org',
      '@type': "OfferCatalog",
      url, description, name, itemListElement,
      sameAs: [
        'https://facebook.com/tribesofficial',
        'https://twitter.com/TRIBES_Official',
        'https://www.instagram.com/tribes_brand/',
        'https://www.pinterest.ru/tribes_brand/pins/'
      ]
    }
  }

  onSelectCategory(category: string){
    const gender = this.state.get('gender')
    const path = ['/', gender, 'catalog', category||'all'].filter(e => !!e)
    this.router.navigate(path)
  }
  onSelectColor(colorCode?: string){
    const gender = this.state.get('gender')
    const category = this.state.get('category')
    const path = ['/', gender, 'catalog', category||'all', colorCode].filter(e => !!e)
    this.router.navigate(path)
  }

}
