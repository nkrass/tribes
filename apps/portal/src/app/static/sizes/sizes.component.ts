import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizessComponent {
  public staticAssetsUrl = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

}
