import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { resizedImgUrl } from '../../../../api/utils';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderFilterComponent implements OnInit {
  public staticAssetsUrl: string = staticAssetsUrl
  public resizedImgUrl = resizedImgUrl
  constructor() { }

  ngOnInit(): void {
  }

}
