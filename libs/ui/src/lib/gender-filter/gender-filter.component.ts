import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderFilterComponent {
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'
}
