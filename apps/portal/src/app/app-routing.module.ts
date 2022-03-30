import { Attribute, ChangeDetectorRef, ComponentFactoryResolver, Directive, NgModule, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CompleteComponent } from './checkout/complete/complete.component';
import { OrdersPaymentInfoComponent } from './static/orders-payment-info/orders-payment-info.component';
import { AboutTribesBrandComponent } from './static/about-tribes-brand/about-tribes-brand.component';
import { ContactsComponent } from './static/contacts/contacts.component';
import { PolicyComponent } from './static/policy/policy.component';
import { AboutCompanyComponent } from './static/about-company/about-company.component';
import { ReturnsAndRefundsComponent } from './static/returns-and-refunds/returns-and-refunds.component';
import { SizessComponent } from './static/sizes/sizes.component'
import { SupportComponent } from './static/support/support.component';
import { BrandDefaultMeta, BrandDescription, BrandImageDescription, BrandTitle, SEORoute } from './shared/seoservice.service';
import { SocialLuckydayComponent } from './social/luckyday/luckyday.component';
import { CartGuardService } from './cart/shared/cart.guard';
import { RedirectComponent } from './redirect/redirect.component';
import { ScanToRegisterComponent } from './products/register/register.component';
import { CatalogComponent } from './products/catalog/catalog.component';

@Directive({ selector: 'router-outlet' })
export class MyRouterOutlet extends RouterOutlet {
  constructor(
    parentContexts: ChildrenOutletContexts,
    location: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    @Attribute('name') name: string,
    private ref: ChangeDetectorRef
  ) {
    super(parentContexts, location, resolver, name, ref);
  }

  override activateWith(
    activatedRoute: ActivatedRoute,
    resolver: ComponentFactoryResolver
  ): void {
    super.activateWith(activatedRoute, resolver);
    this.ref.detectChanges();
  }
}

@NgModule({
  declarations: [MyRouterOutlet],
  exports: [MyRouterOutlet],
})
export class MyRouterOutletModule {}

export const PortalRoutes: SEORoute[] = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  new SEORoute({ path: '', pathMatch: 'full', component: HomeComponent, data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'ig', pathMatch: 'full', component: HomeComponent, data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'brand', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'care', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'v', pathMatch: 'full', redirectTo: 'about-tribes-brand', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'luckyday', pathMatch: 'full', component: SocialLuckydayComponent, data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'P/:size/:id', pathMatch: 'prefix', component: ScanToRegisterComponent, data: {
    ...BrandDefaultMeta
  } }),
  new SEORoute({ path: 'product/:id', component: ProductDetailComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'rd/:id', component: RedirectComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'orders-payment-info', component: OrdersPaymentInfoComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Условия и информация | 🛍 TRIBES ® - Для ярких и смелых",
    description: "Условия и процедура заказа, оплаты, доставки и возвратов товаров 🛍TRIBES®"
  }}),
  new SEORoute({ path: 'returns-and-refunds', component: ReturnsAndRefundsComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Возвраты товара и денег | 🛍 TRIBES ® - Для ярких и смелых",
    description: "Условия и правила возврата товаров и денег"
  }}),
  new SEORoute({ path: 'sizes', component: SizessComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "Размерная сетка - Sizes table | 🛍 TRIBES ® - Больше своего времени",
    description: "Данные о всех размерах одежды бренда 🛍 TRIBES ® и измерения, на которые стоит ориентироваться при покупке."
  }}),
  new SEORoute({ path: 'about-tribes-brand', component: AboutTribesBrandComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "💎 Миссиия и ценности бренда " + BrandTitle,
    description: BrandDescription
  }}),
  new SEORoute({path: 'support', component: SupportComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "Поддержка клиентов | 🛍 TRIBES ® - Больше своего времени",
    description: "Связаться с нами по для получения помощи по вопросам заказов, качества и прочим ",
  }}),
  new SEORoute({ path: 'contacts', component: ContactsComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Связаться с нами | 🛍 TRIBES ® - Больше своего времени",
    description: "🤝Связаться с нами по поводу сотрудничества или по другим вопросам | 🛍TRIBES®"
  }}),
  new SEORoute({ path: 'policy', component: PolicyComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Политики | 🛍 TRIBES ® - Больше своего времени",
    description: "Политика конфиденциальности и Согласие с ПДН ООО Трайбс и Бренд TRIBES"
  }}),
  new SEORoute({ path: 'about-company', component: AboutCompanyComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"О компании | 🛍 TRIBES ® - Больше своего времени",
    description: "Реквизиты ООО Трайбс и Бренд 🛍TRIBES® - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  new SEORoute({ path: 'cart', component: CartComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Корзина | 🛍 TRIBES ® - Больше своего времени",
    description: "Ваши заказы одежды 🛍TRIBES® - стиль большого города, приятные материалы и забота о комфорте"
  }}),
  new SEORoute({ path: 'checkout', 
    component: CheckoutComponent, 
    canActivate: [CartGuardService],
    pathMatch: 'prefix', 
    data: {
    ...BrandDefaultMeta,
    title:"Заказ | 🛍 TRIBES ® - Больше своего времени",
    description: "Ваш заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте"
  }}),
  new SEORoute({ path: 'order-complete', component: CompleteComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "Статус заказа | 🛍 TRIBES ® - Больше своего времени",
    description: "Статус вашего заказ в интернет магазине TRIBES - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  ///Dynamics
  new SEORoute({ path: 'catalog', component: CatalogComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({ path: 'catalog/:category', component: ProductsListComponent, pathMatch: 'prefix',data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({ path: ':gender/catalog', component: ProductsListComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({ path: ':gender/catalog/:category', component: ProductsListComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({ path: ':gender/catalog/:category/:color', component: ProductsListComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({ path: ':gender/catalog/:category/:color/:size', component: ProductsListComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title: "🛍Каталог и новинки TRIBES® - Официальный интернет-магазин Россия 🇷🇺",
    description: BrandImageDescription,
  }}),
  new SEORoute({path: '404', component: PageNotFoundComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title:"Страница не найдена | 🛍 TRIBES ® - Больше своего времени",
    description: "Страница не найдена | TRIBES - стиль большого города, приятные материалы и забота о комфорте",
  }}),
  // ALL OTHER 404
  new SEORoute({path: '**', component: PageNotFoundComponent, pathMatch: 'prefix', data: {
    ...BrandDefaultMeta,
    title:"Страница не найдена | 🛍 TRIBES ® - Больше своего времени",
    description: "Страница не найдена | TRIBES - стиль большого города, приятные материалы и забота о комфорте",
  }}),
];

@NgModule({
  imports: [RouterModule.forRoot(PortalRoutes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    relativeLinkResolution: 'corrected',
    canceledNavigationResolution: 'computed'
})],
  exports: [RouterModule, MyRouterOutletModule],
  providers: [
    // AdminGuard,
    CartGuardService
  ]
})
export class AppRoutingModule { }
