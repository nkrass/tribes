import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';

@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        ProductsModule
    ],
    exports: [
        SharedModule,
        ProductsModule
    ]
})
export class AdminModule {}
