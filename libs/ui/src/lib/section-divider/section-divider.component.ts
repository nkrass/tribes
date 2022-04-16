import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'tribes-section-divider',
  templateUrl: './section-divider.component.html',
  styleUrls: ['./section-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionDividerComponent {
  @Input() staticAssetsUrl = 'https://cdn.mytribes.ru/'
  @Input() public section!: string;
  @Input() public h: string = "h4"
}
