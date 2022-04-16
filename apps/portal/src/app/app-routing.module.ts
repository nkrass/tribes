import { Attribute, ChangeDetectorRef, ComponentFactoryResolver, Directive, NgModule, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { BrandDefaultMeta, BrandDescription, BrandImageDescription, BrandTitle, SEORoute } from './shared/seoservice.service';
import { SocialLuckydayComponent } from './social/luckyday/luckyday.component';
import { CartGuardService } from './cart/shared/cart.guard';
import { RedirectComponent } from './redirect/redirect.component';
import { ScanToRegisterComponent } from './products/register/register.component';

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

export const PortalRoutes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  new SEORoute({ path: '', pathMatch: 'full', component: HomeComponent, data: {
    ...BrandDefaultMeta
  }}),
  new SEORoute({ path: 'ig', pathMatch: 'full', component: HomeComponent, data: {
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

  new SEORoute({ path: 'cart', component: CartComponent, pathMatch: 'full', data: {
    ...BrandDefaultMeta,
    title:"Корзина | 🛍 TRIBES ® - Больше своего времени",
    description: "Ваши заказы одежды 🛍TRIBES® - стиль большого города, приятные материалы и забота о комфорте"
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
  {
    loadChildren: ()=> import('./static/static-pages-routing.module').then(m => m.StaticPagesRoutingModule),
    path: '', 
  },
  {
    loadChildren: ()=> import('./checkout/checkout.module').then(m => m.CheckoutModule),
    path: 'checkout', 
  },
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
