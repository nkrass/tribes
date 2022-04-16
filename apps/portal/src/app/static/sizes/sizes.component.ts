import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-sizes-page',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizesPageComponent {
  public staticAssetsUrl = staticAssetsUrl
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

}
