import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsModule } from '../products/products.module';

@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ProductsModule
    ],
    exports: [
        ProductsModule
    ]
})
export class AdminModule {}
