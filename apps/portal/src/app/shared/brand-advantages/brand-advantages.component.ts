import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-brand-advantages',
  templateUrl: './brand-advantages.component.html',
  styleUrls: ['./brand-advantages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandAdvantagesComponent {
  public staticAssetsUrl: string = staticAssetsUrl
}