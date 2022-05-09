import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'tribes-json-ld',
  template: ''
})
export class TribesJsonLdComponent implements OnChanges {
  @Input() schema;
  @HostBinding('innerHTML') jsonLD: SafeHtml;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    this.jsonLD = this.getSafeHTML(changes['schema'].currentValue);
  }

  getSafeHTML(value: Record<string, unknown>) {
    const json = value ? JSON.stringify(value, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}