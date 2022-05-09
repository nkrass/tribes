import { NgModule } from '@angular/core';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import { SortPipe } from './shared/sort.pipe';
import { TabsModule } from "ngx-bootstrap/tabs"
import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule, BsDropdownConfig} from "ngx-bootstrap/dropdown"
import { SeoModule } from '@tribes/seo';
import { RedirectComponent } from '../redirect/redirect.component';
import { LetModule, PushModule } from '@rx-angular/template';
import { ScanToRegisterComponent } from './register/register.component';
import { UiModule } from '@tribes/ui';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductsListComponent,
    SortPipe,
    RedirectComponent,
    ScanToRegisterComponent
  ],
  imports: [
    UiModule,
    CommonModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    SeoModule,
    LetModule, PushModule,
    BsDropdownModule
  ],
  exports: [
    // ProductDetailComponent,
    // ProductsListComponent,
    // SortPipe,
    // TabsModule,
    // RedirectComponent,
    // ScanToRegisterComponent
  ],
  providers: [SortPipe, BsDropdownConfig
  ]
})
export class ProductsModule {}
