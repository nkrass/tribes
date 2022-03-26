import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

import { PriceComponent } from './price/price.component';
import { SectionDividerComponent } from '../home/section-divider/section-divider.component';
import { RatingStarsComponent } from '../products/shared/rating-stars/rating-stars.component';
import { GenderFilterComponent } from './gender-filter/gender-filter.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { ProductWidgetComponent } from 'app/shared/product-widget/product-widget.component';

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
        CommonModule,
        AppRoutingModule,
        FormsModule,
        LazyLoadImageModule,
        AutofocusFixModule.forRoot()
    ],
    exports: [
        PriceComponent,
        SectionDividerComponent,
        CommonModule,
        AppRoutingModule,
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