import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { resizedImgUrl } from '../utils/utils.utils';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderFilterComponent {
  public staticAssetsUrl: string = staticAssetsUrl
  public resizedImgUrl = resizedImgUrl
  // constructor() { }

}
