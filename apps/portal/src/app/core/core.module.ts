import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from './header/search/search.component';
import { MessageService } from '../messages/message.service';
import { CartService } from '@tribes/cart';
import { PagerService } from '../pager/pager.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { AuthService } from '../account/shared/auth.service';
import { OffcanvasService } from './shared/offcanvas.service';
import { UiService } from '../products/shared/ui.service';
import { NgxJsonLdModule } from '@ngx-lite/json-ld'
import { throwIfAlreadyLoaded } from './module-import-guard';
import { HomeSliderImagesService } from '../home/main-slider/home-slider-images.service';

import { FeedbackService } from '../shared/feedback.service';
import { StorageModule } from '@tribes/storage';
import { BaseCookieService } from '@tribes/storage';
import { BaseLocalStorage } from '@tribes/storage';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LetModule, PushModule } from '@rx-angular/template';
import { ToolbarCartComponent } from './header/toolbar/cart/cart.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { UiModule } from '@tribes/ui';
import { AppRoutingModule } from '../app-routing.module';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { AnalyticsModule } from '@tribes/analytics';

@NgModule({
    declarations: [
        ContentComponent,
        HeaderComponent,
        TopBarComponent,
        FooterComponent,
        ToolbarCartComponent,
        HomeComponent,
        SearchComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        UiModule,
        NgxJsonLdModule,
        StorageModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        LetModule, PushModule,
        LazyLoadImageModule,
        AutofocusFixModule.forRoot(),
        AnalyticsModule
    ],
    exports: [
        CommonModule,
        StorageModule,
        TopBarComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        LetModule, PushModule,
        AppRoutingModule
    ],
    providers: [
        MessageService,
        CartService,
        PagerService,
        FeedbackService,
        CheckoutService,
        AuthService,
        OffcanvasService,
        UiService,
        HomeSliderImagesService,
        BaseCookieService,
        BaseLocalStorage
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
