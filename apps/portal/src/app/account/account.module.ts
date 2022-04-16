import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
    ]
})
export class AccountModule {}
