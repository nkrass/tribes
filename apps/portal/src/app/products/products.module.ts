import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListItemComponent } from './products-list-item/products-list-item.component';

import { FileUploadService } from './shared/file-upload.service';

import { SortPipe } from './shared/sort.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from "ngx-bootstrap/tabs"
import { ModalModule } from 'ngx-bootstrap/modal'
import { CarouselModule } from "ngx-bootstrap/carousel"
import { BsDropdownModule, BsDropdownConfig} from "ngx-bootstrap/dropdown"
import { NgxJsonLdModule } from '@ngx-lite/json-ld';
import { RedirectComponent } from '../redirect/redirect.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { CatalogComponent } from './catalog/catalog.component';
import { ScanToRegisterComponent } from './register/register.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    CatalogComponent,
    SortPipe,
    RedirectComponent,
    ScanToRegisterComponent
  ],
  imports: [
    SharedModule,
    NgxPaginationModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    // HammerModule,
    NgxJsonLdModule,
    LetModule, PushModule,
    SwiperModule, BsDropdownModule
  ],
  exports: [
    ProductDetailComponent,
    ProductsListComponent,
    ProductsListItemComponent,
    CatalogComponent,
    SortPipe,
    TabsModule,
    ModalModule,
    RedirectComponent,
    ScanToRegisterComponent
  ],
  providers: [SortPipe, FileUploadService, BsDropdownConfig
    // { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
  ]
})
export class ProductsModule {}
