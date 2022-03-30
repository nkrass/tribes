import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PriceComponent } from './price/price.component';
import { SectionDividerComponent } from '../home/section-divider/section-divider.component';
import { RatingStarsComponent } from '../products/shared/rating-stars/rating-stars.component';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { AppRoutingModule } from '../app-routing.module';
import { ProductWidgetComponent } from './product-widget/product-widget.component';

@NgModule({
    declarations: [
        PriceComponent,
        SectionDividerComponent,
        RatingStarsComponent,
        GenderFilterComponent,
        ProductCategoriesComponent,
        ProductWidgetComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        FormsModule,
        LazyLoadImageModule,
        AutofocusFixModule.forRoot()
    ],
    exports: [
        AppRoutingModule,
        PriceComponent,
        SectionDividerComponent,
        CommonModule,
        FormsModule,
        RatingStarsComponent,
        GenderFilterComponent,
        ProductCategoriesComponent,
        AutofocusFixModule,
        LazyLoadImageModule,
        ProductWidgetComponent
    ]
})
export class SharedModule {}
