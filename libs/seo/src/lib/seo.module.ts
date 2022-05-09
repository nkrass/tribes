import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TribesJsonLdComponent } from './json-ld.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TribesJsonLdComponent],
  exports: [TribesJsonLdComponent]
})
export class SeoModule {}
