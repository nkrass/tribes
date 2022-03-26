import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account.component';

@NgModule({
    declarations: [
        AccountComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SharedModule
    ]
})
export class AccountModule {}
