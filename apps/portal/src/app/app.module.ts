// Modules
import { BrowserModule, Title, Meta, TransferState, makeStateKey, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE, InjectionToken } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ProductsModule } from './products/products.module';
import { CoreModule } from './core/core.module';
// import { CheckoutModule } from './checkout/checkout.module';
import { CookieModule } from '@gorniv/ngx-universal';
import { ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';

// Components
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SEOService } from './shared/seoservice.service';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';

import { HttpErrorHandler } from './shared/http-error-handler.service';

import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { AnalyticsService } from './shared/analytics.service'
import { SocialLuckydayComponent } from './social/luckyday/luckyday.component';
import {HttpLink} from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { RxState } from '@rx-angular/state';
import { AppGlobalState, APP_GLOBAL_STATE } from './app-global.state';
import { environment } from '../environments/environment';
import { UiModule } from '@tribes/ui';
import { StaticPagesModule } from './static/static-pages.module';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localeRu, 'ru-RU', localeRuExtra);
const APOLLO_CACHE = new InjectionToken<InMemoryCache>('apollo-cache');
const STATE_KEY = makeStateKey<any>('apollo.state');

@NgModule({
  providers:[Title, Meta, SEOService, HttpErrorHandler, AnalyticsService, 
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'RUB'},
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
    SocialLuckydayComponent,
  ],
  imports: [
    ApolloModule,
    UiModule,
    TransferHttpCacheModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ProductsModule,
    StaticPagesModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    GoogleTagManagerModule.forRoot({
      id: 'GTM-MLTQWTV'
    }),
    // FormsModule,
    // ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}