// Modules
import { BrowserModule, Title, Meta, TransferState, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE, InjectionToken } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProductsModule } from './products/products.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CookieModule } from '@gorniv/ngx-universal';
import { ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';

// Components
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrdersPaymentInfoComponent } from './static/orders-payment-info/orders-payment-info.component';
import { AboutTribesBrandComponent } from './static/about-tribes-brand/about-tribes-brand.component';
import { PolicyComponent } from './static/policy/policy.component';
import { AboutCompanyComponent } from './static/about-company/about-company.component';
import { ContactsComponent } from './static/contacts/contacts.component';
import { SEOService } from './shared/seoservice.service';
import { ReturnsAndRefundsComponent } from './static/returns-and-refunds/returns-and-refunds.component';
import { SizessComponent } from './static/sizes/sizes.component';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

import { HttpErrorHandler } from './shared/http-error-handler.service';
import { StripUndefinedParams } from './interceptors/http-params.interceptor';

import { SupportComponent } from './static/support/support.component';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AnalyticsService } from './shared/analytics.service'
import { SocialLuckydayComponent } from './social/luckyday/luckyday.component';
import { HttpRequestInterceptor } from './interceptors/http-request-interceptor.service';
import {HttpLink} from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from './app-global.state';
import { environment } from '../environments/environment';

registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  providers:[Title, Meta, SEOService, HttpErrorHandler, AnalyticsService, 
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB'},
    { provide: HTTP_INTERCEPTORS, useClass: StripUndefinedParams, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
    { provide: APP_GLOBAL_STATE, useFactory: () => new RxState<AppGlobalState>() },
    {
      provide: APOLLO_CACHE,
      useValue: new InMemoryCache(),
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(
        httpLink: HttpLink,
        cache: InMemoryCache,
        transferState: TransferState,
      ) {
        const isBrowser = transferState.hasKey<any>(STATE_KEY);

        if (isBrowser) {
          const state = transferState.get<any>(STATE_KEY, null);
          cache.restore(state);
        } else {
          transferState.onSerialize(STATE_KEY, () => {
            return cache.extract();
          });
          // Reset cache after extraction to avoid sharing between requests
          cache.reset();
        }

        return {
          link: httpLink.create({uri: environment.graphqlUrl}),
          cache,
        };
      },
      deps: [HttpLink, APOLLO_CACHE, TransferState],
    },
    // { provide: 'googleTagManagerId',  useValue: 'GTM-MLTQWTV'}
  ],
  declarations: [
    AppComponent,
    CartComponent,
    PageNotFoundComponent,
    OrdersPaymentInfoComponent,
    AboutTribesBrandComponent,
    PolicyComponent,
    AboutCompanyComponent,
    ContactsComponent,
    SupportComponent,
    ReturnsAndRefundsComponent,
    SizessComponent,
    SocialLuckydayComponent
  ],
  imports: [
    ApolloModule,
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot(),
    CoreModule,
    ProductsModule,
    CheckoutModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-MLTQWTV'
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}