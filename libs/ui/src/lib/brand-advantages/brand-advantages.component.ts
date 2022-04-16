import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-brand-advantages',
  templateUrl: './brand-advantages.component.html',
  styleUrls: ['./brand-advantages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrandAdvantagesComponent {
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'
}