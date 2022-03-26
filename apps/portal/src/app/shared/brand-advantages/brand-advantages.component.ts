import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
import { resizedImgUrl } from '../../../../api/utils';
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'app-brand-advantages',
  templateUrl: './brand-advantages.component.html',
  styleUrls: ['./brand-advantages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandAdvantagesComponent {
  public staticAssetsUrl: string = staticAssetsUrl
}