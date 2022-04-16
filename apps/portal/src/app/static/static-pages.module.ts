import { NgModule } from '@angular/core';
import { UiModule } from '@tribes/ui';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutCompanyComponent } from './about-company/about-company.component';
import { AboutTribesBrandComponent } from './about-tribes-brand/about-tribes-brand.component';
import { ContactsComponent } from './contacts/contacts.component';
import { OrdersPaymentInfoComponent } from './orders-payment-info/orders-payment-info.component';
import { PolicyComponent } from './policy/policy.component';
import { ReturnsAndRefundsComponent } from './returns-and-refunds/returns-and-refunds.component';
import { SizesPageComponent } from './sizes/sizes.component';
import { SupportComponent } from './support/support.component';
import { StaticPagesRoutingModule } from './static-pages-routing.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [
    OrdersPaymentInfoComponent,
    AboutTribesBrandComponent,
    PolicyComponent,
    AboutCompanyComponent,
    ContactsComponent,
    SupportComponent,
    ReturnsAndRefundsComponent,
    SizesPageComponent,

  ],
  imports: [
    CommonModule,
    UiModule,
    FormsModule,
    ReactiveFormsModule,
    StaticPagesRoutingModule,
    LazyLoadImageModule
  ],
  exports: [
    OrdersPaymentInfoComponent,
    AboutTribesBrandComponent,
    PolicyComponent,
    AboutCompanyComponent,
    ContactsComponent,
    SupportComponent,
    ReturnsAndRefundsComponent,
    SizesPageComponent,
  ],
  providers: []
})
export class StaticPagesModule {}
