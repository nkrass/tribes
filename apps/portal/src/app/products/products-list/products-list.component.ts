import { ChangeDetectionStrategy, Component } from '@angular/core';
import { pluck, map, startWith, switchMap, Observable } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { environment } from '../../../../src/environments/environment'
import { RxState } from '@rx-angular/state';
import { PlaceholderImage, ProductMock } from '../shared/product-placeholder.mock';
import { CategoriesListGQL, CategoriesListQuery, ProductCategory, ProductGender, ProductRegion, ProductsListGQL, ProductsListQuery } from '@tribes/data-access';
import { ColorsDictionary } from '@tribes/colors-dictionary';
import { OfferCatalog, WithContext } from 'schema-dts';

const staticAssetsUrl = environment.staticAssetsUrl

interface ProductsListState {
  isLoading: boolean
  gender: string|null
  color: string|null
  size: string|null
  categories: CategoriesListQuery['categories']
  category: string |null
  products?: ProductsListQuery['products']
  schema: WithContext<OfferCatalog>
}
@Component({
  selector: 'tribes-products',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ RxState ]
})
export class ProductsListComponent {
  staticAssetsUrl: string = staticAssetsUrl
  placeholderImage: string = PlaceholderImage
  public productsMock = Array(9).fill(ProductMock)
  colorDictionary = ColorsDictionary.getColorName
  vm$ = this.state.select()
  readonly products$ = this.state.select('products');
  readonly isLoading$ = this.state.select('isLoading');
  readonly category$ = this.state.select('category');
  readonly categories$ = this.state.select('categories');
  readonly gender$ = this.state.select('gender');
  readonly schema$ = this.state.select('schema');
  readonly color$ = this.state.select('color')
  readonly size$ = this.state.select('size')

  colorsPalette = ColorsDictionary.GeneralColorGroupsCodes.map(e=> ({colorCode: e, colorTitle: ColorsDictionary.getColorGroupName(e)}))
  params$ = this.route.paramMap;
  fetchOnUrlChange$ = this.params$.pipe(
    map(p => ({
        gender:   p.get('gender'),
        category: p.get('category'),
        color:    p.get('color'),
        size:     p.get('size'),
      })
    ), startWith({ isLoading: true, products: this.productsMock })
  )
  getProducts$ = (p: ParamMap): Observable<ProductsListQuery['products']> => {
    return this.productsListGQL.fetch({
      input: { 
        category: p.get('category') === 'all'? undefined : p.get('category') as ProductCategory|| undefined, 
        gender: p.get('gender') as ProductGender || undefined,
        color: p.get('color') || undefined,
        size: p.get('size') || undefined,
        region: ProductRegion.Ru
      }
    }).pipe(pluck('data', 'products'))
  }
  getCategories$ = (p: ParamMap): Observable<CategoriesListQuery['categories']> => {
    return this.categoriesList.fetch({
      gender: p.get('gender') as ProductGender|| undefined,
      region: ProductRegion.Ru
    }).pipe(pluck('data', 'categories'))
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsListGQL: ProductsListGQL,
    private categoriesList: CategoriesListGQL,
    private state: RxState<ProductsListState>
  ) {
    // this.state.set({products: Array(9).fill(ProductMock)})
    this.state.connect(
      this.params$.pipe(switchMap(this.getProducts$)), 
      (state, products) => ({...state, products, schema: this.buildSchema(products), isLoading: false})
    )
    this.state.connect("categories", this.params$.pipe(switchMap(this.getCategories$)))
    this.state.connect(this.fetchOnUrlChange$)
  }

  buildSchema(products: ProductsListQuery['products']): WithContext<OfferCatalog> {
    const itemListElement: any[] = [];
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
          slogan: 'TRIBES - ????, ?????? ?????????? ?? ???? ???????????? ????????',
          logo: this.staticAssetsUrl + 'static/img/logo/logo_tribes_woodmark.svg',
          material: materials?.map((m: any) => `${m.material} ${m.quantity}%`).join(', '),
          category: category,
          itemCondition: 'NewCondition',
          model: `${title} ${sku}`,
          manufacturer: '?????? ???????????? / TRIBES LLC',
          color: color,
          image: imagesSrc,
          offers: {
            price: priceSale,
            priceCurrency: 'RUB',
            availability: stock ? 'InStock' : 'LimitedAvailability',
            '@id': 'https://mytribes.ru/product/' + sku,
            sku, url: 'https://mytribes.ru/product/' + sku
          }
        }
      }
      itemListElement.push(el)
    }
    const url = 'https://mytribes.ru' + '/' + this.route.snapshot.url.map(u=> u.path).join('/')
    const description = this.route.snapshot.data['description']
    const name = this.route.snapshot.data['title']
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
