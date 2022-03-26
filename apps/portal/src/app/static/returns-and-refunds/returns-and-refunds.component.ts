import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-returns-and-refunds',
  templateUrl: './returns-and-refunds.component.html',
  styleUrls: ['./returns-and-refunds.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReturnsAndRefundsComponent {
  public staticAssetsUrl = staticAssetsUrl

  constructor(
    private cdr: ChangeDetectorRef
  ) { }

}
