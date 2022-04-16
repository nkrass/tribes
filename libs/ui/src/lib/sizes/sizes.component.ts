import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'tribes-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesComponent {
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

}
