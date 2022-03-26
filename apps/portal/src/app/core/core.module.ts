import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
// import { NavigationOffCanvasComponent } from './navigation-off-canvas/navigation-off-canvas.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
// import { NavigationMainComponent } from './header/navigation-main/navigation-main.component';
import { HomeComponent } from '../home/home.component';
import { MainSliderComponent } from '../home/main-slider/main-slider.component';
import { ProductWidgetComponent } from '../shared/product-widget/product-widget.component';
import { SearchComponent } from './header/search/search.component';

import { ProductService } from '../products/shared/product.service';
import { MessageService } from '../messages/message.service';
import { CartService } from '../cart/shared/cart.service';
import { PagerService } from '../pager/pager.service';
import { OrderService } from '../account/orders/shared/order.service';
import { CheckoutService } from '../checkout/shared/checkout.service';
import { AuthService } from '../account/shared/auth.service';
import { OffcanvasService } from './shared/offcanvas.service';
import { UiService } from '../products/shared/ui.service';
import { ProductsCacheService } from '../products/shared/products-cache.service';
import { NgxJsonLdModule } from '@ngx-lite/json-ld'
import { throwIfAlreadyLoaded } from './module-import-guard';
import { ReviewsSliderComponent } from '../home/reviews-slider/reviews-slider.component';
import { HomeSliderImagesService } from '../home/main-slider/home-slider-images.service';

import {CarouselModule} from "ngx-bootstrap/carousel"
import { ReviewService } from './shared/review.service';
import { FeedbackService } from '../shared/feedback.service';
import { StorageModule } from '../shared/storage/storage.module';
import { BaseCookieService } from '../shared/storage/services/base-cookie.service';
import { BaseLocalStorage } from '../shared/storage/storages/base-local.storage';
import { BrandAdvantagesComponent } from '../../app/shared/brand-advantages/brand-advantages.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { LetModule, PushModule } from '@rx-angular/template';
import { ToolbarCartComponent } from './header/toolbar/cart/cart.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
    declarations: [
        ContentComponent,
        HeaderComponent,
        // NavigationOffCanvasComponent,
        TopBarComponent,
        FooterComponent,
        ToolbarCartComponent,
        HomeComponent,
        MainSliderComponent,
        ReviewsSliderComponent,
        // ProductWidgetComponent,
        SearchComponent,
        BrandAdvantagesComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        CarouselModule.forRoot(),
        NgxJsonLdModule,
        StorageModule.forRoot(),
        CollapseModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        LetModule, PushModule,
        SwiperModule
        
    ],
    exports: [
        CommonModule,
        SharedModule,
        StorageModule,
        // NavigationOffCanvasComponent,
        TopBarComponent,
        HeaderComponent,
        ContentComponent,
        FooterComponent,
        BrandAdvantagesComponent,
        LetModule, PushModule,
        SwiperModule
        // ProductWidgetComponent,
    ],
    providers: [
        ProductService,
        ProductsCacheService,
        MessageService,
        CartService,
        PagerService,
        OrderService,
        FeedbackService,
        CheckoutService,
        AuthService,
        OffcanvasService,
        ReviewService,
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
